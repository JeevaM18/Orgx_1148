import { motion } from "framer-motion";
import { AlertTriangle, Shield } from "lucide-react";
import type { UpcomingData } from "@/lib/api";

const RiskWarning = ({ data }: { data: UpcomingData }) => {
  const prob = (data.upcoming_risk_probability * 100).toFixed(0);
  const isWarning = data.pre_impulse_warning;

  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-sm tracking-widest text-primary uppercase mb-4">Upcoming Risk Warning</h3>

      {isWarning ? (
        <motion.div
          className="flex items-center gap-4 p-4 rounded-lg border border-neon-red/30 bg-neon-red/5"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <AlertTriangle className="w-10 h-10 text-neon-red flex-shrink-0" />
          <div>
            <p className="font-heading text-xl font-bold text-neon-red">⚠ Impulse Surge Detected</p>
            <p className="text-muted-foreground text-sm mt-1">Probability: {prob}%</p>
          </div>
        </motion.div>
      ) : (
        <div className="flex items-center gap-4 p-4 rounded-lg border border-neon-green/30 bg-neon-green/5">
          <Shield className="w-10 h-10 text-neon-green flex-shrink-0" />
          <div>
            <p className="font-heading text-xl font-bold text-neon-green">All Clear</p>
            <p className="text-muted-foreground text-sm mt-1">Risk Probability: {prob}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskWarning;
