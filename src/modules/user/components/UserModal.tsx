import { yupResolver } from '@hookform/resolvers/yup';
import { SelectValue } from 'modules/core/types';
import { Button } from 'modules/core/components';
import { RolenSelect } from 'modules/role/components/RoleSelect';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Form, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import * as yup from 'yup';
import { User } from '../types';
import { userApi } from '../utils/api';

const validationSchema = yup.object().shape({});

interface UserForm {
  email: string;
  name: string;
  status: boolean;
  roleId: SelectValue<number> | null;
}

interface UserModalProps {
  visible?: boolean;
  onClose: () => void;
  title?: string;
  user?: User;
  onAfterClose?: () => void;
}

const UserModal: React.FC<UserModalProps> = ({
  visible,
  onClose,
  title,
  user,
  onAfterClose,
}) => {
  const { reset, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      email: '',
      method: '',
      username: '',
      isVerified: true,
      roleId: null,
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);

  const onUpdateUser = async (inputValue: UserForm) => {
    const submitData = {
      roleId: inputValue.roleId.value,
    };

    if (!loading) {
      try {
        setLoading(true);

        await userApi.updateUser(user.id, submitData);
        toast.success('Cập nhật thông tin thành công', {
          position: 'top-right',
        });
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
      if (user) {
        setValue('email', user.email);
        setValue('username', user.username);
        setValue('method', user.method);
        setValue('isVerified', user.isVerified);
        setValue('roleId', { label: user.role?.name, value: user.role?.id });
      }

      const handlePressEnter = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSubmit(onUpdateUser);
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
        <Form onSubmit={handleSubmit(onUpdateUser)}>
          <div className="mb-1">
            <Label for="email">Email</Label>
            <Controller
              control={control}
              name="email"
              render={({ field }) => <Input readOnly {...field} />}
            />
          </div>

          <div className="mb-1">
            <Label for="username">Tên người dùng</Label>
            <Controller
              control={control}
              name="username"
              render={({ field }) => <Input readOnly {...field} />}
            />
          </div>

          <div className="mb-1 ">
            <Label for="isVerified">Trạng thái</Label>
            <div className="form-switch">
              <Controller
                control={control}
                name="isVerified"
                render={({ field: { value, ...rest } }) => (
                  <Input type="switch" {...rest} checked={value} />
                )}
              />
            </div>
          </div>

          <div className="mb-1">
            <Label for="roleId">Role</Label>
            <Controller
              name="roleId"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <RolenSelect isClearable placeholder="Chọn role" {...rest} />
              )}
            />
          </div>

          <div className="text-end mt-2">
            <Button className="me-1" outline type="reset" onClick={onClose}>
              Hủy
            </Button>
            <Button color="primary" type="submit" loading={loading}>
              Cập nhật
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default UserModal;
