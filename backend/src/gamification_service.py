# src/gamification_service.py

def compute_self_control_strength(user_df):
    last_7 = user_df.tail(7)
    avg_risk = last_7["high_impulse_event"].mean()
    strength = round(float((1 - avg_risk) * 100), 2)
    return strength


def compute_improvement(user_df):
    if len(user_df) < 14:
        return {"risk_reduction_percentage": 0}

    recent = user_df.tail(7)["high_impulse_event"].mean()
    previous = user_df.tail(14).head(7)["high_impulse_event"].mean()

    if previous == 0:
        reduction = 0.0
    else:
        reduction = ((previous - recent) / previous) * 100

    return {
        "risk_reduction_percentage": round(float(reduction), 2)
    }


def compute_gamification(risk_score, user_df):

    control_score = round(float(100 - risk_score), 2)

    last_7 = user_df.tail(7)
    streak = int((last_7["high_impulse_event"] == 0).sum())

    challenges = {
        "night_control": round(float(1 - user_df["night_spend_ratio"].iloc[-1]), 2),
        "salary_smart": round(float(1 - user_df["end_month_surge_index"].iloc[-1]), 2),
        "burst_control": round(float(1 - user_df["burst_score"].iloc[-1] / 5), 2)
    }

    badges = []
    if streak >= 5:
        badges.append("Discipline Streak")
    if control_score > 70:
        badges.append("High Control Achiever")

    # Advanced additions
    strength = compute_self_control_strength(user_df)
    improvement = compute_improvement(user_df)

    return {
        "control_score": control_score,
        "streak": streak,
        "challenges": challenges,
        "badges": badges,
        "self_control_strength": strength,
        **improvement
    }