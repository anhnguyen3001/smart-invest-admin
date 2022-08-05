import { DefaultRoute } from '../router/routes';
import TekoMarket from 'teko-market-v1';
import toast from 'react-hot-toast';
import { X } from 'react-feather';
import { ADMIN } from 'router/path';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { KEY_USER_LS } from 'configs/constants';
import { User } from 'modules/user/types';
import { AppPermisison } from 'types';

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

export const isLoggedIn = () => {
  return TekoMarket.auth.user.isLoggedIn();
};

export const login = (path) => {
  const redirectUrl =
    window.location.origin + (typeof path === 'string' ? path : ADMIN);

  TekoMarket.auth.user.login(redirectUrl);
};

const MAPPING_CODE_MESSAGE = {
  400000:
    'Người dùng đã gửi một yêu cầu không hợp lệ, thiếu tham số hoặc các trường bắt buộc trong request body',
  400001: 'Thiếu trường thông tin trong header',
  400002: 'Liên kết đã được sử dụng, vui lòng thử với liên kết khác',
  400003: 'Slug đã tồn tại trong một liên kết khác',
  400004: 'Người dùng đã tồn tại',
  400005: 'Id cửa hàng đã tồn tại',
  400006: 'Tên nhãn đã tồn tại',
  400007: 'Sku sản phẩm đã tồn tại',
  400008: 'Tên miền đã tồn tại',
  400009: 'Tên miền đã được liên kết với một cửa hàng khác',
  400011: 'Tên miền đã được sử dụng cho một trang đã xuất bản',
  400012: 'Tên miền chưa được cấu hình DNS',
  400013: 'Thiếu slug hoặc domainId để xuất bản trang',
  400014: 'Tên miền của cửa hàng khác với trang của cửa hàng',
  400015: 'Người dùng không thể truy cập market merchant này',
  401000: 'Không xác thực được người dùng',
  403000: 'Người dùng không được phép truy cập tài nguyên này',
  403001: 'Người dùng chưa có cửa hàng nào',
  404001: 'Không tìm thấy trang được yêu cầu',
  404002: 'Không tìm thấy danh mục được yêu cầu',
  404003: 'Không tìm thấy giao diện mẫu được yêu cầu',
  404004: 'Không tìm thấy cửa hàng được yêu cầu',
  404005: 'Không tìm thấy đối tác được yêu cầu',
  404006: 'Không tìm thấy người dùng được yêu cầu',
  404007: 'Không tìm thấy khối được yêu cầu',
  404008: 'Không tìm thấy nhãn sản phẩm được yêu cầu',
  404009: 'Không tìm thấy sản phẩm được yêu cầu',
  404010: 'Không tìm thấy tên miền được yêu cầu',
  404011: 'Không tìm thấy popup được yêu cầu',
  424000: 'Có lỗi xảy ra khi gọi API bên ngoài',
  500000: 'Có lỗi xảy ra, vui lòng thử lại sau',
  500001: 'Có lỗi xảy ra, vui lòng thử lại sau',
};

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
