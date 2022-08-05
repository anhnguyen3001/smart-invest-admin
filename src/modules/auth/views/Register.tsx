import InputPasswordToggle from '@core/components/input-password-toggle';
import '@core/scss/react/pages/page-authentication.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import logo from 'assets/images/logo/logo.png';
import { PATTERN_VALIDATION } from 'constants/index';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormFeedback,
  Input,
  Label,
  Spinner,
} from 'reactstrap';
import { HOME, LOGIN } from 'router/path';
import * as yup from 'yup';
import { ErrorMessage } from '../components/ErrorMessage';
import { useRegister } from '../hooks';
import '../styles/common.scss';
import { RegisterRequest } from '../types';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Vui lòng nhập email')
    .matches(PATTERN_VALIDATION.email, 'Email không đúng'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu không hợp lệ, phải có ít nhất 6 ký tự'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  username: yup.string().trim().required('Vui lòng nhập tên người dùng'),
});

const Register = () => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegisterRequest>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const { loading, errMsg, onRegister } = useRegister();

  return (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            <Link className="brand-logo" to={HOME}>
              <img alt="" style={{ maxWidth: 96, height: 'auto' }} src={logo} />
            </Link>
            <CardTitle tag="h2" className="mb-1 auth-title text-center">
              Tạo tài khoản mới
            </CardTitle>

            <ErrorMessage message={errMsg} />

            <Form
              className="auth-register-form mt-2"
              onSubmit={handleSubmit(onRegister)}
            >
              <div className="mb-1">
                <Label for="username">Số điện thoại</Label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      autoFocus
                      placeholder="Nhập email"
                      invalid={!!errors.email}
                      autoComplete="new-password"
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                )}
              </div>
              <div className="mb-1">
                <Label for="password">Mật khẩu</Label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, ...rest } }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      placeholder="Nhập mật khẩu"
                      invalid={!!errors.password}
                      autoComplete="new-password"
                      {...rest}
                      onChange={(e) => {
                        onChange(e);
                        if (errors.confirmPassword) {
                          trigger('confirmPassword');
                        }
                      }}
                    />
                  )}
                />
                {errors.password && (
                  <FormFeedback>{errors.password.message}</FormFeedback>
                )}
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="mt-1 input-group-merge"
                      placeholder="Nhập lại mật khẩu"
                      invalid={!!errors.confirmPassword}
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <FormFeedback>{errors.confirmPassword.message}</FormFeedback>
                )}
              </div>
              <div className="mb-2">
                <Label for="username">Tên người dùng</Label>
                <Controller
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <Input
                      placeholder="Nhập tên người dùng"
                      invalid={!!errors.username}
                      {...field}
                    />
                  )}
                />
                {errors.username && (
                  <FormFeedback>{errors.username.message}</FormFeedback>
                )}
              </div>
              <Button disabled={loading} color="primary" type="submit" block>
                {loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    className="me-50"
                  />
                )}
                Đăng ký
              </Button>
            </Form>

            <p className="text-center mt-2">
              <span className="me-25">Bạn đã có tài khoản?</span>
              <Link to={LOGIN}>
                <span>Đăng nhập</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Register;
