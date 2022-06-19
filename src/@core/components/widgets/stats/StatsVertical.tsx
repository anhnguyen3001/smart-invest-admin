// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';

interface StatsVerticalProps {
  className?: string;
  icon: React.ReactNode;
  color: string;
  stats: string;
  statTitle: string;
}

const StatsVertical: React.FC<StatsVerticalProps> = ({
  icon,
  color,
  stats,
  statTitle,
  className,
}) => {
  return (
    <Card className="text-center">
      <CardBody className={className}>
        <div
          className={`avatar p-50 m-0 mb-1 ${
            color ? `bg-light-${color}` : 'bg-light-primary'
          }`}
        >
          <div className="avatar-content">{icon}</div>
        </div>
        <h2 className="fw-bolder">{stats}</h2>
        <p className="card-text line-ellipsis">{statTitle}</p>
      </CardBody>
    </Card>
  );
};

export default StatsVertical;
