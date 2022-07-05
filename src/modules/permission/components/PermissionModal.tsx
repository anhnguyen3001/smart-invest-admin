import { yupResolver } from '@hookform/resolvers/yup';
import { SUCCESS_MSG } from 'modules/core';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
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
import { Permission } from '../types';
import { permissionApi } from '../utils/api';

const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Vui lòng nhập tên quyền'),
  code: yup.string().trim().required('Vui lòng nhập mã quyền'),
});

interface PermissionForm {
  name: string;
  code: string;
}

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
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PermissionForm>({
    defaultValues: {
      name: '',
      code: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (inputValue: PermissionForm) => {
    if (!loading) {
      try {
        setLoading(true);

        if (permission) {
          await permissionApi.updatePermission(permission.id, inputValue);
          toast.success(SUCCESS_MSG.UPDATE_PERMISSION, {
            position: 'top-right',
          });
        } else {
          await permissionApi.createPermission(inputValue);
          toast.success(SUCCESS_MSG.CREATE_PERMISSION, {
            position: 'top-right',
          });
        }
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
            <Label for="name">Tên quyền</Label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input {...field} invalid={!!errors.name} />
              )}
            />
            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </div>

          <div className="mb-1">
            <Label for="code">Mã quyền</Label>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <Input
                  {...field}
                  readOnly={!!permission}
                  invalid={!!errors.code}
                />
              )}
            />
            {errors.code && <FormFeedback>{errors.code.message}</FormFeedback>}
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
