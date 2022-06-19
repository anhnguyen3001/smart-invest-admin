import logo from 'assets/images/logo/logo.png';
import { PageWithRecaptcha } from 'modules/core/components';
import { HOME, LOGIN } from 'router/path';
import '@core/scss/react/pages/page-authentication.scss';
import { queryStringToObject } from 'utility/Utils';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardBody, CardTitle } from 'reactstrap';
import RegisterForm from '../components/RegisterForm';
import VerificationRegisterForm from '../components/VerificationRegisterForm';
import '../styles/common.scss';

const Register = () => {
  const { search } = useLocation();
  const { challenge } = queryStringToObject(search);

  const [otpSent, setOtpSent] = useState(false);
  const [username, setUsername] = useState('');

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
            {otpSent ? (
              <VerificationRegisterForm
                phoneNumber={username}
                challenge={challenge}
              />
            ) : (
              <RegisterForm setOtpSent={setOtpSent} setUsername={setUsername} />
            )}
            <p className="text-center mt-2">
              <span className="me-25">Bạn đã có tài khoản?</span>
              <Link to={`${LOGIN}?challenge=${challenge}`}>
                <span>Đăng nhập</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

const RegisterWithRecaptcha = () => {
  return (
    <PageWithRecaptcha>
      <Register />
    </PageWithRecaptcha>
  );
};

export default RegisterWithRecaptcha;
