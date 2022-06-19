// ** Store Imports
import { useAppDispatch, useAppSelector } from 'redux/store';
import { handleRouterTransition } from 'redux/layout';

export const useRouterTransition = () => {
  // ** Hooks
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.layout);

  const setTransition = (type) => {
    dispatch(handleRouterTransition(type));
  };

  return { transition: store.routerTransition, setTransition };
};
