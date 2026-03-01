import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Swords, Zap, ChevronRight } from "lucide-react";
import Hyperspeed from "@/components/Hyperspeed";

const sampleUsers = ["user_0", "user_1", "user_2", "user_3", "user_4", "user_30", "user_39"];

const Index = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"landing" | "select">("landing");
  const [selectedUser, setSelectedUser] = useState(sampleUsers[0]);
  const [simForm, setSimForm] = useState({ amount: "", category: "", time: "", payment: "", weekend: false });
  const [inputMode, setInputMode] = useState<"demo" | "simulate">("demo");

  const startBattle = () => {
    if (inputMode === "demo") {
      navigate(`/dashboard?user=${selectedUser}`);
    } else {
      const qs = new URLSearchParams({
        mode: "simulate",
        amount: simForm.amount || "0",
        category: simForm.category,
        time: simForm.time,
        payment: simForm.payment,
        weekend: simForm.weekend.toString(),
      }).toString();
      navigate(`/dashboard?${qs}`);
    }
  };

  if (mode === "select") {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <Hyperspeed />
        <motion.div className="relative z-10 w-full max-w-lg mx-4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="glass-card p-8">
            <h2 className="font-display text-xl neon-text-cyan text-center mb-6">Choose Your Mode</h2>

            <div className="flex gap-2 mb-6">
              {(["demo", "simulate"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setInputMode(m)}
                  className={`flex-1 py-2 rounded-lg font-heading text-sm font-semibold transition-all ${inputMode === m ? "bg-primary/15 text-primary neon-glow-cyan" : "bg-muted/30 text-muted-foreground"
                    }`}
                >
                  {m === "demo" ? "Demo Mode" : "Live Simulation"}
                </button>
              ))}
            </div>

            {inputMode === "demo" ? (
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Select Sample User</label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full p-3 rounded-lg bg-muted/50 border border-border text-foreground font-heading focus:outline-none focus:border-primary"
                >
                  {sampleUsers.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { label: "Transaction Amount", key: "amount", type: "number", placeholder: "e.g. 150" },
                  { label: "Merchant Category", key: "category", type: "text", placeholder: "e.g. Electronics" },
                  { label: "Time of Transaction", key: "time", type: "time", placeholder: "" },
                  { label: "Payment Mode", key: "payment", type: "text", placeholder: "e.g. Credit Card" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={simForm[field.key as keyof typeof simForm] as string}
                      onChange={(e) => setSimForm((p) => ({ ...p, [field.key]: e.target.value }))}
                      className="w-full p-2.5 rounded-lg bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                ))}
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" checked={simForm.weekend} onChange={(e) => setSimForm((p) => ({ ...p, weekend: e.target.checked }))} className="accent-primary" />
                  Is it weekend?
                </label>
              </div>
            )}

            <motion.button
              onClick={startBattle}
              className="w-full mt-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm tracking-wider neon-glow-cyan"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {inputMode === "demo" ? "Enter Battle Arena" : "Simulate Behaviour"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Hyperspeed />

      {/* Animated Hero BG Replacement */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_50%_50%,_hsla(var(--neon-cyan)/0.15)_0%,_transparent_50%)] rounded-full blur-[100px] opacity-50"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 top-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_50%_50%,_hsla(var(--neon-purple)/0.15)_0%,_transparent_60%)] rounded-full blur-[80px] opacity-40 translate-x-1/3 -translate-y-1/3"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute left-0 bottom-0 w-[45vw] h-[45vw] bg-[radial-gradient(circle_at_50%_50%,_hsla(var(--neon-red)/0.12)_0%,_transparent_60%)] rounded-full blur-[90px] opacity-40 -translate-x-1/4 translate-y-1/4"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-3 justify-center mb-6">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="font-display text-4xl md:text-6xl neon-text-cyan tracking-wider">ImpulseGuard</h1>
          </div>

          <p className="font-heading text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto mb-2">
            AI-Powered Behavioural Finance & Self-Control Game System
          </p>
          <p className="text-muted-foreground/70 text-sm font-heading italic mb-10">
            "Train Your Financial Mind. Defeat Impulse."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.button
              onClick={() => setMode("select")}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-display text-sm tracking-wider neon-glow-cyan"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Swords className="w-5 h-5" />
              Start Your Financial Battle
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Shield, title: "Battle Dashboard", desc: "Fight your Impulse Monster in real-time" },
              { icon: Zap, title: "AI Risk Analysis", desc: "Predict spending surges before they happen" },
              { icon: Swords, title: "Gamified Training", desc: "Level up your financial discipline" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className="glass-card-hover p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                <f.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
