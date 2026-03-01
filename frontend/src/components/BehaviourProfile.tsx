import { motion } from "framer-motion";
import { Brain, Zap, DollarSign, Flame } from "lucide-react";
import type { ProfileData, RiskData } from "@/lib/api";

const triggerIcons: Record<string, typeof Brain> = {
  "Emotional Trigger": Brain,
  "Salary Cycle Trigger": DollarSign,
  "Impulse Burst Trigger": Zap,
  "Emotional": Brain,
  "Spike Trigger": Zap,
  "Salary": DollarSign,
  "Burst": Flame,
};

interface Props {
  profile: ProfileData;
  triggers: RiskData["top_triggers"];
}

const BehaviourProfile = ({ profile, triggers }: Props) => {
  return (
    <div className="space-y-6">
      <motion.div className="glass-card p-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-muted-foreground text-sm mb-2">Your Personality Type</p>
        <h2 className="font-display text-2xl neon-text-purple mb-3">{profile.personality}</h2>
        <span className="badge-unlock">Cluster {profile.cluster_id}</span>
      </motion.div>

      <div className="glass-card p-6">
        <h3 className="font-display text-sm tracking-widest text-primary uppercase mb-6">Top 3 Behavioural Triggers</h3>
        <div className="space-y-4">
          {triggers.slice(0, 3).map((trigger, i) => {
            const Icon = triggerIcons[trigger.trigger_type] || Zap;
            return (
              <motion.div
                key={trigger.feature}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-heading text-base font-semibold text-foreground">{trigger.feature.replace(/_/g, " ")}</p>
                  <p className="text-xs text-muted-foreground">{trigger.trigger_type}</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-lg neon-text-cyan">{(trigger.impact * 100).toFixed(0)}%</span>
                  <p className="text-xs text-muted-foreground">Impact</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BehaviourProfile;
