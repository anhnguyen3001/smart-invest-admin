// ** Custom Components
import Avatar, { AvatarProps } from '@core/components/avatar';

import classnames from 'classnames';
import Chart, { Props } from 'react-apexcharts';

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';

// ** Default Options
import { areaChartOptions } from './ChartOptions';

interface StatsWithAreaChartProps {
  type?: Props['type'];
  height?: string;
  options?: object;
  className?: string;
  icon: React.ReactNode;
  color: string;
  stats: string;
  series: any[];
  statTitle: string;
}

const StatsWithAreaChart: React.FC<StatsWithAreaChartProps> = (props) => {
  // ** Props
  const {
    icon,
    color = 'primary',
    stats,
    statTitle,
    series,
    options = areaChartOptions,
    type,
    height,
    className,
    ...rest
  } = props;
  return (
    <Card {...rest}>
      <CardBody
        className={classnames('pb-0', {
          [className]: className,
        })}
      >
        <Avatar
          className="avatar-stats p-50 m-0"
          color={`light-${color}` as AvatarProps['color']}
          icon={icon}
        />
        <h2 className="fw-bolder mt-1">{stats}</h2>
        <p className="card-text">{statTitle}</p>
      </CardBody>
      <Chart
        options={options}
        series={series}
        type={type}
        height={height ? height : 100}
      />
    </Card>
  );
};

export default StatsWithAreaChart;
