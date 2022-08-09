import { User } from 'modules/user/types';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AppPermisison } from 'types';
import { DefaultRoute } from '../router/routes';

export const MySwal = withReactContent(Swal);

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num;

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, '');

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting?: Intl.DateTimeFormatOptions) => {
  if (!formatting) {
    formatting = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
  }
  if (!value) return value;
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' };
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData');
export const getUserData = () => JSON.parse(localStorage.getItem('userData'));

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === 'admin') return DefaultRoute;
  if (userRole === 'client') return '/access-control';
  return '/login';
};

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed', // for input hover border-color
  },
});

export const queryStringToObject = (
  search: string,
  arrayKey: string[] = [],
): any => {
  const urlParams = new URLSearchParams(search);
  const result = {};

  for (const [key, value] of urlParams) {
    if (typeof value === 'string') {
      if (arrayKey.includes(key)) {
        result[key] = value.split(',');
      } else {
        result[key] = value.trim();
      }
    } else result[key] = value;
  }
  return result;
};

export const objectToQueryString = (obj): string => {
  const queryParams: any = [];

  for (const key of Object.keys(obj)) {
    if (obj[key] === false || obj[key]) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      }

      queryParams.push(`${key}=${obj[key]}`);
    }
  }

  return queryParams.join('&');
};

export const normalizeSeparator = (
  value,
  regexSeparator = /[\n\s;:,./\\]+/,
) => {
  if (!value) return undefined;
  const trimRegex = /(^,+)|(,$)/g;
  if (typeof value === 'string') {
    return value.split(regexSeparator).join(',').replace(trimRegex, '');
  }
  if (Array.isArray(value)) {
    return value.join(',').replace(trimRegex, '');
  }
  return value;
};

export const buildPermission = ({ resource, action }: AppPermisison) => {
  return [resource, action].join(':');
};

export const swalNoticeAction = (title, text) => {
  return MySwal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonText: 'Đóng',
    customClass: {
      confirmButton: 'btn btn-primary',
    },
  });
};

export const swalDeleteAction = (title, text, callback) => {
  return MySwal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Đồng ý xóa',
    cancelButtonText: 'Hủy',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ms-1',
    },
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      callback().then(() =>
        MySwal.fire({
          icon: 'success',
          title: 'Xóa thành công!',
          text: 'Bản ghi đã được xóa thành công.',
          confirmButtonText: 'Đóng',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
        }),
      );
    }
  });
};

/**
 * @param swalOptions https://sweetalert2.github.io/#configuration
 */
export const swalWarningAction = (swalOptions, callback, successMessage) => {
  const {
    confirmButtonText = 'Đồng ý',
    cancelButtonText = 'Hủy',
    ...rest
  } = swalOptions;

  MySwal.fire({
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-outline-danger ms-1',
    },
    buttonsStyling: false,
    ...rest,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await callback();
      if (successMessage) {
        toast.success(successMessage);
      }
    }
  });
};

export const checkPermission = (
  requiredPermission: AppPermisison,
  user: User,
) => {
  if (!requiredPermission) return !!user;

  const strPermission = buildPermission(requiredPermission);
  return (user?.permissions || []).some(({ code }) =>
    code.startsWith(strPermission),
  );
};

export const getEnv = (key: string) => {
  return process.env[`REACT_APP_${key}`] || '';
};
