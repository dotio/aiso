export enum IResponseStatus {
  SUCCESS = 'success',
  FAILURE = 'failure'
}

export interface IRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface IResponse<M, D> {
  meta: M;
  data: D;
}

export interface IResponseSuccess<M, D> {
  status: IResponseStatus.SUCCESS;
  meta: M;
  data: D;
}

export interface IResponseFailure {
  status: IResponseStatus.FAILURE;
  code: string;
  messages: string[];
}
