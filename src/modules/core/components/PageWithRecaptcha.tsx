import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const { googleReCaptchaKey } = window?.config || {};

export const PageWithRecaptcha = ({ children }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={googleReCaptchaKey}>
      {children}
    </GoogleReCaptchaProvider>
  );
};
