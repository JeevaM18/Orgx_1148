# src/volatility_service.py

def compute_volatility(user_df):

    latest = user_df.tail(1)

    radar = {
        "night_risk": round(float(latest["night_spend_ratio"].iloc[-1]), 3),
        "salary_risk": round(float(latest["end_month_surge_index"].iloc[-1] / 2), 3),
        "burst_risk": round(float(latest["burst_score"].iloc[-1] / 5), 3),
        "category_volatility": round(float(latest["category_entropy"].iloc[-1] / 2), 3),
        "spend_spike": round(float(latest["spend_spike_ratio"].iloc[-1] / 3), 3)
    }

    # clamp values between 0 and 1
    radar = {k: min(max(v, 0), 1) for k, v in radar.items()}

    return radar