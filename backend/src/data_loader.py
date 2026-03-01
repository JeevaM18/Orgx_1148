# src/data_loader.py

import pandas as pd
import joblib
import shap

def load_models():
    risk_model = joblib.load("models/risk_model.pkl")
    upcoming_model = joblib.load("models/upcoming_risk_model.pkl")
    clustering_model = joblib.load("models/clustering_model.pkl")
    clustering_scaler = joblib.load("models/clustering_scaler.pkl")

    risk_explainer = shap.TreeExplainer(risk_model)

    return risk_model, upcoming_model, clustering_model, clustering_scaler, risk_explainer

def load_data():
    return pd.read_csv("data/processed/transactions_processed.csv")