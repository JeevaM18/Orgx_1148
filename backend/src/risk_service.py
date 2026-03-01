import numpy as np

def compute_risk_score(model, user_df, features):
    X = user_df[features]
    prob = model.predict_proba(X)[:,1]
    risk_score = float(prob[-1] * 100)
    return round(risk_score, 2)

# src/risk_service.py

def compute_risk(model, user_df, features):

    X = user_df[features]
    
    # XGBoost is outputting extreme margins (-11 to +11), resulting in binary 0/100 scores.
    # By extracting the raw margin and applying Temperature Scaling, we soften the curve.
    margin = float(model.predict(X, output_margin=True)[-1])
    
    # Soften the predictions to get varying 10%-90% scores and force a Medium tier
    temperature = 13.0  
    soft_prob = 1 / (1 + np.exp(-margin / temperature))
    
    risk_score = round(float(soft_prob * 100), 2)

    if risk_score < 40:
        level = "Low"
    elif risk_score < 70:
        level = "Medium"
    else:
        level = "High"

    return risk_score, level