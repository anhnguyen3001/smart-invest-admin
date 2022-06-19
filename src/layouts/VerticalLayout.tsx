// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@core/layouts/VerticalLayout';

// ** Menu Items Array
import navigation from 'navigation/vertical';
import { useFilterNavigation } from 'utility/hooks';
import Navbar from './components/navbar/Navbar';

const VerticalLayout = (props) => {
  const { filterNavigations } = useFilterNavigation(navigation);

  return <Layout menuData={filterNavigations} navbar={Navbar} {...props} />;
};

export default VerticalLayout;
