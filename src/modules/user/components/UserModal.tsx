import InputPasswordToggle from '@core/components/input-password-toggle';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
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
import { UpdateUserRequest, User } from '../types';

const validationSchema = yup.object().shape({
  password: yup.string().trim().required('Vui lòng nhập mật khẩu'),
  isVerified: yup.bool().required('Vui lòng chọn xác thực tài khoản chưa'),
});

interface UserModalProps {
  visible?: boolean;
  setVisible?: (val: boolean) => void;
  title?: string;
  user?: User;
}

const UserModal: React.FC<UserModalProps> = ({
  visible,
  setVisible,
  title,
  user,
}) => {
  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: null,
      password: null,
      method: null,
      username: null,
      isVerified: null,
      roleId: null,
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);

  const onToggle = () => {
    setVisible(!visible);
  };

  const onUpdateUser = async (_: UpdateUserRequest) => {
    if (!loading) {
      try {
        setLoading(true);
      } catch (e) {
        console.error(e);
      } finally {
        setVisible(false);
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
        setValue('password', user.password);
        setValue('isVerified', user.isVerified);
        setValue('roleId', user.role.id);
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
    <Modal style={{ top: 200 }} isOpen={visible} toggle={onToggle}>
      <ModalHeader className="bg-transparent" toggle={onToggle} />
      <ModalBody className="px-5 pb-5">
        <div className="text-center">
          <h3 className="fw-bold">{title}</h3>
        </div>
        <Form>
          <div className="mb-1">
            <Label className="form-label" for="email">
              Email
            </Label>
            <Controller
              control={control}
              name="email"
              render={({ field }) => <Input readOnly {...field} />}
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="username">
              Tên người dùng
            </Label>
            <Controller
              control={control}
              name="username"
              render={({ field }) => <Input readOnly {...field} />}
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="password">
              Mật khẩu
            </Label>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <InputPasswordToggle
                  className="input-group-merge"
                  placeholder="Nhập mật khẩu"
                  invalid={!!errors.password}
                  {...field}
                />
              )}
            />
            {errors.password && (
              <FormFeedback>{errors.password.message}</FormFeedback>
            )}
          </div>
          <div className="text-center mt-2">
            <Button className="me-1" outline type="reset" onClick={onToggle}>
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
