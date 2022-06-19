import InputPasswordToggle from '@core/components/input-password-toggle';
import { yupResolver } from '@hookform/resolvers/yup';
import logo from 'assets/images/logo/logo.png';
import { HOME, REGISTER } from 'router/path';
import '@core/scss/react/pages/page-authentication.scss';
import { queryStringToObject } from 'utility/Utils';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
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
import * as yup from 'yup';
import { ErrorMessage } from '../components/ErrorMessage';
import { IAM_AUTH_ERROR_CODE } from '../constants/code';
import '../styles/common.scss';
import { authApi } from '../utils/api';
import SpinnerComponent from '@core/components/spinner/Fallback-spinner';

const validationSchema = yup.object().shape({
  username: yup.string().trim().required('Vui lòng nhập số điện thoại'),
  // .matches(PATTERN_VALIDATION.phone, 'Số điện thoại không đúng')
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

const Login = () => {
  const { search } = useLocation();
  const { challenge } = queryStringToObject(search);

  const [loading, setLoading] = useState(false);

  const [loadingRequestLogin, setLoadingRequestLogin] = useState(true);

  const [errorMessage, setErrorMessage] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { username: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onLogin = async (data) => {
    try {
      setLoading(true);
      const res = await authApi.login({ ...data, challenge });
      window?.dataLayer?.push?.({
        event: 'login_success',
        phone_number: data.username,
      });
      window.location.assign(res.redirect_to);
    } catch (error) {
      setLoading(false);

      const code = error?.response?.data?.error?.code;
      let errMsg;

      switch (code) {
        case IAM_AUTH_ERROR_CODE.TOO_MANY_REQUEST:
          errMsg = 'Bạn đã đăng nhập sai quá số lần cho phép trong ngày!';
          break;
        case IAM_AUTH_ERROR_CODE.USERNAME_PASSWORD_NOT_CORRECT:
          errMsg = 'Số điện thoai hoặc mật khẩu không đúng!';
          break;
        case IAM_AUTH_ERROR_CODE.ACCOUNT_NOT_ACTIVATE:
          errMsg = 'Tài khoản không hợp lệ!';
          break;
        default:
          errMsg = 'Hệ thống đang có lỗi, vui lòng thử lại sau!';
      }

      setErrorMessage(errMsg);
    }
  };

  useEffect(() => {
    const requestLogin = async () => {
      try {
        const res = await authApi.requestLogin(challenge);
        if (res.skip) {
          window.location.assign(res.redirect_to);
          return;
        }
      } finally {
        setLoadingRequestLogin(false);
      }
    };

    requestLogin();
  }, [challenge]);

  return loadingRequestLogin ? (
    <SpinnerComponent />
  ) : (
    <div className="auth-wrapper auth-basic px-2">
      <div className="auth-inner my-2">
        <Card className="mb-0">
          <CardBody>
            <Link className="brand-logo" to={HOME}>
              <img alt="" style={{ maxWidth: 96, height: 'auto' }} src={logo} />
            </Link>
            <CardTitle tag="h2" className="mb-1 auth-title text-center">
              Đăng nhập
            </CardTitle>
            <ErrorMessage message={errorMessage} />
            <Form
              className="auth-login-form mt-2"
              onSubmit={handleSubmit(onLogin)}
            >
              <div className="mb-1">
                <Label className="form-label" for="username">
                  Số điện thoại
                </Label>
                <Controller
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <Input
                      autoFocus
                      placeholder="Nhập số điện thoại"
                      invalid={!!errors.username}
                      {...field}
                      autoComplete="new-password"
                    />
                  )}
                />
                {errors.username && (
                  <FormFeedback>{errors.username.message}</FormFeedback>
                )}
              </div>
              <div className="mb-2">
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
                      autoComplete="new-password"
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
              <Link to={`${REGISTER}?challenge=${challenge}`}>
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
