import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
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
  Spinner,
} from 'reactstrap';
import { useTracking } from 'utility/hooks/useTracking';
import * as yup from 'yup';
import { domainApi } from '../utils/api';
const customValidateDomain = function (inputDomain, message) {
  return this.test(inputDomain, message, function (value) {
    const { path, createError } = this;

    if (!value)
      return createError({
        path,
        message: message ?? 'Vui lòng nhập tên miền',
      });

    if (value.length > 255)
      return createError({
        path,
        message: message ?? 'Tên miền không được phép vượt quá 255 ký tự',
      });

    // if (!PATTERN_VALIDATION.domain.test(value)) {
    //   const splittedVal = value.split('.');
    //   if (splittedVal.length === 2 && splittedVal[0] !== 'www') {
    //     return createError({
    //       path,
    //       message: message ?? 'Bạn cần thêm www vào trước tên miền',
    //     });
    //   }

    //   return createError({
    //     path,
    //     message: message ?? 'Tên miền bao gồm chữ, số, "-" và "."',
    //   });
    // }

    return true;
  });
};

yup.addMethod(yup.mixed, 'customValidateDomain', customValidateDomain);

const CreateDomainSchema = yup.object().shape({
  domain: (yup.mixed() as any).customValidateDomain(),
});

interface DomainModalProps {
  visible?: boolean;
  setVisible?: (val: boolean) => void;
  title?: string;
  mutateDomains?: any;
  domainName?: string;
  defaultBody?: any;
  setDomain?: (val: string) => void;
  setShowQuickGuide?: (val: boolean) => void;
}

const DomainModal: React.FC<DomainModalProps> = ({
  visible,
  setVisible,
  title,
  mutateDomains,
  domainName,
  defaultBody,
  setDomain,
  setShowQuickGuide,
}) => {
  const { getAttrTracking } = useTracking();
  const refSubmitButton = useRef<Button>();
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { domain: '' },
    mode: 'onChange',
    resolver: yupResolver(CreateDomainSchema),
  });
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const onCreateDomain = async (data) => {
    if (!loading) {
      try {
        setLoading(true);
        await domainApi.createDomain({
          ...data,
          ...defaultBody,
        });
        setVisible(false);
        mutateDomains();
        setShowQuickGuide(true);
        setDomain(data.domain);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (visible) {
      if (domainName) {
        setValue('domain', domainName);
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
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <>
      <Modal style={{ top: 200 }} isOpen={visible} toggle={handleCancel}>
        <ModalHeader
          className="bg-transparent"
          toggle={() => setVisible(!visible)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5">
          <div className="text-center">
            <h3 className="fw-bold">{title}</h3>
          </div>
          <div className="fw-normal mb-1">
            Bạn có thể kết nối tên miền chính (www.example.com) hoặc tên miền
            phụ (docs.example.com)
          </div>
          <Form>
            <div className="mb-1">
              <Label className="form-label" for="domain">
                Tên miền
              </Label>
              <Controller
                control={control}
                name="domain"
                render={({ field }) => (
                  <Input
                    placeholder="Nhập tên miền"
                    invalid={!!errors.domain}
                    {...field}
                  />
                )}
              />
              {errors.domain && (
                <FormFeedback>{errors.domain.message}</FormFeedback>
              )}
            </div>
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
                onClick={handleSubmit(onCreateDomain)}
                {...getAttrTracking({
                  regionName: 'createDomainModal',
                  contentName: 'createDomainBtn',
                  target: 'domain',
                })}
              >
                {loading && <Spinner size="sm" style={{ marginRight: 5 }} />}
                Tạo tên miền
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DomainModal;
