import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api, mockData, type RiskData, type UpcomingData, type ProfileData, type GamificationData, type VolatilityData, type ForecastData } from "@/lib/api";
import Hyperspeed from "@/components/Hyperspeed";
import DashboardNav from "@/components/DashboardNav";
import ImpulseBossMeter from "@/components/ImpulseBossMeter";
import RiskWarning from "@/components/RiskWarning";
import VolatilityRadar from "@/components/VolatilityRadar";
import BehaviourProfile from "@/components/BehaviourProfile";
import GamificationArena from "@/components/GamificationArena";
import ForecastTrajectory from "@/components/ForecastTrajectory";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("user") || "user_0";
  const [tab, setTab] = useState("battle");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [risk, setRisk] = useState<RiskData>(mockData.risk);
  const [upcoming, setUpcoming] = useState<UpcomingData>(mockData.upcoming);
  const [profile, setProfile] = useState<ProfileData>(mockData.profile);
  const [gamification, setGamification] = useState<GamificationData>(mockData.gamification);
  const [volatility, setVolatility] = useState<VolatilityData>(mockData.volatility);
  const [forecast, setForecast] = useState<ForecastData>(mockData.forecast);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const mode = searchParams.get("mode");
        if (mode === "simulate") {
          const payload = {
            amount: parseFloat(searchParams.get("amount") || "0"),
            category: searchParams.get("category") || "",
            time: searchParams.get("time") || "",
            payment: searchParams.get("payment") || "",
            weekend: searchParams.get("weekend") === "true",
          };
          const res = await api.getSimulation(payload);
          setRisk(res.risk);
          setUpcoming(res.upcoming);
          setProfile(res.profile);
          setGamification(res.gamification);
          setVolatility(res.volatility);
          setForecast(res.forecast);
        } else {
          const [r, u, p, g, v, f] = await Promise.all([
            api.getRisk(userId), api.getUpcoming(userId), api.getProfile(userId),
            api.getGamification(userId), api.getVolatility(userId), api.getForecast(userId),
          ]);
          setRisk(r); setUpcoming(u); setProfile(p); setGamification(g); setVolatility(v); setForecast(f);
        }
      } catch {
        // Fallback gracefully without crashing
        setError(true);
      }
      setLoading(false);
    };
    fetchAll();
  }, [userId, searchParams]);

  return (
    <div className="min-h-screen relative">
      <Hyperspeed />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-muted/30 transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div>
            <h1 className="font-display text-xl neon-text-cyan tracking-wider">ImpulseGuard</h1>
            <p className="text-muted-foreground text-xs font-heading">Player: {userId}</p>
          </div>
        </div>

        <DashboardNav active={tab} onChange={setTab} />

        <div className="mt-6">
          <AnimatePresence mode="wait">
            {error && !loading && (
              <motion.div
                className="mb-6 p-4 rounded-lg bg-neon-red/10 border border-neon-red/30 text-neon-red flex items-center justify-center font-heading font-semibold"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                ⚠ Unable to load financial battle data. Showing simulation mode.
              </motion.div>
            )}

            {loading ? (
              <motion.div key="loading" className="flex items-center justify-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </motion.div>
            ) : (
              <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                {tab === "battle" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ImpulseBossMeter riskScore={risk.risk_score} riskLevel={risk.risk_level} />
                    <div className="space-y-6">
                      <RiskWarning data={upcoming} />
                      <VolatilityRadar data={volatility} />
                    </div>
                  </div>
                )}
                {tab === "profile" && <BehaviourProfile profile={profile} triggers={risk.top_triggers} />}
                {tab === "arena" && <GamificationArena data={gamification} />}
                {tab === "forecast" && <ForecastTrajectory forecast={forecast} riskScore={risk.risk_score} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
