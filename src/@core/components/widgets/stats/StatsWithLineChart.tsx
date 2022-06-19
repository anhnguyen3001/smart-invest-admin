// ** Custom Components
import Avatar, { AvatarProps } from '@core/components/avatar';

import Chart, { Props } from 'react-apexcharts';

// ** Reactstrap Imports
import { Card, CardHeader, CardText } from 'reactstrap';

// ** Default Options
import { lineChartOptions } from './ChartOptions';

interface StatsWithLineChartProps {
  type?: Props['type'];
  height?: string;
  options?: object;
  icon: React.ReactNode;
  color: string;
  stats: string;
  series: any[];
  statTitle: string;
}

const StatsWithLineChart: React.FC<StatsWithLineChartProps> = ({
  icon,
  color = 'primary',
  stats,
  statTitle,
  series,
  options = lineChartOptions,
  type,
  height,
  ...rest
}) => {
  return (
    <Card {...rest}>
      <CardHeader className="align-items-start pb-0">
        <div>
          <h2 className="fw-bolder">{stats}</h2>
          <CardText>{statTitle}</CardText>
        </div>
        <Avatar
          className="avatar-stats p-50 m-0"
          color={`light-${color}` as AvatarProps['color']}
          icon={icon}
        />
      </CardHeader>
      <Chart
        options={options}
        series={series}
        type={type}
        height={height ? height : 100}
      />
    </Card>
  );
};

export default StatsWithLineChart;
