// ** Store Imports
import { useAppDispatch, useAppSelector } from 'redux/store';
import { handleFooterType } from 'redux/layout';

export const useFooterType = () => {
  // ** Hooks
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.layout);

  const setFooterType = (type) => {
    dispatch(handleFooterType(type));
  };

  return { setFooterType, footerType: store.footerType };
};
