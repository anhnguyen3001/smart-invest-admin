import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
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
import * as yup from 'yup';
import {
  CreatePermissionRequest,
  Permission,
  UpdatePermissionRequest,
} from '../types';

const validationSchema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên quyền'),
  code: yup.string().required('Vui lòng nhập mã quyền'),
});

interface PermissionModalProps {
  visible?: boolean;
  onClose: () => void;
  title?: string;
  permission?: Permission;
}

const PermissionModal: React.FC<PermissionModalProps> = ({
  visible,
  onClose,
  title,
  permission,
}) => {
  const { reset, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: null,
      code: null,
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (
    _: UpdatePermissionRequest | CreatePermissionRequest,
  ) => {
    if (!loading) {
      try {
        setLoading(true);
      } catch (e) {
        console.error(e);
      } finally {
        onClose();
      }
    }
  };

  useEffect(() => {
    if (!visible) {
      reset();
    } else {
      if (permission) {
        setValue('name', permission.name);
        setValue('code', permission.code);
      }

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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Modal centered isOpen={visible} toggle={onClose}>
      <ModalHeader className="bg-transparent" toggle={onClose}>
        {title}
      </ModalHeader>
      <ModalBody>
        <Form>
          <div className="mb-1">
            <Label className="form-label" for="email">
              Tên quyền
            </Label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => <Input {...field} />}
            />
          </div>

          <div className="mb-1">
            <Label className="form-label" for="username">
              Mã quyền
            </Label>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <Input {...field} readOnly={!!permission} />
              )}
            />
          </div>

          <div className="text-end mt-2">
            <Button className="me-1" outline type="reset" onClick={onClose}>
              Hủy
            </Button>
            <Button color="primary" onClick={handleSubmit(onSubmit)}>
              Lưu
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default PermissionModal;
