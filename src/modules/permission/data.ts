import { Permission } from './types';

export const mockPermissions: Permission[] = [
  {
    id: 1,
    name: 'Xem Slug',
    code: 'slug:read',
  },
  {
    id: 2,
    name: 'Thêm Popup',
    code: 'popup:create',
  },
  {
    id: 3,
    name: 'Xem Popup',
    code: 'popup:read',
  },
];
