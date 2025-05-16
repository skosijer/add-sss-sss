import { useLoaderData } from '@remix-run/react';
import { executePostgresQuery } from '@/db/execute-query';
import { WithErrorHandling } from '@/components/hoc/error-handling-wrapper/error-handling-wrapper';
import { KeyMetrics, KeyMetricsData, keyMetricsQuery } from './analytics-dashboard/components/KeyMetrics';
import { RevenueChart, RevenueChartData, revenueChartQuery } from './analytics-dashboard/components/RevenueChart';
import { TopOrganizationsTable, TopOrganizationsData, topOrganizationsQuery } from './analytics-dashboard/components/TopOrganizationsTable';
import { TopProductsChart, TopProductsData, topProductsQuery } from './analytics-dashboard/components/TopProductsChart';
import { SubscriptionDistributionChart, SubscriptionDistributionData, subscriptionDistributionQuery } from './analytics-dashboard/components/SubscriptionDistributionChart';

export async function loader() {
  const [
    keyMetrics,
    revenueData,
    topOrganizations,
    topProducts,
    subscriptionDistribution,
  ] = await Promise.all([
    executePostgresQuery<KeyMetricsData>(keyMetricsQuery),
    executePostgresQuery<RevenueChartData>(revenueChartQuery),
    executePostgresQuery<TopOrganizationsData>(topOrganizationsQuery),
    executePostgresQuery<TopProductsData>(topProductsQuery),
    executePostgresQuery<SubscriptionDistributionData>(subscriptionDistributionQuery),
  ]);

  return {
    keyMetrics,
    revenueData,
    topOrganizations,
    topProducts,
    subscriptionDistribution,
  };
}

export default function AnalyticsDashboard() {
  const {
    keyMetrics,
    revenueData,
    topOrganizations,
    topProducts,
    subscriptionDistribution,
  } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Business Analytics Dashboard</h1>

      <WithErrorHandling
        queryData={keyMetrics}
        render={(data) => <KeyMetrics data={data} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WithErrorHandling
          queryData={revenueData}
          render={(data) => <RevenueChart data={data} />}
        />
        <WithErrorHandling
          queryData={topProducts}
          render={(data) => <TopProductsChart data={data} />}
        />
      </div>

      <WithErrorHandling
        queryData={topOrganizations}
        render={(data) => <TopOrganizationsTable data={data} />}
      />

      <WithErrorHandling
        queryData={subscriptionDistribution}
        render={(data) => <SubscriptionDistributionChart data={data} />}
      />
    </div>
  );
}
