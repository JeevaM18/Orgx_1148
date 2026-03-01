import { motion } from "framer-motion";
import { Flame, Moon, DollarSign, Zap, Trophy, Award, TrendingUp, TrendingDown } from "lucide-react";
import type { GamificationData } from "@/lib/api";

const GamificationArena = ({ data }: { data: GamificationData }) => {
  const challenges = [
    { name: "Night Control", value: data.challenges.night_control * 100, icon: Moon, color: "hsl(var(--neon-blue))" },
    { name: "Salary Smart", value: data.challenges.salary_smart * 100, icon: DollarSign, color: "hsl(var(--neon-green))" },
    { name: "Burst Control", value: data.challenges.burst_control * 100, icon: Zap, color: "hsl(var(--neon-purple))" },
  ];

  return (
    <div className="space-y-6">
      {/* Self-Control Strength */}
      <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="font-display text-sm tracking-widest text-primary uppercase mb-4">Self-Control Strength Index</h3>
        <div className="flex items-end gap-3 mb-3">
          <span className="font-display text-4xl neon-text-cyan">{data.self_control_strength}</span>
          <span className="text-muted-foreground text-sm pb-1">/ 100</span>
        </div>
        <p className="text-xs text-muted-foreground mb-2">Financial Discipline Level</p>
        <div className="progress-bar-track h-4">
          <motion.div
            className="progress-bar-fill h-full"
            initial={{ width: 0 }}
            animate={{ width: `${data.self_control_strength}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        {/* Weekly Improvement */}
        <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-muted/30">
          {data.risk_reduction_percentage > 0 ? (
            <TrendingUp className="w-5 h-5 text-neon-green" />
          ) : (
            <TrendingDown className="w-5 h-5 text-neon-red" />
          )}
          <span className="text-sm font-heading">
            You improved <span className="neon-text-cyan font-bold">{data.risk_reduction_percentage}%</span> this week
          </span>
        </div>
      </motion.div>

      {/* Challenges */}
      <div className="glass-card p-6">
        <h3 className="font-display text-sm tracking-widest text-primary uppercase mb-4">Behaviour Challenges</h3>
        <div className="space-y-4">
          {challenges.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="flex items-center gap-3 mb-1">
                <c.icon className="w-4 h-4" style={{ color: c.color }} />
                <span className="font-heading text-sm flex-1">{c.name} Challenge</span>
                <span className="font-display text-xs text-muted-foreground">{c.value.toFixed(0)}%</span>
              </div>
              <div className="progress-bar-track h-2">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: c.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${c.value}%` }}
                  transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Streak & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div className="glass-card p-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Flame className="w-10 h-10 text-neon-yellow mx-auto mb-2" />
          <span className="font-display text-3xl neon-text-cyan">{data.streak}</span>
          <p className="text-muted-foreground text-sm mt-1">Day Discipline Streak</p>
        </motion.div>

        <div className="glass-card p-6">
          <h4 className="font-display text-xs tracking-widest text-primary uppercase mb-3">Badges Earned</h4>
          <div className="flex flex-wrap gap-2">
            {data.badges.map((badge, i) => (
              <motion.div
                key={badge}
                className="badge-unlock"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.2, type: "spring" }}
              >
                {i === 0 ? <Trophy className="w-4 h-4 text-neon-yellow" /> : <Award className="w-4 h-4 text-neon-cyan" />}
                {badge}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamificationArena;
