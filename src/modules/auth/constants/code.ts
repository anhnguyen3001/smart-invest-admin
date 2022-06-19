export const MERCHANT_BFF_ERROR_CODE = {
  USER_EXISTED: 'user_is_existed',
  TOO_MANY_REQUEST: 'too_many_request',
  USERNAME_PASSWORD_NOT_CORRECT: 'username_password_not_correct',
  USERNAME_RECOVERY_CODE_NOT_VALID: 'username_recovery_code_not_valid',
  USERNAME_ACTIVATION_CODE_NOT_VALID: 'username_activation_code_not_valid',
};

export const IAM_AUTH_ERROR_CODE = {
  TOO_MANY_REQUEST: 1800,
  USERNAME_PASSWORD_NOT_CORRECT: 1017,
  USERNAME_ACTIVATION_CODE_NOT_VALID: 1041,
  USERNAME_RECOVERY_CODE_NOT_VALID: 1042,
  ACCOUNT_NOT_ACTIVATE: 1011,

  // Update later
  USER_EXISTED: 1021,
};
