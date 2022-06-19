import InputPasswordToggle from '@core/components/input-password-toggle';
import { yupResolver } from '@hookform/resolvers/yup';
import '@core/scss/react/pages/page-authentication.scss';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, FormFeedback, Input, Label, Spinner } from 'reactstrap';
import * as yup from 'yup';
import { MERCHANT_BFF_ERROR_CODE } from '../constants/code';
import { useRecaptcha } from '../hooks/useRecaptcha';
import { authApi } from '../utils/api';
import { ErrorMessage } from './ErrorMessage';

const validationSchema = yup.object().shape({
  username: yup.string().trim().required('Vui lòng nhập số điện thoại'),
  // .matches(PATTERN_VALIDATION.phone, 'Số điện thoại không đúng'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu không hợp lệ, phải có ít nhất 6 ký tự'),
  rePassword: yup.string().oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  merchantName: yup
    .string()
    .trim()
    .required('Vui lòng nhập tên cửa hàng / doanh nghiệp'),
});

const RegisterForm = ({ setOtpSent, setUsername }) => {
  const { handleReCaptchaVerify } = useRecaptcha();

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState();

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      rePassword: '',
      merchantName: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onRegister = async (data) => {
    setLoading(true);

    try {
      const token = await handleReCaptchaVerify();
      await authApi.register({
        ...data,
        recaptchaToken: token,
      });

      setUsername(data.username);
      setOtpSent(true);
    } catch (error) {
      console.error(error);
      const code = error?.response?.data?.code;
      let errMsg;

      switch (code) {
        case MERCHANT_BFF_ERROR_CODE.USER_EXISTED:
          errMsg = 'Số điện thoại đã tồn tại!';
          break;
        case MERCHANT_BFF_ERROR_CODE.TOO_MANY_REQUEST:
          errMsg = 'Bạn đã yêu cầu quá nhiều lần, vui lòng thử lại sau!';
          break;
        default:
          errMsg = 'Hệ thống đang có lỗi, vui lòng thử lại sau!';
      }

      setErrorMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ErrorMessage message={errorMessage} />
      <Form
        className="auth-register-form mt-2"
        onSubmit={handleSubmit(onRegister)}
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
                autoComplete="new-password"
                {...field}
              />
            )}
          />
          {errors.username && (
            <FormFeedback>{errors.username.message}</FormFeedback>
          )}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="password">
            Mật khẩu
          </Label>
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
                  if (errors.rePassword) {
                    trigger('rePassword');
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
            name="rePassword"
            render={({ field }) => (
              <InputPasswordToggle
                className="mt-1 input-group-merge"
                placeholder="Nhập lại mật khẩu"
                invalid={!!errors.rePassword}
                {...field}
              />
            )}
          />
          {errors.rePassword && (
            <FormFeedback>{errors.rePassword.message}</FormFeedback>
          )}
        </div>
        <div className="mb-2">
          <Label className="form-label" for="merchantName">
            Tên cửa hàng / doanh nghiệp
          </Label>
          <Controller
            control={control}
            name="merchantName"
            render={({ field }) => (
              <Input
                placeholder="Nhập tên cửa hàng / doanh nghiệp"
                invalid={!!errors.merchantName}
                {...field}
              />
            )}
          />
          {errors.merchantName && (
            <FormFeedback>{errors.merchantName.message}</FormFeedback>
          )}
        </div>
        <Button disabled={loading} color="primary" type="submit" block>
          {loading && (
            <Spinner as="span" animation="border" size="sm" className="me-50" />
          )}
          Tiếp tục
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
