import { Socket } from 'socket.io-client';
import { IAssistant, Channel, ChannelTags } from '@web/types';

export enum IConnectionState {
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  RECONNECTING = 'reconnecting',
  CONNECT_ERROR = 'connect_error'
}

export interface ISocketOptions {
  path: string;
  transports: ['websocket' | 'polling'];
  authType: 'anon' | 'auth';
}

export interface IConnectParams {
  url: string;
  token: string;
  options?: ISocketOptions;
}

export enum IResponseStatus {
  SUCCESS = 'success',
  FAILURE = 'failure'
}

export interface IRequest {
  [key: string]: any
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

export interface IMessagesMeta {
  topic_id: string;
  member_ids: string[];
}

export type IAssistantsResponseSuccess = IResponseSuccess<Record<string, never>, IAssistant[]>;
export type IAssistantsResponse = IAssistantsResponseSuccess | IResponseFailure;
export type IAssistantResponseSuccess = IResponseSuccess<Record<string, never>, IAssistant>;
export type IAssistantUpdateResponseSuccess = IResponseSuccess<Record<string, never>, IAssistant>;
export type IAssistantResponse = IAssistantResponseSuccess | IResponseFailure;
export type IAssistantUpdateResponse = IAssistantUpdateResponseSuccess | IResponseFailure;

export interface ClientToServerEvents {
  'assistants:fetch:all': (data?: IRequest, ack?: (response: IAssistantsResponse) => void) => Promise<IAssistantsResponse>;
  'assistants:update': (data?: IRequest, ack?: (response: IAssistantUpdateResponse) => void) => Promise<IAssistantUpdateResponse>;
  'assistants:create': (data?: IRequest, ack?: (response: IAssistantResponseSuccess) => void) => Promise<IAssistantResponseSuccess>;
  'assistants:start': (data?: IRequest, ack?: (response: IAssistantResponseSuccess) => void) => Promise<IAssistantResponseSuccess>;
  'assistants:stop': (data?: IRequest, ack?: (response: IAssistantResponseSuccess) => void) => Promise<IAssistantResponseSuccess>;
  'assistants:start:channel': (data?: IRequest, ack?: (response: IAssistantResponseSuccess) => void) => Promise<IAssistantResponseSuccess>;
  'assistants:stop:channel': (data?: IRequest, ack?: (response: IAssistantResponseSuccess) => void) => Promise<IAssistantResponseSuccess>;
}

export interface ServerToClientEvents {}

export type ISocket = Socket<ServerToClientEvents, ClientToServerEvents>

export interface IWsApiEvents {
  'status:changed': [IConnectionState];
}

export interface IAssistantCreateParams {
  name: string;
  source: {
    provider_id: string;
    name: string;
  };
  graph: {
    provider_id: string;
    name: string;
  };
  channels: Channel[];
  settings: {
    token: string;
  };
  gender: 'male' | 'female';
  communication_style: string;
}

export interface IAssistantUpdateParams {
  id: string;
  name: string;
  source: {
    provider_id: string;
    name: string;
  };
  graph: {
    provider_id: string;
    name: string;
  };
  channels: Channel[];
  settings: {
    token: string;
  };
  gender: 'male' | 'female';
  communication_style: string;
}

export interface IAssistantStartParams {
  assistant_id: string;
}

export interface IAssistantStartChannelParams {
  assistant_id: string;
  tag: ChannelTags;
}

export interface IAssistantStopParams {
  assistant_id: string;
}

export interface IAssistantStopChannelParams {
  assistant_id: string;
  tag: ChannelTags;
}


