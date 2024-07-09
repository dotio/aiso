export enum STATUSES {
  // eslint-disable-next-line no-unused-vars
  IDLE = 'idle',

  // eslint-disable-next-line no-unused-vars
  PENDING = 'pending',

  // eslint-disable-next-line no-unused-vars
  FULFILLED = 'fulfilled',

  // eslint-disable-next-line no-unused-vars
  REJECTED = 'rejected'
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
}

export interface ISort {
  sort_by: string;
  direction: -1|1;
}

export interface IFileSizeUnit {
  metric: 'B' | 'Kb' | 'Mb' | 'Gb' | 'Tb' | 'Pb' | 'Eb' | 'Zb' | 'Yb';
  binary: 'KiB' | 'MiB' | 'GiB' | 'TiB' | 'PiB' | 'EiB' | 'ZiB' | 'YiB';
}

export type NonEmptyArr<T> = [T, ...T[]];
export const isNonEmptyArray = <T>(arr: T[]): arr is NonEmptyArr<T> => arr.length > 0;
