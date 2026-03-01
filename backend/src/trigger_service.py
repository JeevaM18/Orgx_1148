# src/trigger_service.py

import numpy as np


def compute_triggers(explainer, model, user_df, features):

    X = user_df[features].tail(1)

    shap_values = explainer.shap_values(X)

    # Fix for binary classifier shape
    if isinstance(shap_values, list):
        contributions = shap_values[1][0]
    else:
        contributions = shap_values[0]

    trigger_list = []

    for i in range(len(features)):
        trigger_list.append({
            "feature": features[i],
            "impact": round(float(contributions[i]), 4)
        })

    trigger_list = sorted(
        trigger_list,
        key=lambda x: abs(x["impact"]),
        reverse=True
    )

    return trigger_list[:3]


def classify_trigger_types(triggers):

    trigger_map = {
        "night_spend_ratio": "Emotional Trigger",
        "end_month_surge_index": "Salary Cycle Trigger",
        "burst_score": "Impulse Burst Trigger",
        "spend_spike_ratio": "Spike Trigger",
        "category_entropy": "Exploration Trigger"
    }

    classified = []

    for t in triggers:
        trigger_type = trigger_map.get(t["feature"], "General Behaviour Trigger")

        classified.append({
            "feature": t["feature"],
            "impact": t["impact"],
            "trigger_type": trigger_type
        })

    return classified