import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Activity } from "lucide-react";
import type { ForecastData } from "@/lib/api";

interface Props {
  forecast: ForecastData;
  riskScore: number;
}

const ForecastTrajectory = ({ forecast, riskScore }: Props) => {
  const isImproving = forecast.trend_slope < 0;
  const isStable = Math.abs(forecast.trend_slope) < 0.005;

  const getDriftScore = () => {
    if (riskScore < 30) return { score: "Low", color: "text-neon-green", label: "Improving", bg: "bg-neon-green/10 border-neon-green/30" };
    if (riskScore < 60) return { score: "Medium", color: "text-neon-yellow", label: "Stable", bg: "bg-neon-yellow/10 border-neon-yellow/30" };
    return { score: "High", color: "text-neon-red", label: "Volatile", bg: "bg-neon-red/10 border-neon-red/30" };
  };

  const drift = getDriftScore();

  return (
    <div className="space-y-6">
      {/* 30-Day Trend */}
      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="font-display text-sm tracking-widest text-primary uppercase mb-6">30-Day Financial Trajectory</h3>

        <div className="flex items-center gap-6">
          <motion.div
            className="w-20 h-20 rounded-full flex items-center justify-center neon-glow-cyan bg-primary/10"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isStable ? <Minus className="w-10 h-10 text-neon-yellow" /> :
              isImproving ? <TrendingDown className="w-10 h-10 text-neon-green" /> :
                <TrendingUp className="w-10 h-10 text-neon-red" />}
          </motion.div>
          <div>
            <p className="font-heading text-2xl font-bold text-foreground">{forecast.trend_type}</p>
            <p className="text-muted-foreground text-sm">Trend slope: {forecast.trend_slope.toFixed(4)}</p>
          </div>
        </div>

        {/* Arrows */}
        <div className="mt-6 flex gap-2 justify-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: isImproving ? -10 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {isImproving ? (
                <TrendingDown className="w-6 h-6 text-neon-green" />
              ) : (
                <TrendingUp className="w-6 h-6 text-neon-red" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Behaviour Stability Tracker */}
      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="font-display text-sm tracking-widest text-primary uppercase mb-4">Behaviour Stability Tracker</h3>

        <div className="flex items-center gap-4">
          <Activity className={`w-8 h-8 ${drift.color}`} />
          <div className="flex-1">
            <p className="font-heading text-lg font-bold">Behavioural Drift Score</p>
            <div className={`mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${drift.bg}`}>
              <span className={`w-2 h-2 rounded-full ${drift.color.replace('text-', 'bg-')}`} />
              <span className={`font-display text-xs ${drift.color}`}>{drift.label}</span>
            </div>
          </div>
          <span className={`font-display text-3xl ${drift.color}`}>{drift.score}</span>
        </div>

        {/* Future Stability */}
        <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border">
          <p className="text-xs text-muted-foreground mb-1">Future Stability Indicator</p>
          <div className="progress-bar-track h-2">
            <motion.div
              className="h-full rounded-full"
              style={{ background: isImproving ? "hsl(var(--neon-green))" : "hsl(var(--neon-red))" }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.abs(forecast.future_stability_indicator) * 100)}%` }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForecastTrajectory;
