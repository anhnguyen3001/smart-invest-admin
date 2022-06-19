import { yupResolver } from '@hookform/resolvers/yup';
import UILoader from '@core/components/ui-loader';
import { ImageUpload } from 'modules/core/components';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Vui lòng nhập tên trang')
    .max(255, 'Tên trang không được vượt quá 255 ký tự'),
});

export const SEOSettingModal = ({
  loading,
  page,
  onSubmitForm,
  visible = true,
  onClose,
}) => {
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      metaImage: '',
      faviconUrl: '',
      metaTitle: '',
      metaDescription: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (visible && page) {
      const { name, metaTitle, metaDescription, metaImage, faviconUrl } = page;

      setValue('name', name);
      setValue('metaTitle', metaTitle);
      setValue('metaImage', metaImage);
      setValue('metaDescription', metaDescription);
      setValue('faviconUrl', faviconUrl);
    }

    // eslint-disable-next-line
  }, [page?.id, visible]);

  useEffect(() => {
    if (visible) {
      const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSubmit(onSubmitForm)();
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
      size="lg"
      centered
      isOpen={visible}
      toggle={onClose}
    >
      <UILoader blocking={loading}>
        <ModalHeader className="bg-transparent" toggle={onClose} />
        <ModalBody className="px-3 pb-5">
          <h3 className="fw-bold text-center mb-1">Cài đặt SEO</h3>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="mb-1">
              <Label className="form-label" for="name">
                Tên trang
              </Label>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    required
                    placeholder="Nhập tên trang"
                    invalid={!!errors.name}
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <FormFeedback>{errors.name.message}</FormFeedback>
              )}
            </div>
            <div className="mb-1">
              <Label className="form-label" for="metaImage">
                Ảnh đại diện
              </Label>
              <Controller
                name="metaImage"
                control={control}
                render={({ field: { value, onChange: onFinishChange } }) => (
                  <ImageUpload value={value} onFinishChange={onFinishChange} />
                )}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="faviconUrl">
                Ảnh favicon
              </Label>
              <Controller
                name="faviconUrl"
                control={control}
                render={({ field: { value, onChange: onFinishChange } }) => (
                  <ImageUpload
                    value={value}
                    onFinishChange={onFinishChange}
                    maxSize={1}
                    allows={['ICO', 'JPG', 'PNG', 'GIF']}
                  />
                )}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="metaTitle">
                Thẻ tiêu đề
              </Label>
              <Controller
                control={control}
                name="metaTitle"
                render={({ field: { value, ...rest } }) => (
                  <>
                    <Input
                      placeholder="Nhập thẻ tiêu đề"
                      {...{ value, ...rest }}
                    />
                    <div
                      className="text-muted"
                      style={{ textAlign: 'right', fontSize: '0.9em' }}
                    >
                      Số ký tự: {value?.length || 0}
                    </div>
                  </>
                )}
              />
            </div>
            <div className="mb-1">
              <Label className="form-label" for="metaDescription">
                Mô tả thẻ tiêu đề
              </Label>
              <Controller
                control={control}
                name="metaDescription"
                render={({ field: { value, ...rest } }) => (
                  <>
                    <Input
                      type="textarea"
                      placeholder="Nhập mô tả thẻ tiêu đề"
                      {...{ value, ...rest }}
                    />
                    <div
                      className="text-muted"
                      style={{ textAlign: 'right', fontSize: '0.9em' }}
                    >
                      Số ký tự: {value?.length || 0}
                    </div>
                  </>
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
      </UILoader>
    </Modal>
  );
};
