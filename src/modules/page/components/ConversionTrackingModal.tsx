import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';

export const ConversionTrackingModal = ({
  defaultBody,
  onSubmitForm,
  visible = false,
  onClose,
}) => {
  const { reset, control, setValue, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const root = defaultBody?.pbConfig?.ROOT?.customAttributes?.root;

  const onSubmit = (values) => {
    const body = { ...defaultBody };
    if (body?.pbConfig?.ROOT?.customAttributes?.root)
      body.pbConfig.ROOT.customAttributes.root = {
        ...root,
        conversionTracking: {
          ...values,
        },
      };
    onSubmitForm(body);
  };

  useEffect(() => {
    if (visible && root?.conversionTracking) {
      const { facebookPixelId, googleAnalyticsId, googleTagManagerId } =
        root.conversionTracking;
      setValue('facebookPixelId', facebookPixelId);
      setValue('googleAnalyticsId', googleAnalyticsId);
      setValue('googleTagManagerId', googleTagManagerId);
    }

    // eslint-disable-next-line
  }, [JSON.stringify(defaultBody), visible]);

  useEffect(() => {
    if (visible) {
      const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSubmit(onSubmit);
        }
      };
      window.addEventListener('keydown', handlePressEnter);
      return () => {
        window.removeEventListener('keydown', handlePressEnter);
      };
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Modal
      zIndex={2000}
      unmountOnClose
      size="md"
      centered
      isOpen={visible}
      toggle={onClose}
    >
      <ModalHeader className="bg-transparent" toggle={onClose} />
      <ModalBody className="px-3 pb-5">
        <h3 className="fw-bold text-center mb-1">Cài đặt mã chuyển đổi</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1">
            <Label className="form-label">Facebook Pixel ID</Label>
            <Controller
              control={control}
              name="facebookPixelId"
              render={({ field }) => (
                <Input placeholder="Ví dụ 7124587214XXXXX" {...field} />
              )}
            />
          </div>
          <div className="mb-1">
            <Label className="form-label">Google Analytics ID</Label>
            <Controller
              control={control}
              name="googleAnalyticsId"
              render={({ field }) => (
                <Input
                  placeholder="Ví dụ UA-81234XXX-1, G-XXXXXXX"
                  {...field}
                />
              )}
            />
          </div>
          <div className="mb-1">
            <Label className="form-label">Google Tag Manager ID</Label>
            <Controller
              control={control}
              name="googleTagManagerId"
              render={({ field }) => (
                <Input placeholder="Ví dụ GTM-KHMNXXX" {...field} />
              )}
            />
          </div>
          <div className="text-center mt-2">
            <Button className="me-1" outline type="reset" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" color="primary">
              Lưu
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};
