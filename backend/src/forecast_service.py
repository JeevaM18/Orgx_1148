import numpy as np
from sklearn.linear_model import LinearRegression

def compute_30day_forecast(user_df, risk_model, features):

    if len(user_df) < 10:
        return {"forecast_trend": "Insufficient Data"}

    X = user_df[features]
    probs = risk_model.predict_proba(X)[:,1]

    y = probs
    X_time = np.arange(len(y)).reshape(-1,1)

    model = LinearRegression()
    model.fit(X_time, y)

    slope = model.coef_[0]

    if slope > 0.01:
        trend = "Increasing Risk Trend"
    elif slope < -0.01:
        trend = "Improving Stability"
    else:
        trend = "Stable Behaviour"

    return {
        "trend_type": trend,
        "trend_slope": round(float(slope), 4),
        "future_stability_indicator": max(0, min(1, round(1.0 - abs(float(slope) * 10), 3)))
    }