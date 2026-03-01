import pandas as pd

def compute_upcoming_risk(model, user_df, features):
    pass
    
def compute_upcoming(model, user_df, features):
    
    # Calculate the lagged features exactly as the model expects
    lag_features = [
        'spend_spike_ratio', 'burst_score', 'night_spend_ratio', 
        'end_month_surge_index', 'behavioural_drift_score', 'category_entropy'
    ]
    
    df_lags = pd.DataFrame()
    for col in lag_features:
        if col in user_df.columns:
            df_lags[f"{col}_lag1"] = list(user_df[col].shift(1))
            df_lags[f"{col}_lag2"] = list(user_df[col].shift(2))
    
    # The expected order by the booster
    expected_cols = [
        'spend_spike_ratio_lag1', 'spend_spike_ratio_lag2', 
        'burst_score_lag1', 'burst_score_lag2', 
        'night_spend_ratio_lag1', 'night_spend_ratio_lag2', 
        'end_month_surge_index_lag1', 'end_month_surge_index_lag2', 
        'behavioural_drift_score_lag1', 'behavioural_drift_score_lag2', 
        'category_entropy_lag1', 'category_entropy_lag2'
    ]
    
    # Get the last row (most recent data point)
    X = df_lags[expected_cols].tail(1)
    
    # Fill any NaNs created by shifting with 0
    X = X.fillna(0)
    
    prob = model.predict_proba(X)[0][1]
    upcoming_prob = round(float(prob), 3)

    pre_impulse_warning = bool(upcoming_prob > 0.6)

    return upcoming_prob, pre_impulse_warning