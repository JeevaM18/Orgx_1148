import traceback
from src.data_loader import load_models, load_data
from src.profile_service import compute_profile
from src.volatility_service import compute_volatility

def run():
    print("Loading models...")
    risk_model, upcoming_model, clustering_model, clustering_scaler, risk_explainer = load_models()
    print("Loading data...")
    df = load_data()
    user_df = df[df["user_id"] == "user_2"]
    
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
    
    print("Testing profile...")
    try:
        user_agg = user_df[risk_features].mean().values
        personality, cluster_id = compute_profile(clustering_model, clustering_scaler, user_agg)
        print("Profile Success:", personality, cluster_id)
        # Check if json serializable
        import json
        json.dumps({"personality": personality, "cluster_id": cluster_id})
    except Exception as e:
        traceback.print_exc()

    print("Testing volatility...")
    try:
        radar = compute_volatility(user_df)
        print("Volatility Success:", radar)
    except Exception as e:
        traceback.print_exc()

if __name__ == "__main__":
    run()
