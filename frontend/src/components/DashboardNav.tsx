import { Shield, User, Gamepad2, TrendingUp } from "lucide-react";

const tabs = [
  { id: "battle", label: "Battle Dashboard", icon: Shield },
  { id: "profile", label: "Behaviour Profile", icon: User },
  { id: "arena", label: "Gamification Arena", icon: Gamepad2 },
  { id: "forecast", label: "Financial Forecast", icon: TrendingUp },
];

interface Props {
  active: string;
  onChange: (id: string) => void;
}

const DashboardNav = ({ active, onChange }: Props) => (
  <nav className="glass-card p-1.5 flex gap-1 overflow-x-auto">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-heading font-semibold transition-all whitespace-nowrap ${
          active === tab.id
            ? "bg-primary/15 text-primary neon-glow-cyan"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
        }`}
      >
        <tab.icon className="w-4 h-4" />
        {tab.label}
      </button>
    ))}
  </nav>
);

export default DashboardNav;
