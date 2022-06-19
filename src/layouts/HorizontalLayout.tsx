// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@core/layouts/HorizontalLayout';

import navigation from 'navigation/horizontal';

const HorizontalLayout = (props) => {
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  return <Layout menuData={navigation} {...props} />;
};

export default HorizontalLayout;
