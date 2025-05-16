import { UniversalTableCard } from '@/components/building-blocks/universal-table-card/universal-table-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const topOrganizationsQuery = `
  SELECT 
    o.organization_name,
    SUM(r.total_revenue) as total_revenue,
    COUNT(DISTINCT s.sale_id) as total_sales 
  FROM organizations o 
  LEFT JOIN revenue r ON o.organization_id = r.organization_id 
  LEFT JOIN sales s ON o.organization_id = s.organization_id 
  GROUP BY o.organization_id, o.organization_name 
  ORDER BY total_revenue DESC 
  LIMIT 10
`;

export type TopOrganizationsData = {
  organization_name: string;
  total_revenue: number;
  total_sales: number;
};

interface TopOrganizationsTableProps {
  data: TopOrganizationsData[];
}

export function TopOrganizationsTable({ data }: TopOrganizationsTableProps) {
  return (
    <UniversalTableCard
      title="Top Organizations"
      description="Top 10 organizations by revenue"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">Sales</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((org) => (
            <TableRow key={org.organization_name}>
              <TableCell>{org.organization_name}</TableCell>
              <TableCell className="text-right">
                ${org.total_revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="text-right">{org.total_sales.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </UniversalTableCard>
  );
}
