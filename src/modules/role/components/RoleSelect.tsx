import Select from 'react-select';
import { useAllRoles } from '../hooks';

export const RolenSelect = (props) => {
  const { roles } = useAllRoles();

  return (
    <Select
      isSearchable
      options={roles.map((c) => ({ value: c.id, label: c.name }))}
      components={{ IndicatorSeparator: () => null }}
      classNamePrefix="react-select"
      {...props}
    />
  );
};
