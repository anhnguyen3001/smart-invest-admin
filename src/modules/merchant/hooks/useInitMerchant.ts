import {
  handleUpdateStatusInitOwnerMerchants,
  handleUpdateSelectionMerchants,
} from 'redux/authentication';
import merchantApi from 'modules/merchant/utils/api';
import { useMemo } from 'react';
import { useUserInfo } from 'utility/hooks';
import { useAppDispatch, useAppSelector } from 'redux/store';

export const useInitMerchant = () => {
  const dispatch = useAppDispatch();
  const authStore = useAppSelector((state) => state.auth);
  const currentUser = authStore?.user;
  const currentMerchantId = authStore?.currentMerchantId;
  const fetchedOwnerMerchants = authStore?.fetchedOwnerMerchants;
  const selectionMerchants = authStore?.selectionMerchants;

  const { canBeCallPrivateApi } = useUserInfo();

  const initOwnerMerchants = async (forceChange = false) => {
    if (
      (!currentUser || fetchedOwnerMerchants || !canBeCallPrivateApi) &&
      !forceChange
    )
      return;
    try {
      const _marketMerchants = await merchantApi.getOwnedMarketMerchant();
      const _marketMerchantIds = _marketMerchants.map((el) => el.merchantId);
      const _lbMerchants = await merchantApi.getOwnedLBMerchant();
      const createdMarketMerchantIds = _lbMerchants
        .filter((m) => !!m.marketMerchantId)
        .map((m) => m.marketMerchantId);
      const _selectionMerchants = [
        ..._lbMerchants
          .filter((el) => !!el.marketMerchantId)
          .map((el) => ({
            id: el.id,
            label: el.name,
            subLabel: currentUser?.phone_number,
            logo: el.logo,
            marketMerchantId: el.marketMerchantId,
            isOwned: el.marketMerchantId
              ? _marketMerchantIds.includes(el.marketMerchantId)
              : false,
          })),
        ..._marketMerchants
          .filter((el) => !createdMarketMerchantIds.includes(el.merchantId))
          .map((el) => ({
            id: 0,
            label: el.merchantName,
            subLabel: el.taxCode || el.phoneNumber,
            marketMerchantId: el.merchantId,
            isOwned: false,
          })),
      ];
      dispatch(handleUpdateSelectionMerchants(_selectionMerchants));
    } finally {
      dispatch(handleUpdateStatusInitOwnerMerchants(true));
    }
  };

  const currentMerchant = useMemo(() => {
    return selectionMerchants.find((el) => el.id === currentMerchantId);
  }, [currentMerchantId, selectionMerchants]);

  const activeMerchants = selectionMerchants.filter((el) => !!el.id);

  return {
    initOwnerMerchants,
    currentMerchant,
    activeMerchants,
  };
};
