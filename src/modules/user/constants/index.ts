import { LoginMethodEnum } from '../types';

export const MAPPING_LOGIN_METHOD = {
  [LoginMethodEnum.local]: 'Mật khẩu',
  [LoginMethodEnum.facebook]: 'Facebooke',
  [LoginMethodEnum.google]: 'Google',
};
