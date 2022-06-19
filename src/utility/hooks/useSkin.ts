// ** React Imports
import { useEffect } from 'react';

// ** Store Imports
import { handleSkin } from 'redux/layout';
import { useAppDispatch, useAppSelector } from 'redux/store';

export const useSkin = () => {
  // ** Hooks
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.layout);

  const setSkin = (type) => {
    dispatch(handleSkin(type));
  };

  useEffect(() => {
    // ** Get Body Tag
    const element = window.document.body;

    // ** Define classnames for skins
    const classNames = {
      dark: 'dark-layout',
      bordered: 'bordered-layout',
      'semi-dark': 'semi-dark-layout',
    };

    // ** Remove all classes from Body on mount
    element.classList.remove(...element.classList);

    // ** If skin is not light add skin class
    if (store.skin !== 'light') {
      element.classList.add(classNames[store.skin]);
    }
  }, [store.skin]);

  return { skin: store.skin, setSkin };
};