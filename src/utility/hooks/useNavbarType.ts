// ** Store Imports
import { useAppDispatch, useAppSelector } from 'redux/store';
import { handleNavbarType } from 'redux/layout';

export const useNavbarType = () => {
  // ** Hooks
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.layout);

  const setNavbarType = (type) => {
    dispatch(handleNavbarType(type));
  };

  return { navbarType: store.navbarType, setNavbarType };
};
