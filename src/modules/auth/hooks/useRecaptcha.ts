import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export const useRecaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = async () => {
    if (!executeRecaptcha) {
      console.warn('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha();
    return token;
  };

  return { handleReCaptchaVerify };
};
