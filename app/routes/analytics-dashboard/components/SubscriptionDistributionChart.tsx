import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { UniversalChartCard } from '@/components/building-blocks/universal-chart-card/universal-chart-card';

export const subscriptionDistributionQuery = `
  SELECT 
    subscription_tier,
    COUNT(*) as organization_count,
    AVG(EXTRACT(EPOCH FROM (next_payment_date - last_payment_date))/86400) as avg_subscription_length_days 
  FROM organizations 
  WHERE subscription_tier IS NOT NULL 
  GROUP BY subscription_tier 
  ORDER BY organization_count DESC
`;

export type SubscriptionDistributionData = {
  subscription_tier: string;
  organization_count: number;
  avg_subscription_length_days: number;
};

interface SubscriptionDistributionChartProps {
  data: SubscriptionDistributionData[];
}

export function SubscriptionDistributionChart({ data }: SubscriptionDistributionChartProps) {
  const chartConfig = {
    organization_count: {
      label: 'Organizations',
      color: 'var(--chart-6)',
    },
  };

  const COLORS = ['var(--chart-6)', 'var(--chart-7)', 'var(--chart-8)', 'var(--chart-9)'];

  return (
    <UniversalChartCard
      title="Subscription Distribution"
      description="Distribution of organizations across subscription tiers"
      chartConfig={chartConfig}
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="organization_count"
            nameKey="subscription_tier"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="var(--chart-6)"
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.subscription_tier} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </UniversalChartCard>
  );
}
