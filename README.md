# 🛡️ ImpulseGuard

## AI-Powered Behavioural Finance & Gamified Self-Control System

ImpulseGuard is a behavioural intelligence platform that detects,
predicts, explains, and gamifies impulsive spending patterns using
Machine Learning and Behavioural Analytics.

It transforms raw transaction data into:

🎯 Impulse Risk Score (0--100)\
🔮 Upcoming Risk Prediction\
🧠 Behavioural Personality Profiling\
🔍 Explainable Trigger Detection\
🎮 Gamified Self-Control Reinforcement

------------------------------------------------------------------------

# 🌐 Live System Overview

## 🏠 Landing Page

```{=html}
<p align="center">
```
`<img src="assets/A1.png" width="900"/>`{=html}
```{=html}
</p>
```
ImpulseGuard introduces behavioural finance as a gamified AI experience.

------------------------------------------------------------------------

# 🧠 Problem Statement

Impulse spending is often driven by:

-   Emotional triggers (night purchases)
-   Salary-cycle overspending
-   Sudden spending spikes
-   Burst transactions
-   Behavioural drift over time

Traditional financial tools track spending.\
ImpulseGuard explains why behaviour happens and helps users correct it.

------------------------------------------------------------------------

# 📊 Dataset Information

## Dataset Type: Synthetic

### Why Synthetic?

No publicly available dataset provides:

-   Individual-level behavioural finance patterns
-   Impulse event labels
-   Temporal + entropy-based behavioural features

Therefore, a semi-synthetic behavioural dataset was generated.

------------------------------------------------------------------------

## 📈 Dataset Generation Logic

Impulse behaviour was simulated using:

-   Salary-cycle distributions
-   Time-of-day probability shifts
-   Burst transaction clustering
-   Entropy-based category exploration
-   Behavioural drift modeling

Impulse events were defined using multi-condition logic:

High impulse occurs when:

-   spend_spike_ratio \> threshold
-   burst_score high
-   category_entropy increased
-   temporal trigger alignment

This ensured behavioural realism rather than random labeling.

------------------------------------------------------------------------

## 📦 Dataset Size

-   \~20,867 transaction records
-   Multiple users
-   Binary target: high_impulse_event

------------------------------------------------------------------------

## 📋 Feature List (Compact Format)

user_id, transaction_timestamp, transaction_amount, merchant_category,
hour_of_day, day_of_week, is_weekend, rolling_7day_spend,
rolling_30day_spend, transaction_gap, transaction_gap_variance,
spend_spike_ratio, burst_score, night_spend_ratio,
end_month_surge_index, behavioural_drift_score, category_entropy,
high_impulse_event

------------------------------------------------------------------------

# 🏗️ Feature Engineering

### 1️⃣ Spending Intensity

-   spend_spike_ratio
-   rolling_7day_spend
-   rolling_30day_spend

Captures sudden deviations from baseline spending.

### 2️⃣ Temporal Behaviour

-   night_spend_ratio
-   end_month_surge_index
-   hour_of_day

Captures emotional and salary-cycle triggers.

### 3️⃣ Burst & Volatility

-   burst_score
-   transaction_gap_variance
-   category_entropy

Detects clustered impulse behaviour.

### 4️⃣ Behavioural Stability

-   behavioural_drift_score

Measures long-term deviation from baseline.

------------------------------------------------------------------------

# 🤖 Models Used

## 1️⃣ Impulse Risk Model

Model: XGBoost Classifier

### Why XGBoost?

-   Handles non-linear interactions
-   Strong for tabular data
-   Works with SHAP explainability
-   Robust to feature interactions

### Performance

Accuracy: 0.999856\
ROC-AUC: 0.999986

Confusion Matrix:\
TP: 2482\
FP: 2\
FN: 1\
TN: 18382

High performance reflects structured behavioural logic in synthetic
data.

------------------------------------------------------------------------

## 2️⃣ Behavioural Clustering

Model: KMeans

Used for personality segmentation.

Silhouette analysis → optimal k = 3

Cluster Profiles:

  Cluster   Label
  --------- ---------------------
  0         Stable Planner
  1         Night Impulse Buyer
  2         Salary Cycler
  3         Burst Spender

------------------------------------------------------------------------

## 3️⃣ Upcoming Risk Prediction

Objective: Predict near-future impulse risk.

ROC-AUC: 0.759\
Accuracy: 0.68

High recall prioritizes early warnings over false safety.

------------------------------------------------------------------------

## 4️⃣ Explainability -- SHAP

SHAP confirms:

-   spend_spike_ratio → strongest impact
-   night_spend_ratio → emotional trigger
-   end_month_surge_index → salary trigger

------------------------------------------------------------------------

# 🎮 System Pages & Metrics Explained

## ⚔️ Battle Dashboard

```{=html}
<p align="center">
```
`<img src="assets/B1.png" width="900"/>`{=html}
```{=html}
</p>
```
Displays: - Impulse Risk Score (0--100) - Risk Level (Low / Medium /
High) - Boss Health Bar - Character mood based on risk

Interpretation: - High risk → aggressive monster - Medium risk → alert
state - Low risk → calm state

------------------------------------------------------------------------

