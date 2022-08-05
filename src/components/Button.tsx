import React from 'react';
import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
  Spinner,
} from 'reactstrap';

interface ButtonProps extends BaseButtonProps {
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  ...rest
}) => {
  return (
    <BaseButton disabled={loading} {...rest}>
      {loading && (
        <Spinner as="span" animation="border" size="sm" className="me-50" />
      )}
      {children}
    </BaseButton>
  );
};
