import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import type { VolatilityData } from "@/lib/api";

const VolatilityRadar = ({ data }: { data: VolatilityData }) => {
  const chartData = [
    { axis: "Night Risk", value: data.night_risk * 100 },
    { axis: "Salary Risk", value: data.salary_risk * 100 },
    { axis: "Burst Risk", value: data.burst_risk * 100 },
    { axis: "Category Vol.", value: data.category_volatility * 100 },
    { axis: "Spend Spike", value: data.spend_spike * 100 },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="font-display text-sm tracking-widest text-primary uppercase mb-4">Volatility Radar</h3>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="hsl(230, 30%, 25%)" />
          <PolarAngleAxis dataKey="axis" tick={{ fill: "hsl(215, 20%, 60%)", fontSize: 11 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Risk" dataKey="value" stroke="hsl(185, 100%, 50%)" fill="hsl(185, 100%, 50%)" fillOpacity={0.2} strokeWidth={2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolatilityRadar;
