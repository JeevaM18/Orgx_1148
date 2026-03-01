# src/profile_service.py

def compute_profile(model, scaler, user_features):

    X_scaled = scaler.transform([user_features])
    cluster_id = int(model.predict(X_scaled)[0].item())

    cluster_map = {
        0: "Stable Planner",
        1: "Night Impulse Buyer",
        2: "Salary Cycler",
        3: "Burst Spender"
    }

    personality = cluster_map.get(cluster_id, "Unknown")

    return personality, cluster_id