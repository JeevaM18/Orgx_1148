import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000"
});

export interface RiskData {
  risk_score: number;
  risk_level: "Low" | "Medium" | "High";
  top_triggers: { feature: string; impact: number; trigger_type: string }[];
}

export interface UpcomingData {
  upcoming_risk_probability: number;
  pre_impulse_warning: boolean;
}

export interface ProfileData {
  personality: string;
  cluster_id: number;
}

export interface GamificationData {
  control_score: number;
  streak: number;
  challenges: {
    night_control: number;
    salary_smart: number;
    burst_control: number;
  };
  badges: string[];
  self_control_strength: number;
  risk_reduction_percentage: number;
}

export interface VolatilityData {
  night_risk: number;
  salary_risk: number;
  burst_risk: number;
  category_volatility: number;
  spend_spike: number;
}

export interface ForecastData {
  trend_type: string;
  trend_slope: number;
  future_stability_indicator: number;
}

export interface SimulationPayload {
  amount: number;
  category: string;
  time: string;
  payment: string;
  weekend: boolean;
}

export interface SimulationResponse {
  risk: RiskData;
  upcoming: UpcomingData;
  profile: ProfileData;
  gamification: GamificationData;
  volatility: VolatilityData;
  forecast: ForecastData;
}

export const api = {
  getRisk: async (userId: string) => (await apiClient.get<RiskData>(`/risk/${userId}`)).data,
  getUpcoming: async (userId: string) => (await apiClient.get<UpcomingData>(`/upcoming/${userId}`)).data,
  getProfile: async (userId: string) => (await apiClient.get<ProfileData>(`/profile/${userId}`)).data,
  getGamification: async (userId: string) => (await apiClient.get<GamificationData>(`/gamification/${userId}`)).data,
  getVolatility: async (userId: string) => (await apiClient.get<VolatilityData>(`/volatility/${userId}`)).data,
  getForecast: async (userId: string) => (await apiClient.get<ForecastData>(`/forecast/${userId}`)).data,
  getSimulation: async (payload: SimulationPayload) => (await apiClient.post<SimulationResponse>("/simulate", payload)).data,
};

// Fallback mock data for demo when API is unavailable
export const mockData = {
  risk: {
    risk_score: 72.4, risk_level: "High", top_triggers: [
      { feature: "spend_spike_ratio", impact: 0.42, trigger_type: "Spike Trigger" },
      { feature: "night_purchase_freq", impact: 0.31, trigger_type: "Emotional" },
      { feature: "salary_week_spending", impact: 0.22, trigger_type: "Salary" },
    ]
  } as RiskData,
  upcoming: { upcoming_risk_probability: 0.67, pre_impulse_warning: true } as UpcomingData,
  profile: { personality: "Night Impulse Buyer", cluster_id: 1 } as ProfileData,
  gamification: {
    control_score: 28.5, streak: 4,
    challenges: { night_control: 0.8, salary_smart: 0.6, burst_control: 0.7 },
    badges: ["Discipline Streak", "High Control Achiever"],
    self_control_strength: 74, risk_reduction_percentage: 12,
  } as GamificationData,
  volatility: { night_risk: 0.45, salary_risk: 0.32, burst_risk: 0.60, category_volatility: 0.41, spend_spike: 0.52 } as VolatilityData,
  forecast: { trend_type: "Improving Stability", trend_slope: -0.013, future_stability_indicator: 0.76 } as ForecastData,
};
