import InputPasswordToggle from '@core/components/input-password-toggle';
import '@core/scss/react/pages/page-authentication.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import logo from 'assets/images/logo/logo.png';
import { PATTERN_VALIDATION } from 'modules/core';
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
import { REGISTER } from 'router/path';
import * as yup from 'yup';
import { ErrorMessage } from '../components/ErrorMessage';
import { useLogin } from '../hooks';
import '../styles/common.scss';
import { LoginRequest } from '../types';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Vui lòng nhập email')
    .matches(PATTERN_VALIDATION.email, 'Email không đúng'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

const Login = () => {
  const { errMsg, loading, onLogin } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            <div className="text-center mb-1">
              <img
                alt="brand logo"
                style={{ maxWidth: 96, height: 'auto' }}
                src={logo}
              />
            </div>
            <CardTitle tag="h2" className="mb-1 auth-title text-center">
              Đăng nhập
            </CardTitle>
            <ErrorMessage message={errMsg} />
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onLogin)}
            >
              <div className="mb-1">
                <Label for="username">Email</Label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <Input
                      autoFocus
                      placeholder="Nhập email"
                      invalid={!!errors.email}
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                )}
              </div>
              <div className="mb-2">
                <Label for="password">Mật khẩu</Label>
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
              <Button disabled={loading} color="primary" type="submit" block>
                {loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    className="me-50"
                  />
                )}
                Đăng nhập
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">Bạn chưa có tài khoản?</span>
              <Link to={REGISTER}>
                <span>Đăng ký</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;
