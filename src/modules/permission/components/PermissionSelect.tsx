import Select from 'react-select';
import { useAllPermissions } from '../hooks';

export const PermissionSelect = (props) => {
  const { permisisons } = useAllPermissions();

  return (
    <Select
      isSearchable
      options={permisisons.map((c) => ({ value: c.id, label: c.name }))}
      components={{ IndicatorSeparator: () => null }}
      classNamePrefix="react-select"
      {...props}
    />
  );
};
