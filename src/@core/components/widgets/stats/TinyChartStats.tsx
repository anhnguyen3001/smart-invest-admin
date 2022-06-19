import Chart, { Props } from 'react-apexcharts';

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';

interface TinyChartStatsProps {
  type: Props['type'];
  title: string;
  stats: string;
  series: any[];
  options: object;
  height?: string | number;
}

const TinyChartStats: React.FC<TinyChartStatsProps> = (props) => {
  // ** Props
  const { title, stats, options, series, type, height = 100 } = props;

  return (
    <Card className="card-tiny-line-stats">
      <CardBody className="pb-50">
        <h6>{title}</h6>
        <h2 className="fw-bolder mb-1">{stats}</h2>
        <Chart options={options} series={series} type={type} height={height} />
      </CardBody>
    </Card>
  );
};

export default TinyChartStats;
