import classnames from 'classnames';
import Chart, { Props } from 'react-apexcharts';

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';

interface StatisticsCardsProps {
  type?: Props['type'];
  series?: any[];
  height?: string;
  iconBg?: string;
  options?: object;
  hideChart?: boolean;
  iconRight?: boolean;
  className?: string;
  icon: React.ReactNode;
  stat: string;
  statTitle: string;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = (props) => {
  // ** Props
  const {
    className,
    hideChart,
    iconRight,
    iconBg,
    icon,
    stat,
    statTitle,
    options,
    series,
    type,
    height,
  } = props;

  return (
    <Card>
      <CardBody
        className={classnames('stats-card-body d-flex pt-2', {
          [className]: className,
          'flex-column align-items-start': !iconRight && !hideChart,
          'justify-content-between flex-row-reverse align-items-center':
            iconRight,
          'justify-content-center flex-column text-center':
            hideChart && !iconRight,
          'pb-0': !hideChart,
          'pb-2': hideChart,
        })}
      >
        <div className="icon-section">
          <div
            className={`avatar avatar-stats p-50 m-0 ${
              iconBg ? `bg-light-${iconBg}` : 'bg-light-primary'
            }`}
          >
            <div className="avatar-content">{icon}</div>
          </div>
        </div>
        <div className="title-section">
          <h2 className="fw-bold mt-1 mb-25">{stat}</h2>
          <p className="mb-0">{statTitle}</p>
        </div>
      </CardBody>
      {!hideChart && (
        <Chart
          options={options}
          series={series}
          type={type}
          height={height ? height : 100}
        />
      )}
    </Card>
  );
};
export default StatisticsCards;
