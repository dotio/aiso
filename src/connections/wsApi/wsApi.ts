import { io } from 'socket.io-client';
import { nanoid } from '@reduxjs/toolkit';
import EventEmitter from 'eventemitter3';

import {
  IResponseStatus,
  IConnectionState,
  IConnectParams,
  ISocket,
  IWsApiEvents,
  IAssistantsResponseSuccess,
  IAssistantResponse,
  IAssistantCreateParams,
  IAssistantStartParams,
  IAssistantStopParams,
  IAssistantStartChannelParams,
  IAssistantStopChannelParams,
  IAssistantUpdateParams,
  IAssistantUpdateResponse,
} from './types';


class WsAPI {
  public id: string;

  public emitTimeout;

  public status: IConnectionState;

  public socket?: ISocket;

  public events: EventEmitter<IWsApiEvents>;

  constructor() {
    this.id = nanoid();
    this.emitTimeout = 5000;
    this.status = IConnectionState.DISCONNECTED;
    this.events = new EventEmitter();
  }

  public get isConnected() {
    return this.status === IConnectionState.CONNECTED;
  }

  public async connect(data: IConnectParams) {
    if (this.socket) {
      return;
    }

    this.socket = io(data.url, {
      autoConnect: false,
      path: data.options?.path || '/ws',
      auth: {
        type: data.options?.authType || 'auth',
        token: ['Bearer', data.token].join(' ')
      },
      transports: data.options?.transports || ['websocket', 'polling']
    });

    this.status = IConnectionState.CONNECTING;

    this.addEventListeners();

    this.socket.connect();
  }

  public async disconnect() {
    this.socket?.disconnect();
    this.status = IConnectionState.DISCONNECTED;
    delete this.socket;
  }


  public assistantsFetchAll = (): Promise<IAssistantsResponseSuccess> => {
    const promise = new Promise<IAssistantsResponseSuccess>((resolve, reject) => {
      this.socket?.emit('assistants:fetch:all', {}, (response) => {
        response.status === IResponseStatus.SUCCESS ? resolve(response) : reject(response);
      });
    });

    return promise;
  };

  public assistantsCreate = (data: IAssistantCreateParams): Promise<IAssistantResponse> => {
    const promise = new Promise<IAssistantResponse>((resolve, reject) => {
      this.socket?.emit('assistants:create', data, (response) => resolve(response));
    });

    return promise;
  };

  public assistantsUpdate = (data: IAssistantUpdateParams): Promise<IAssistantUpdateResponse> => {
    const promise = new Promise<IAssistantUpdateResponse>((resolve, reject) => {
      this.socket?.emit('assistants:update', data, (response) => resolve(response));
    });

    return promise;
  };

  public assistantsStart = (data: IAssistantStartParams): Promise<IAssistantResponse> => {
    const promise = new Promise<IAssistantResponse>((resolve, reject) => {
      this.socket?.emit('assistants:start', data, (response) => resolve(response));
    });

    return promise;
  };

  public assistantsStop = (data: IAssistantStopParams): Promise<IAssistantResponse> => {
    const promise = new Promise<IAssistantResponse>((resolve, reject) => {
      this.socket?.emit('assistants:stop', data, (response) => resolve(response));
    });

    return promise;
  };

  public assistantsStartChannel = (
    data: IAssistantStartChannelParams
  ): Promise<IAssistantResponse> => {
    const promise = new Promise<IAssistantResponse>((resolve, reject) => {
      this.socket?.emit('assistants:start:channel', data, (response) => resolve(response));
    });

    return promise;
  };

  public assistantsStopChannel = (
    data: IAssistantStopChannelParams
  ): Promise<IAssistantResponse> => {
    const promise = new Promise<IAssistantResponse>((resolve, reject) => {
      this.socket?.emit('assistants:stop:channel', data, (response) => resolve(response));
    });

    return promise;
  };



  private addEventListeners() {
    if (!this.socket) {
      return;
    }

    this.socket.io.on('reconnect', this.onReconnecthandler);

    this.socket
      .on('connect_error', this.onConnectErrorHandler)
      .on('connect', this.onConnectHandler)
      .on('disconnect', this.onDisconnectHandler)
  }

  private onConnectHandler = () => {
    this.status = IConnectionState.CONNECTED;
    this.events.emit('status:changed', this.status);
  };

  private onDisconnectHandler = () => {
    this.status = IConnectionState.DISCONNECTED;
    this.events.emit('status:changed', this.status);
  };

  private onConnectErrorHandler = () => {
    this.status = IConnectionState.CONNECT_ERROR;
    this.events.emit('status:changed', this.status);
  };

  private onReconnecthandler = () => {
    this.status = IConnectionState.RECONNECTING;
    this.events.emit('status:changed', this.status);
  };
}

const wsAPI = new WsAPI();

export default wsAPI;
