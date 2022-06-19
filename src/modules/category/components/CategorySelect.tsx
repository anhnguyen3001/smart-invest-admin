import Select, { Props } from 'react-select';
import { useAllCategories } from '../hooks';

export const CategorySelect: React.FC<Props> = (props) => {
  const { categories } = useAllCategories();

  return (
    <Select
      isSearchable
      options={categories.map((c) => ({ value: c.id, label: c.name }))}
      components={{ IndicatorSeparator: () => null }}
      {...props}
    />
  );
};
