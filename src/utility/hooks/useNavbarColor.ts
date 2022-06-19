// ** Store Imports
import { useAppDispatch, useAppSelector } from 'redux/store';
import { handleNavbarColor } from 'redux/layout';

export const useNavbarColor = () => {
  // ** Hooks
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.layout);

  // ** Return a wrapped version of useState's setter function
  const setNavbarColor = (value) => {
    dispatch(handleNavbarColor(value));
  };

  return { navbarColor: store.navbarColor, setNavbarColor };
};
