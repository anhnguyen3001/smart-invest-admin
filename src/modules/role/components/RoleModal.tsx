import { yupResolver } from '@hookform/resolvers/yup';
import { SUCCESS_MSG } from 'constants/index';
import { Button } from 'components';
import { SelectValue } from 'types';
import { PermissionSelect } from 'modules/permission/components/PermissionSelect';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import * as yup from 'yup';
import { Role } from '../types';
import { roleApi } from '../utils/api';
import { useUser } from 'modules/user/hooks';

const validationSchema = yup.object().shape({
  name: yup.string().trim().required('Vui lòng nhập tên role'),
  code: yup.string().trim().required('Vui lòng nhập mã role'),
});

interface RoleForm {
  name: string;
  code: string;
  permissionIds: SelectValue<number>[] | null;
}

interface RoleModalProps {
  visible?: boolean;
  onClose: () => void;
  title?: string;
  role?: Role;
  onAfterClose?: () => void;
}

const RoleModal: React.FC<RoleModalProps> = ({
  visible,
  onClose,
  title,
  role,
  onAfterClose,
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
      code: '',
      permissionIds: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);

  const { fetchUser } = useUser();

  const onSubmit = async (data: RoleForm) => {
    const submitData = {
      ...data,
      permissionIds: data.permissionIds?.map(({ value }) => value),
    };

    if (!loading) {
      setLoading(true);

      try {
        if (role) {
          await roleApi.updateRole(role.id, submitData);
          toast.success(SUCCESS_MSG.UPDATE_ROLE, { position: 'top-right' });
          await fetchUser();
        } else {
          await roleApi.createRole(submitData);
          toast.success(SUCCESS_MSG.CREATE_ROLE, { position: 'top-right' });
        }
        onAfterClose?.();
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        onClose();
      }
    }
  };

  useEffect(() => {
    if (!visible) {
      reset();
    } else {
      if (role) {
        setValue('name', role.name);
        setValue('code', role.code);
        setValue(
          'permissionIds',
          role.permissions?.map(({ id, name }) => ({
            label: name,
            value: id,
          })) as any,
        );
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
            <Label for="name">Tên vai trò</Label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  invalid={!!errors.name}
                  placeholder="Nhập tên vai trò"
                  {...field}
                />
              )}
            />
            {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </div>

          <div className="mb-1">
            <Label for="code">Mã vai trò</Label>
            <Controller
              control={control}
              name="code"
              render={({ field }) => (
                <Input
                  invalid={!!errors.code}
                  {...field}
                  placeholder="Nhập mã vai trò"
                  readOnly={!!role}
                />
              )}
            />
            {errors.code && <FormFeedback>{errors.code.message}</FormFeedback>}
          </div>

          <div className="mb-1">
            <Label for="permissionIds">Quyền</Label>
            <Controller
              name="permissionIds"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <PermissionSelect
                  isMulti
                  isClearable
                  placeholder="Chọn quyền"
                  {...rest}
                />
              )}
            />
          </div>

          <div className="text-end mt-2">
            <Button className="me-1" outline type="reset" onClick={onClose}>
              Hủy
            </Button>
            <Button
              color="primary"
              onClick={handleSubmit(onSubmit)}
              loading={loading}
            >
              Lưu
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default RoleModal;
