import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useAppSelector } from 'redux/store';
import { HOME, LOGIN } from 'router/path';
import NotFoundImage from '../../../assets/images/pages/404.svg';

const NotFound: React.FC = () => {
  const history = useHistory();

  const user = useAppSelector((state) => state.auth.user);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <div className="text-center p-2">
        <h1>Không tìm thấy trang</h1>
        <div>Bạn vui lòng truy cập trang chủ để được hỗ trợ.</div>
        <div className="mt-2">
          <Button
            color="primary"
            onClick={() => history.push(user ? HOME : LOGIN)}
          >
            {user ? 'Về trang chủ' : 'Đăng nhập'}
          </Button>
        </div>
        <img
          src={NotFoundImage}
          alt="404"
          style={{ maxWidth: '100%', maxHeight: '60vh' }}
        />
      </div>
    </div>
  );
};

export default NotFound;
