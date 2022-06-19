import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import pageApi from '../utils/api';
import { useHistory } from 'react-router-dom';
import { PAGE_BUILDER } from 'router/path';
import PropTypes from 'prop-types';

const CreatePageSchema = yup.object().shape({
  name: yup.string().trim().required(),
});

interface PageModalProps {
  visible?: boolean;
  setVisible?: (val: boolean) => void;
  title?: string;
  hideChooseDesignMode?: boolean;
  pageName?: string;
  defaultBody?: any;
}

const PageModal: React.FC<PageModalProps> = ({
  hideChooseDesignMode,
  visible,
  setVisible,
  title,
  pageName,
  defaultBody,
}) => {
  const history = useHistory();
  const refSubmitButton = useRef<Button>();
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', designMode: 'responsive' },
    mode: 'onChange',
    resolver: yupResolver(CreatePageSchema),
  });
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const onCreatePage = async (data) => {
    if (!loading) {
      try {
        setLoading(true);
        const formData = {
          ...data,
          ...{
            device: data?.designMode === 'mobile-only' ? 'mobile' : 'desktop',
          },
        };

        const pageId = await pageApi
          .createPage({
            ...formData,
            ...defaultBody,
          })
          .then((res) => res.data.id);
        if (pageId) {
          history.push(PAGE_BUILDER.replace(':id', pageId));
        } else {
          setVisible(false);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!visible) {
      reset();
    }
    if (visible) {
      if (pageName) {
        setValue('name', pageName);
        setValue('designMode', defaultBody?.designMode || 'responsive');
      }

      const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          (refSubmitButton?.current as any)?.onClick();
        }
      };
      window.addEventListener('keydown', handlePressEnter);
      return () => {
        window.removeEventListener('keydown', handlePressEnter);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Modal style={{ top: 200 }} isOpen={visible} toggle={handleCancel}>
      <ModalHeader
        className="bg-transparent"
        toggle={() => setVisible(!visible)}
      ></ModalHeader>
      <ModalBody className="px-5 pb-5">
        <div className="text-center">
          <h3 className="fw-bold">{title}</h3>
        </div>
        <Form>
          <div className="mb-1">
            <Label className="form-label" for="name">
              Tên trang
            </Label>
            <Controller
              defaultValue=""
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  placeholder="Nhập tên trang"
                  invalid={!!errors.name}
                  {...field}
                />
              )}
            />
            {errors.name && (
              <FormFeedback>Vui lòng nhập tên trang</FormFeedback>
            )}
          </div>
          {!hideChooseDesignMode && (
            <div className="mb-1">
              <Label className="mb-50 form-label" for="designMode">
                Chọn kiểu thiết kế
              </Label>
              <Controller
                defaultValue=""
                control={control}
                name="designMode"
                render={({ field: { value, onChange } }) => (
                  <div className="d-flex flex-wrap justify-content-start align-items-center">
                    <div className="form-check me-1">
                      <Input
                        type="radio"
                        id="responsive"
                        name="designMode"
                        checked={value === 'responsive'}
                        onChange={() => onChange('responsive')}
                      />
                      <Label for="responsive">Responsive</Label>
                    </div>
                    <div className="form-check me-1">
                      <Input
                        type="radio"
                        name="designMode"
                        id="mobile-only"
                        checked={value === 'mobile-only'}
                        onChange={() => onChange('mobile-only')}
                      />
                      <Label for="mobile-only">Mobile only</Label>
                    </div>
                    <div className="form-check">
                      <Input
                        type="radio"
                        name="designMode"
                        id="adaptive"
                        checked={value === 'adaptive'}
                        onChange={() => onChange('adaptive')}
                      />
                      <Label for="adaptive">Adaptive</Label>
                    </div>
                  </div>
                )}
              />
            </div>
          )}
          <div className="text-center mt-2">
            <Button
              className="me-1"
              outline
              type="reset"
              onClick={handleCancel}
            >
              Hủy
            </Button>
            <Button
              ref={refSubmitButton}
              color="primary"
              onClick={handleSubmit(onCreatePage)}
            >
              Tạo trang
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

PageModal.propTypes = {
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  title: PropTypes.string,
  hideChooseDesignMode: PropTypes.bool,
  pageName: PropTypes.string,
  defaultBody: PropTypes.object,
};

export default PageModal;
