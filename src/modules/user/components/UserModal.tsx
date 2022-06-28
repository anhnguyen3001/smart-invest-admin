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
import { UpdateUserRequest, User } from '../types';

const validationSchema = yup.object().shape({});

interface UserModalProps {
  visible?: boolean;
  onClose: () => void;
  title?: string;
  user?: User;
}

const UserModal: React.FC<UserModalProps> = ({
  visible,
  onClose,
  title,
  user,
}) => {
  const { reset, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      email: '',
      password: '',
      method: '',
      username: '',
      isVerified: true,
      roleId: null,
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);

  const onUpdateUser = async (_: UpdateUserRequest) => {
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
      if (user) {
        setValue('email', user.email);
        setValue('username', user.username);
        setValue('method', user.method);
        setValue('isVerified', user.isVerified);
        setValue('roleId', user.role?.id);
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
        <Form>
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

          <div className="text-end mt-2">
            <Button className="me-1" outline type="reset" onClick={onClose}>
              Hủy
            </Button>
            <Button color="primary" onClick={handleSubmit(onUpdateUser)}>
              Cập nhật
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default UserModal;
