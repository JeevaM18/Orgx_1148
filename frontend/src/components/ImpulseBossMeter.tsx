import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import monsterCalm from "@/assets/Low Risk.jpg";
import monsterAlert from "@/assets/Medium Risk.jpg";
import monsterAngry from "@/assets/High Risk.jpg";

interface Props {
  riskScore: number;
  riskLevel: string;
}

/* -------- tiny spark / flame particle -------- */
const Particle = ({ color, delay, x, y, size = 6, type = "spark" }: { color: string; delay: number; x: number; y: number; size?: number; type?: string }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      background: color,
      left: `${50 + x}%`,
      top: `${50 + y}%`,
      boxShadow: `0 0 ${size * 2}px ${color}`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1.2, 0.8, 0],
      y: type === "flame" ? [0, -30, -50] : [0, -15, -25],
      x: type === "flame" ? [0, x * 0.3] : [0, x * 0.5],
    }}
    transition={{
      duration: type === "flame" ? 1.2 : 1.8,
      repeat: Infinity,
      delay,
      ease: "easeOut",
    }}
  />
);

const ImpulseBossMeter = ({ riskScore, riskLevel }: Props) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (riskScore / 100) * circumference;
  const [prevScore, setPrevScore] = useState(riskScore);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (riskScore < prevScore) setFlash("down");
    else if (riskScore > prevScore) setFlash("up");
    setPrevScore(riskScore);
    const t = setTimeout(() => setFlash(null), 1200);
    return () => clearTimeout(t);
  }, [riskScore]);

  const getColor = () => {
    if (riskScore < 40) return "hsl(var(--neon-green))";
    if (riskScore < 70) return "hsl(var(--neon-yellow))";
    return "hsl(var(--neon-red))";
  };

  const getMonster = () => {
    if (riskScore < 40) return monsterCalm;
    if (riskScore < 70) return monsterAlert;
    return monsterAngry;
  };

  const state = riskScore < 40 ? "calm" : riskScore < 70 ? "alert" : "angry";

  /* character animation variants per state */
  const characterVariants = {
    calm: {
      scale: [1, 1.04, 1],
      y: [0, -4, 0],
      rotate: [0, 1, -1, 0],
      transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const },
    },
    alert: {
      scale: [1, 1.02, 1],
      x: [-1.5, 1.5, -1.5],
      transition: { duration: 0.6, repeat: Infinity, ease: "easeInOut" as const },
    },
    angry: {
      scale: [1, 1.06, 0.97, 1.04, 1],
      x: [-3, 3, -4, 2, 0],
      rotate: [-2, 2, -3, 1, 0],
      transition: { duration: 0.45, repeat: Infinity, ease: "easeInOut" as const },
    },
  };

  /* aura glow variants */
  const auraVariants = {
    calm: {
      opacity: [0.15, 0.3, 0.15],
      scale: [1, 1.15, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
    },
    alert: {
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.1, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
    },
    angry: {
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.2, 1],
      transition: { duration: 0.7, repeat: Infinity, ease: "easeInOut" as const },
    },
  };

  const auraColor =
    state === "calm"
      ? "hsl(var(--neon-cyan))"
      : state === "alert"
        ? "hsl(var(--neon-yellow))"
        : "hsl(var(--neon-red))";

  /* spark / flame particles */
  const particles =
    state === "angry"
      ? Array.from({ length: 10 }, (_, i) => ({
        color: i % 2 === 0 ? "hsl(var(--neon-red))" : "hsl(45,100%,55%)",
        delay: i * 0.15,
        x: (Math.random() - 0.5) * 50,
        y: (Math.random() - 0.5) * 50,
        size: 4 + Math.random() * 5,
        type: "flame" as const,
      }))
      : state === "alert"
        ? Array.from({ length: 5 }, (_, i) => ({
          color: "hsl(var(--neon-yellow))",
          delay: i * 0.35,
          x: (Math.random() - 0.5) * 40,
          y: (Math.random() - 0.5) * 40,
          size: 3 + Math.random() * 3,
          type: "spark" as const,
        }))
        : [];

  return (
    <div className="glass-card p-6 flex flex-col items-center gap-4">
      <h3 className="font-display text-sm tracking-widest text-primary uppercase">
        Impulse Boss Meter
      </h3>

      <div className="relative w-52 h-52 flex items-center justify-center">
        {/* outer pulsing ring for angry */}
        {state === "angry" && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid hsl(var(--neon-red))" }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        {/* SVG gauge */}
        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
          <motion.circle
            cx="100" cy="100" r={radius} fill="none"
            stroke={getColor()} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${getColor()})` }}
          />
        </svg>

        {/* aura glow behind character */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 100,
            height: 100,
            background: `radial-gradient(circle, ${auraColor} 0%, transparent 70%)`,
            filter: `blur(12px)`,
          }}
          animate={auraVariants[state]}
        />

        {/* particles / flames */}
        {particles.map((p, i) => (
          <Particle key={`${state}-${i}`} {...p} />
        ))}

        {/* animated monster character */}
        <motion.div
          key={state}
          className="relative z-10"
          animate={characterVariants[state]}
        >
          <img
            src={getMonster()}
            alt="Impulse Character"
            className="w-28 h-28 rounded-full object-cover"
            style={{
              filter:
                state === "angry"
                  ? "drop-shadow(0 0 12px hsl(0 80% 55% / 0.7))"
                  : state === "alert"
                    ? "drop-shadow(0 0 8px hsl(45 100% 55% / 0.5))"
                    : "drop-shadow(0 0 6px hsl(185 100% 50% / 0.4))",
            }}
          />
        </motion.div>

        {/* angry red eye glow overlay */}
        {state === "angry" && (
          <motion.div
            className="absolute z-20 rounded-full pointer-events-none"
            style={{
              width: 24, height: 24,
              background: "radial-gradient(circle, hsl(0 80% 55% / 0.6) 0%, transparent 70%)",
              top: "38%", left: "50%", transform: "translateX(-50%)",
            }}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}

        {/* victory sparkle on risk decrease */}
        {flash === "down" && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none z-30"
            style={{
              background: "radial-gradient(circle, hsl(var(--neon-green) / 0.4) 0%, transparent 60%)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.3, 1.5] }}
            transition={{ duration: 1.2 }}
          />
        )}

        {/* warning flash on risk increase */}
        {flash === "up" && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none z-30"
            style={{
              border: "3px solid hsl(var(--neon-red))",
            }}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: [0, 1, 0], scale: [1, 1.15, 1.2] }}
            transition={{ duration: 1 }}
          />
        )}
      </div>

      <div className="text-center">
        <motion.span
          className="font-display text-3xl neon-text-cyan"
          key={riskScore}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          {riskScore.toFixed(1)}
        </motion.span>
        <p className="text-muted-foreground text-sm mt-1">Impulse Risk Score</p>
      </div>

      <div className={`badge-unlock ${riskScore >= 70 ? 'border-neon-red' : riskScore >= 40 ? 'border-neon-yellow' : 'border-neon-green'}`}>
        {riskLevel} Risk
      </div>

      {/* Boss Health Bar */}
      <div className="w-full">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Boss Health</span>
          <span>{riskScore.toFixed(0)}%</span>
        </div>
        <div className="progress-bar-track h-3">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${getColor()}, hsl(var(--neon-purple)))` }}
            initial={{ width: 0 }}
            animate={{ width: `${riskScore}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImpulseBossMeter;
