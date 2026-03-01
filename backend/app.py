# app.py

from fastapi import FastAPI, HTTPException
from src.data_loader import load_models, load_data
from src.risk_service import compute_risk
from src.upcoming_service import compute_upcoming
from src.profile_service import compute_profile
from src.gamification_service import compute_gamification
from src.trigger_service import compute_triggers, classify_trigger_types
from src.volatility_service import compute_volatility
from src.forecast_service import compute_30day_forecast

app = FastAPI()

risk_model, upcoming_model, clustering_model, clustering_scaler, risk_explainer = load_models()
df = load_data()

risk_features = [
    "transaction_amount",
    "rolling_7day_spend",
    "rolling_30day_spend",
    "transaction_gap",
    "transaction_gap_variance",
    "spend_spike_ratio",
    "burst_score",
    "night_spend_ratio",
    "category_entropy",
    "end_month_surge_index",
    "behavioural_drift_score"
]


def get_user_df(user_id: str):
    user_df = df[df["user_id"] == user_id]
    if user_df.empty:
        raise HTTPException(status_code=404, detail="User not found")
    return user_df


# ---------------- RISK ---------------- #

@app.get("/risk/{user_id}")
def get_risk(user_id: str):

    user_df = get_user_df(user_id)

    risk_score, level = compute_risk(risk_model, user_df, risk_features)

    raw_triggers = compute_triggers(
        risk_explainer,
        risk_model,
        user_df,
        risk_features
    )

    classified_triggers = classify_trigger_types(raw_triggers)

    return {
        "risk_score": risk_score,
        "risk_level": level,
        "top_triggers": classified_triggers
    }


# ---------------- UPCOMING ---------------- #

@app.get("/upcoming/{user_id}")
def get_upcoming(user_id: str):

    user_df = get_user_df(user_id)

    upcoming_prob, warning = compute_upcoming(
        upcoming_model,
        user_df,
        risk_features
    )

    return {
        "upcoming_risk_probability": upcoming_prob,
        "pre_impulse_warning": warning
    }


# ---------------- PROFILE ---------------- #

@app.get("/profile/{user_id}")
def get_profile(user_id: str):

    user_df = get_user_df(user_id)

    # Use the specific features the scaler was trained on
    profile_features = list(clustering_scaler.feature_names_in_)
    user_agg = user_df[profile_features].mean().values

    personality, cluster_id = compute_profile(
        clustering_model,
        clustering_scaler,
        user_agg
    )

    return {
        "personality": personality,
        "cluster_id": cluster_id
    }


# ---------------- GAMIFICATION ---------------- #

@app.get("/gamification/{user_id}")
def get_gamification(user_id: str):

    user_df = get_user_df(user_id)

    risk_score, _ = compute_risk(
        risk_model,
        user_df,
        risk_features
    )

    gamification = compute_gamification(risk_score, user_df)

    return gamification


# ---------------- VOLATILITY ---------------- #

@app.get("/volatility/{user_id}")
def get_volatility(user_id: str):

    user_df = get_user_df(user_id)

    radar = compute_volatility(user_df)

    return radar


# ---------------- FORECAST ---------------- #

@app.get("/forecast/{user_id}")
def get_forecast(user_id: str):

    user_df = get_user_df(user_id)

    forecast = compute_30day_forecast(
        user_df,
        risk_model,
        risk_features
    )

    return forecast
from pydantic import BaseModel
import pandas as pd
import numpy as np

class SimulateRequest(BaseModel):
    amount: float
    category: str
    time: str
    payment: str
    weekend: bool

@app.post("/simulate")
def simulate_live(req: SimulateRequest):
    # Take user_1 (who we know is high risk capable) as our baseline profile
    user_df = get_user_df("user_1").copy()
    
    new_row = user_df.iloc[-1].copy()
    new_row["transaction_amount"] = req.amount
    
    # Adjust risk features organically based on their manual simulator inputs
    if req.time:
        try:
            hour = int(req.time.split(":")[0])
            if hour >= 22 or hour <= 4:
                new_row["night_spend_ratio"] = min(1.0, float(new_row["night_spend_ratio"]) + 0.6)
            else:
                new_row["night_spend_ratio"] = max(0.0, float(new_row["night_spend_ratio"]) - 0.2)
        except:
            pass
            
    if req.amount > 150:
        new_row["burst_score"] = min(5.0, float(new_row["burst_score"]) + (req.amount / 50))
        new_row["spend_spike_ratio"] = min(3.0, float(new_row["spend_spike_ratio"]) + 1.5)
        new_row["end_month_surge_index"] = min(2.0, float(new_row["end_month_surge_index"]) + 1.0)
    else:
        new_row["spend_spike_ratio"] = max(0.0, float(new_row["spend_spike_ratio"]) - 0.5)
        new_row["burst_score"] = max(0.0, float(new_row["burst_score"]) - 1.0)
        
    if req.weekend:
        new_row["category_entropy"] = min(3.0, float(new_row["category_entropy"]) + 1.0)

    # Append the customized new transaction into their history natively
    user_df = pd.concat([user_df, pd.DataFrame([new_row])], ignore_index=True)
    
    # 1. Risk
    risk_score, level = compute_risk(risk_model, user_df, risk_features)
    raw_triggers = compute_triggers(risk_explainer, risk_model, user_df, risk_features)
    classified_triggers = classify_trigger_types(raw_triggers)
    risk_data = {"risk_score": risk_score, "risk_level": level, "top_triggers": classified_triggers}
    
    # 2. Upcoming
    upcoming_prob, warning = compute_upcoming(upcoming_model, user_df, risk_features)
    upcoming_data = {"upcoming_risk_probability": upcoming_prob, "pre_impulse_warning": warning}
    
    # 3. Profile
    profile_features = list(clustering_scaler.feature_names_in_)
    user_agg = user_df[profile_features].mean().values
    personality, cluster_id = compute_profile(clustering_model, clustering_scaler, user_agg)
    profile_data = {"personality": personality, "cluster_id": cluster_id}
    
    # 4. Gamification
    gamification_data = compute_gamification(risk_score, user_df)
    
    # 5. Volatility
    volatility_data = compute_volatility(user_df)
    
    # 6. Forecast
    forecast_data = compute_30day_forecast(user_df, risk_model, risk_features)
    
    return {
        "risk": risk_data,
        "upcoming": upcoming_data,
        "profile": profile_data,
        "gamification": gamification_data,
        "volatility": volatility_data,
        "forecast": forecast_data
    }

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)