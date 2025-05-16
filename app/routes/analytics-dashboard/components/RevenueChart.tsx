import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UniversalChartCard } from '@/components/building-blocks/universal-chart-card/universal-chart-card';

export const revenueChartQuery = `
  SELECT 
    DATE_TRUNC('month', r.date) as month,
    SUM(r.total_revenue) as monthly_revenue,
    SUM(r.total_cost) as monthly_cost,
    SUM(r.net_profit) as monthly_profit 
  FROM revenue r 
  GROUP BY DATE_TRUNC('month', r.date) 
  ORDER BY month DESC 
  LIMIT 12
`;

export type RevenueChartData = {
  month: string;
  monthly_revenue: number;
  monthly_cost: number;
  monthly_profit: number;
};

interface RevenueChartProps {
  data: RevenueChartData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const formattedData = data.map((item) => ({
    ...item,
    month: new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  }));

  const chartConfig = {
    monthly_revenue: {
      label: 'Revenue',
      color: 'var(--chart-1)',
    },
    monthly_cost: {
      label: 'Cost',
      color: 'var(--chart-2)',
    },
    monthly_profit: {
      label: 'Profit',
      color: 'var(--chart-3)',
    },
  };

  return (
    <UniversalChartCard
      title="Revenue Overview"
      description="Monthly revenue, cost, and profit trends"
      chartConfig={chartConfig}
    >
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="monthly_revenue"
            stackId="1"
            stroke="var(--chart-1-stroke)"
            fill="var(--chart-1)"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="monthly_cost"
            stackId="2"
            stroke="var(--chart-2-stroke)"
            fill="var(--chart-2)"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="monthly_profit"
            stackId="3"
            stroke="var(--chart-3-stroke)"
            fill="var(--chart-3)"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </UniversalChartCard>
  );
}
