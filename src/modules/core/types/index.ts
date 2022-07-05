export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface BaseSearchQueryParams {
  page?: number;
  pageSize?: number;
  q?: string;
  orderBy?: OrderBy;
  sortBy?: string;
}

export interface SelectValue<T> {
  label: string;
  value: T;
}
