import { Button, Form, Input, Label, Modal, ModalBody } from 'reactstrap';
import themeConfig from 'configs/themeConfig';
import { ChevronRight } from 'react-feather';
import { useInitMerchant } from '../hooks/useInitMerchant';
import { setCurrentMerchant, logout } from 'utility/Utils';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import merchantApi from '../utils/api';
import UILoader from '@core/components/ui-loader';
// ** Custom Components
import Avatar from '@core/components/avatar';
import defaultImage from 'assets/images/default_image.jpg';
import SpinnerComponent from '@core/components/spinner/Fallback-spinner';
import { useAppSelector } from 'redux/store';

const MerchantPopup = () => {
  const [visible, setVisible] = useState(true);
  const [visibleCreateMerchant, setVisibleCreateMerchant] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<any>();
  const [loading, setLoading] = useState(false);
  const authStore = useAppSelector((state) => state.auth);
  const currentUser = authStore?.user;
  const selectionMerchants = authStore?.selectionMerchants;
  const { currentMerchant } = useInitMerchant();
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateMerchant = async (params) => {
    try {
      setLoading(true);
      const res = await merchantApi.createMerchant(params);
      if (res?.data?.id) {
        setCurrentMerchant(res?.data?.id);
        window.location.reload();
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickMerchantItem = async (merchant) => {
    if (merchant.id) {
      if (currentMerchant?.id === merchant.id) return;
      setCurrentMerchant(merchant.id);
      window.location.reload();
      return;
    }
    if (!!merchant.label) {
      await handleCreateMerchant({
        name: merchant.label,
        marketMerchantId: merchant.marketMerchantId,
      });
      return;
    }
    setVisibleCreateMerchant(true);
    setVisible(false);
    setSelectedMerchant(merchant);
  };

  const onSubmit = (data) => {
    if (Object.values(data).every((field: any) => field.length > 0)) {
      handleCreateMerchant({
        ...data,
        marketMerchantId: selectedMerchant?.marketMerchantId,
      });
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual',
          });
        }
      }
    }
  };

  const handleBack = () => {
    reset({
      name: '',
    });

    setVisibleCreateMerchant(false);
    setVisible(true);
    setSelectedMerchant(undefined);
  };

  const needInitMerchant =
    selectionMerchants?.length === 1 && selectionMerchants?.[0]?.id === 0;

  useEffect(() => {
    if (needInitMerchant) {
      const merchant = selectionMerchants[0];
      handleCreateMerchant({
        name: merchant.label,
        marketMerchantId: merchant.marketMerchantId,
      });
    }
    // eslint-disable-next-line
  }, [needInitMerchant]);

  if (needInitMerchant) return <SpinnerComponent />;

  return (
    <>
      <Modal isOpen={visible}>
        <ModalBody>
          <div className="d-flex flex-column justify-content-center">
            <img
              alt="logo"
              src={themeConfig?.app?.appLogoImage}
              width={80}
              style={{ margin: 'auto' }}
            />
            <div className="d-flex flex-column justify-content-center mt-1">
              <h4 className="text-center" style={{ fontWeight: 700 }}>
                Chọn tài khoản
              </h4>
              <span className="text-center">
                Để tiếp tục đến Landing Builder
              </span>
            </div>
            <hr />
            <div className="d-flex flex-column justify-content-center">
              <span className="text-center">
                Truy cập Landing Builder bằng số điện thoại{' '}
                <a href={`tel:${currentUser.phone_number}`}>
                  {currentUser.phone_number}
                </a>
              </span>
              {/* eslint-disable-next-line */}
              <a className="text-center mt-50" href="#" onClick={logout}>
                Đăng nhập bằng tài khoản khác
              </a>
            </div>
            <div className="d-flex flex-column justify-content-center mt-1">
              <strong className="text-center">
                Danh sách cửa hàng của bạn
              </strong>
            </div>
            <div
              className="mt-1 ps-50 pe-50"
              style={{ maxHeight: 400, overflowY: 'auto' }}
            >
              {!!selectionMerchants.length ? (
                <>
                  {selectionMerchants.map((el, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center mb-1 bg-light"
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        borderRadius: 4,
                      }}
                      onClick={() => handleClickMerchantItem(el)}
                    >
                      <div className="d-flex flex-column">
                        <Avatar
                          img={el?.logo || defaultImage}
                          imgHeight="48"
                          imgWidth="48"
                          className="me-1"
                        />
                      </div>
                      <div className="d-flex flex-column" style={{ flex: 1 }}>
                        {!!el.label ? (
                          <>
                            <div style={{ fontSize: '1.2em', fontWeight: 700 }}>
                              {el.label}
                            </div>
                            {!!el.subLabel && (
                              <div style={{ fontSize: '0.9em' }}>
                                {el.subLabel}
                              </div>
                            )}
                          </>
                        ) : (
                          <div style={{ fontSize: '0.9em' }}>{el.subLabel}</div>
                        )}
                      </div>
                      <ChevronRight />
                    </div>
                  ))}
                </>
              ) : (
                <div />
              )}
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={visibleCreateMerchant}
        toggle={() => handleBack()}
        style={{ top: 80 }}
      >
        <UILoader blocking={loading}>
          <ModalBody>
            <div className="d-flex flex-column justify-content-center">
              <img
                alt="logo"
                src={themeConfig?.app?.appLogoImage}
                width={80}
                style={{ margin: 'auto' }}
              />
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <Label className="form-label" for="name">
                  Tên cửa hàng
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <Input
                      placeholder="Tên cửa hàng"
                      invalid={errors.name && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div
                className="d-flex justify-content-center"
                style={{ gap: 24 }}
              >
                <Button
                  outline
                  color="secondary"
                  type="reset"
                  onClick={() => handleBack()}
                >
                  Quay lại
                </Button>
                <Button className="me-1" color="primary" type="submit">
                  Tiếp tục
                </Button>
              </div>
            </Form>
          </ModalBody>
        </UILoader>
      </Modal>
    </>
  );
};

export default MerchantPopup;
