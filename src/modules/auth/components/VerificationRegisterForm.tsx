import { yupResolver } from '@hookform/resolvers/yup';
import { LOGIN } from 'router/path';
import '@core/scss/react/pages/page-authentication.scss';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Spinner,
} from 'reactstrap';
import * as yup from 'yup';
import { MERCHANT_BFF_ERROR_CODE } from '../constants/code';
import { useRecaptcha } from '../hooks/useRecaptcha';
import { authApi } from '../utils/api';
import { ErrorMessage } from './ErrorMessage';

const validationSchema = yup.object().shape({
  verifiedCode: yup.string().trim().required('Vui lòng nhập mã xác nhận'),
});

const TOTAL_COUNTDOWN = 60;

const VerificationRegisterForm = ({ phoneNumber, challenge }) => {
  const history = useHistory();

  const { handleReCaptchaVerify } = useRecaptcha();

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>();

  const [otpLoading, setOtpLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const [countDownTime, setCountDownTime] = useState(TOTAL_COUNTDOWN);

  useEffect(() => {
    if (countDownTime === TOTAL_COUNTDOWN) {
      timerRef.current = setInterval(() => {
        setCountDownTime((prev) => (prev === 0 ? 0 : prev - 1));
      }, 1000);
    } else if (countDownTime === 0) {
      clearInterval(timerRef.current);
    }
  }, [countDownTime]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      verifiedCode: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onConfirm = async (data) => {
    setLoading(true);

    try {
      await authApi.verifyPhone({ ...data, phoneNumber });
      window?.dataLayer?.push?.({
        event: 'register_success',
        phone_number: phoneNumber,
      });
      toast.success('Đăng ký tài khoản thành công', { position: 'top-right' });
      history.push(`${LOGIN}?challenge=${challenge}`);
    } catch (error) {
      const code = error?.response?.data?.code;
      let errMsg = 'Hệ thống đang có lỗi, vui lòng thử lại sau!';

      if (
        [
          MERCHANT_BFF_ERROR_CODE.USERNAME_ACTIVATION_CODE_NOT_VALID,
          MERCHANT_BFF_ERROR_CODE.USERNAME_RECOVERY_CODE_NOT_VALID,
        ].includes(code)
      ) {
        errMsg = 'Mã xác nhận không hợp lệ!';
      }

      setErrorMessage(errMsg);
      setLoading(false);
    }
  };

  const onResendCode = async () => {
    setOtpLoading(true);

    try {
      const token = await handleReCaptchaVerify();

      await authApi.resendActivationCode({
        username: phoneNumber,
        recaptcha_token: token,
      });

      setCountDownTime(TOTAL_COUNTDOWN);
    } catch (e) {
      const errMsg = e.response.data?.error
        ? 'Bạn vượt quá số lượt được gửi mã xác nhận trong ngày'
        : '';

      setErrorMessage(errMsg);
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <>
      <ErrorMessage message={errorMessage} />
      <p className="mt-2 mb-50">
        Mã xác nhận đã được gửi đến <strong>{phoneNumber}</strong>
      </p>
      <Form onSubmit={handleSubmit(onConfirm)}>
        <Controller
          control={control}
          name="verifiedCode"
          render={({ field }) => (
            <InputGroup className="input-group-merge mb-2">
              <Input
                autoFocus
                placeholder="Nhập mã xác nhận"
                invalid={!!errors.verifiedCode}
                {...field}
              />
              {!otpLoading && (
                <InputGroupText
                  className={classNames({
                    'text-primary cursor-pointer fw-bold': !countDownTime,
                    'text-muted': countDownTime,
                  })}
                  onClick={onResendCode}
                >
                  Gửi lại mã{!!countDownTime && ` sau ${countDownTime}s`}
                </InputGroupText>
              )}
            </InputGroup>
          )}
        />
        {errors.verifiedCode && (
          <FormFeedback>{errors.verifiedCode.message}</FormFeedback>
        )}
        <Button disabled={loading} color="primary" type="submit" block>
          {loading && (
            <Spinner as="span" animation="border" size="sm" className="me-50" />
          )}
          Xác nhận
        </Button>
      </Form>
    </>
  );
};

export default VerificationRegisterForm;