## ⚠️ Upcoming Risk Warning

```{=html}
<p align="center">
```
`<img src="assets/B2.png" width="900"/>`{=html}
```{=html}
</p>
```
Shows probability of near-future impulse.\
If \> 60% → Warning triggered.

------------------------------------------------------------------------

## 📊 Volatility Radar

```{=html}
<p align="center">
```
`<img src="assets/B3.png" width="900"/>`{=html}
```{=html}
</p>
```
Radar Dimensions: - Night Risk - Salary Risk - Burst Risk - Category
Volatility - Spend Spike

------------------------------------------------------------------------

## 🧠 Behaviour Profile

```{=html}
<p align="center">
```
`<img src="assets/C1.png" width="900"/>`{=html}
```{=html}
</p>
```
Displays: - Personality Type - Cluster ID - Top 3 Behavioural Triggers -
Trigger Type Classification

Trigger Types: - Emotional Trigger - Salary Trigger - Burst Trigger -
Spike Trigger

------------------------------------------------------------------------

## 🎮 Gamification Arena

```{=html}
<p align="center">
```
`<img src="assets/D1.png" width="900"/>`{=html}
```{=html}
</p>
```
Displays: - Self-Control Strength Index - Behaviour Challenges -
Discipline Streak - Badges Earned - Improvement Tracking

------------------------------------------------------------------------

## 📈 Financial Forecast

```{=html}
<p align="center">
```
`<img src="assets/E1.png" width="900"/>`{=html}
```{=html}
</p>
```
Displays: - 30-Day Behavioural Trend - Trend Slope - Stability
Indicator - Behavioural Drift Score

------------------------------------------------------------------------

# 🏗️ Project Structure

Orgx_1148/ │ ├── backend/ │ ├── app.py │ ├── data/ │ │ └── processed/ │
├── models/ │ ├── src/ │ │ ├── data_loader.py │ │ ├── risk_service.py │
│ ├── upcoming_service.py │ │ ├── profile_service.py │ │ ├──
trigger_service.py │ │ ├── gamification_service.py │ │ ├──
volatility_service.py │ │ └── forecast_service.py │ └── requirements.txt
│ ├── frontend/ │ ├── src/ │ │ ├── components/ │ │ ├── pages/ │ │ ├──
lib/ │ │ └── hooks/ │ └── package.json │ ├── notebooks/ │ ├──
01_data_generation.ipynb │ ├── 02_feature_engineering.ipynb │ ├──
03_risk_model_training.ipynb │ ├── 04_clustering_analysis.ipynb │ └──
05_upcoming_risk_prediction.ipynb │ ├── assets/ │ └── UI Screenshots │
└── README.md

------------------------------------------------------------------------

# ⚙️ Backend Setup

cd backend\
pip install -r requirements.txt\
uvicorn app:app --reload

Backend runs at:\
http://localhost:8000

------------------------------------------------------------------------

# ⚙️ Frontend Setup

cd frontend\
npm install\
npm run dev

------------------------------------------------------------------------

# 🧩 Technologies Used

## Backend

-   FastAPI
-   XGBoost
-   Scikit-learn
-   SHAP
-   Pandas / NumPy

## Frontend

-   React (Vite)
-   TailwindCSS
-   ChartJS / Custom components

------------------------------------------------------------------------

# 📌 Evaluation Criteria Alignment

✔ Model performance and validation\
✔ Behavioural feature innovation\
✔ Explainability (SHAP)\
✔ Practical API architecture\
✔ Gamified behavioural reinforcement\
✔ Visualization quality

------------------------------------------------------------------------

# 📜 Compliance Statement

Dataset Type: Synthetic

Reason: No public behavioural finance dataset available

Data generated using rule-based + probabilistic simulation

Number of records: \~20,867

All assumptions documented

Models implemented independently

Repository is public and accessible.

------------------------------------------------------------------------

# 🎓 Learning Objectives

-   Understand behavioural finance modeling using machine learning\
-   Design synthetic datasets based on domain assumptions\
-   Apply feature engineering for temporal and volatility signals\
-   Implement explainable AI using SHAP\
-   Build modular backend architecture with FastAPI\
-   Integrate ML models with React frontend dashboards\
-   Design gamification strategies for behavioural reinforcement

------------------------------------------------------------------------

# 🚀 Future Enhancements

-   Real banking API integration\
-   Live transaction streaming support\
-   Mobile application for real-time behavioural alerts\
-   Explainable AI dashboard with interactive SHAP plots\
-   Adaptive reinforcement learning for personalized challenges\
-   Cloud deployment using Docker + AWS/GCP\
-   Advanced anomaly detection using deep learning

------------------------------------------------------------------------

# 👨‍💻 Author

**Jeeva M**\
AI / ML Engineer\
ImpulseGuard -- Behavioural Intelligence & Gamified Finance System

------------------------------------------------------------------------

# 🎯 Final Conclusion

ImpulseGuard demonstrates that:

Financial behaviour can be\
Predicted,\
Explained,\
Tracked,\
And Gamified.

It bridges:

Machine Learning\
Behavioural Economics\
Gamification Psychology\
Production-Ready Architecture
