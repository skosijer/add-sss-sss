import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UniversalChartCard } from '@/components/building-blocks/universal-chart-card/universal-chart-card';

export const topProductsQuery = `
  SELECT 
    p.product_name,
    SUM(si.quantity) as total_quantity_sold,
    SUM(si.total_price) as total_revenue 
  FROM products p 
  JOIN sale_items si ON p.product_id = si.product_id 
  GROUP BY p.product_id, p.product_name 
  ORDER BY total_revenue DESC 
  LIMIT 5
`;

export type TopProductsData = {
  product_name: string;
  total_quantity_sold: number;
  total_revenue: number;
};

interface TopProductsChartProps {
  data: TopProductsData[];
}

export function TopProductsChart({ data }: TopProductsChartProps) {
  const chartConfig = {
    total_revenue: {
      label: 'Revenue',
      color: 'var(--chart-4)',
    },
    total_quantity_sold: {
      label: 'Quantity Sold',
      color: 'var(--chart-5)',
    },
  };

  return (
    <UniversalChartCard
      title="Top Products"
      description="Best-selling products by revenue and quantity"
      chartConfig={chartConfig}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product_name" />
          <YAxis yAxisId="left" orientation="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Bar
            yAxisId="left"
            dataKey="total_revenue"
            fill="var(--chart-4)"
            stroke="var(--chart-4-stroke)"
            name="Revenue"
          />
          <Bar
            yAxisId="right"
            dataKey="total_quantity_sold"
            fill="var(--chart-5)"
            stroke="var(--chart-5-stroke)"
            name="Quantity Sold"
          />
        </BarChart>
      </ResponsiveContainer>
    </UniversalChartCard>
  );
}
