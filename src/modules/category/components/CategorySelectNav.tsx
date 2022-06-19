import { objectToQueryString, queryStringToObject } from 'utility/Utils';
import { useHistory, useLocation } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { useAllCategories } from '../hooks';
import { useTracking } from 'utility/hooks/useTracking';
export const CategorySelectNav = () => {
  const history = useHistory();
  const { trackingScreenName, getAttrTracking } = useTracking();

  const { pathname, search } = useLocation();
  const { categoryId } = queryStringToObject(search);
  const activeId = parseInt(categoryId || '0');

  const { loading, categories } = useAllCategories();
  const renderedCategories = [
    {
      id: 0,
      name: 'Tất cả',
    },
    ...categories,
  ];

  const onChangeCategory = (id) => {
    history.push({
      pathname,
      search: objectToQueryString({ categoryId: id }),
    });
  };
  if (loading) return null;
  return (
    <Nav
      pills
      className="align-items-center justify-content-center"
      style={{ marginBottom: 12 }}
    >
      {renderedCategories?.map(({ id, name }) => (
        <NavItem
          {...getAttrTracking({
            regionName: 'categoryTab',
            contentName: name,
            target: trackingScreenName,
          })}
          key={id}
        >
          <NavLink
            active={id === activeId}
            onClick={() => onChangeCategory(id)}
          >
            {name}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};
