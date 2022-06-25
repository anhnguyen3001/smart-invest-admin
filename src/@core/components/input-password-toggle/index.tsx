// ** React Imports
import { Fragment, useState, forwardRef } from 'react';

// ** Third Party Components
import classnames from 'classnames';
import { Eye, EyeOff } from 'react-feather';

// ** Reactstrap Imports
import {
  InputGroup,
  Input,
  InputGroupText,
  Label,
  InputProps,
} from 'reactstrap';

interface InputPasswordToggleProps extends InputProps {
  invalid?: boolean;
  hideIcon?: React.ReactNode;
  showIcon?: React.ReactNode;
  visible?: boolean;
  className?: string;
  placeholder?: string;
  iconSize?: number;
  inputClassName?: string;
  label?: any;
  htmlFor?: any;
}

const InputPasswordToggle = forwardRef(
  (props: InputPasswordToggleProps, ref: any) => {
    // ** Props
    const {
      label,
      hideIcon,
      showIcon,
      visible = false,
      className,
      htmlFor,
      placeholder,
      iconSize,
      inputClassName,
      invalid,
      ...rest
    } = props;

    // ** State
    const [inputVisibility, setInputVisibility] = useState(visible);

    // ** Renders Icon Based On Visibility
    const renderIcon = () => {
      const size = iconSize ? iconSize : 14;

      if (inputVisibility === false) {
        return hideIcon ? hideIcon : <Eye size={size} />;
      } else {
        return showIcon ? showIcon : <EyeOff size={size} />;
      }
    };

    return (
      <Fragment>
        {!!label && <Label for={htmlFor}>{label}</Label>}
        <InputGroup
          className={classnames({
            [className]: className,
            'is-invalid': invalid,
          })}
        >
          <Input
            ref={ref}
            invalid={invalid}
            type={inputVisibility === false ? 'password' : 'text'}
            placeholder={placeholder ? placeholder : '············'}
            className={classnames({
              [inputClassName]: inputClassName,
            })}
            /*eslint-disable */
            {...(label && htmlFor
              ? {
                  id: htmlFor,
                }
              : {})}
            {...rest}
            /*eslint-enable */
          />
          <InputGroupText
            className="cursor-pointer"
            onClick={() => setInputVisibility(!inputVisibility)}
          >
            {renderIcon()}
          </InputGroupText>
        </InputGroup>
      </Fragment>
    );
  },
);

export default InputPasswordToggle;
