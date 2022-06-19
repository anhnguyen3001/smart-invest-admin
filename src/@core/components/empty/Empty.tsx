import defaultEmpty from 'assets/images/pages/default_empty.svg';

interface EmptyProps {
  description?: string;
  image?: string;
}

export const Empty: React.FC<EmptyProps> = (props) => {
  const { image = defaultEmpty, description = 'Không có dữ liệu' } = props;

  return (
    <div className="text-center mt-5">
      <img src={image} className="m-auto" alt="empty" />
      <div className="mt-1">{description}</div>
    </div>
  );
};
