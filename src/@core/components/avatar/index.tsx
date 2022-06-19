// ** React Imports
import { forwardRef } from 'react';

import classnames from 'classnames';

// ** Reactstrap Imports
import { Badge } from 'reactstrap';

export interface AvatarProps {
  icon?: React.ReactNode;
  img?: string | false;
  badgeUp?: boolean;
  content?: React.ReactNode;
  badgeText?: string;
  className?: string;
  imgClassName?: string;
  contentStyles?: React.CSSProperties;
  size?: 'sm' | 'lg' | 'xl';
  tag?: any;
  status?: 'online' | 'offline' | 'away' | 'busy';
  imgHeight?: string | number;
  imgWidth?: string | number;
  badgeColor?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'info'
    | 'warning'
    | 'dark'
    | 'light-primary'
    | 'light-secondary'
    | 'light-success'
    | 'light-danger'
    | 'light-info'
    | 'light-warning'
    | 'light-dark';
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'info'
    | 'warning'
    | 'dark'
    | 'light-primary'
    | 'light-secondary'
    | 'light-success'
    | 'light-danger'
    | 'light-info'
    | 'light-warning'
    | 'light-dark';
  initials?: any;
}

const Avatar = forwardRef((props: AvatarProps, ref) => {
  // ** Props
  const {
    img,
    size,
    icon,
    color,
    status,
    badgeUp,
    content,
    tag: Tag = 'div',
    initials,
    imgWidth,
    className,
    badgeText,
    imgHeight,
    badgeColor,
    imgClassName,
    contentStyles,
    ...rest
  } = props;

  // ** Function to extract initials from content
  const getInitials = (str) => {
    const results = [];
    const wordArray = str.split(' ');
    wordArray.forEach((e) => {
      results.push(e[0]);
    });
    return results.join('');
  };

  return (
    <Tag
      className={classnames('avatar', {
        [className]: className,
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size,
      })}
      ref={ref}
      {...rest}
    >
      {img === false || img === undefined ? (
        <span
          className={classnames('avatar-content', {
            'position-relative': badgeUp,
          })}
          style={contentStyles}
        >
          {initials ? getInitials(content) : content}

          {icon ? icon : null}
          {badgeUp ? (
            <Badge
              color={badgeColor ? badgeColor : 'primary'}
              className="badge-sm badge-up"
              pill
            >
              {badgeText ? badgeText : '0'}
            </Badge>
          ) : null}
        </span>
      ) : (
        <img
          className={classnames({
            [imgClassName]: imgClassName,
          })}
          src={img}
          alt="avatarImg"
          height={imgHeight && !size ? imgHeight : 32}
          width={imgWidth && !size ? imgWidth : 32}
        />
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size,
          })}
        ></span>
      ) : null}
    </Tag>
  );
});

export default Avatar;
