import { PayloadAction } from '@reduxjs/toolkit';
import _merge from 'lodash/merge';

import { IAssistantResponseSuccess, IAssistantsResponseSuccess, IConnectionState } from '@web/connections';
import { IAssistant, IProfile, STATUSES } from '@web/types';

export const DEFAULTS: IAdapter = {
  status: IConnectionState.DISCONNECTED,
  assistants: {
    status: STATUSES.IDLE,
    ids: [],
    entities: {}
  }
}

export interface IAssistants {
  status: STATUSES;
  ids: string[];
  entities: {
    [key: string]: IAssistant;
  }
}

export interface IAdapter {
  status: IConnectionState;
  assistants: IAssistants;
}


class Adapter {
  public getInitialState(): IAdapter {
    return DEFAULTS;
  }

  assistantsStart(state: IAdapter, action: PayloadAction<IProfile>): IAdapter {
    return state;
  }

  assistantsReset(state: IAdapter, action: PayloadAction): IAdapter {
    return DEFAULTS;
  }

  assistantsStatus(state: IAdapter, action: PayloadAction<IConnectionState>): IAdapter {
    const status = action.payload;

    return { ...state, status };
  }

  public assistantsFetchAllPending(state: IAdapter, action: PayloadAction): IAdapter {
    const currentState: IAdapter = {
      ...state,
      assistants: {
        ...state.assistants,
        status: STATUSES.PENDING
      }
    }

    return currentState;
  }

  public assistantsFetchAll(state: IAdapter, action: PayloadAction<IAssistantsResponseSuccess>): IAdapter {
    const { data } = action.payload;

    const entities = data.reduce((memo, item) => (
      { ...memo, [item.id]: item }
    ), {});

    const currentState: IAdapter = {
      ...state,
      assistants: {
        status: STATUSES.FULFILLED,
        ids: Object.keys(entities),
        entities
      }
    }

    return currentState;
  }

  public assistantsCreate(state: IAdapter, action: PayloadAction<IAssistantResponseSuccess>): IAdapter {
    const { data } = action.payload;

    const entities = _merge(
      {},
      { [data.id]: data },
      state.assistants.entities,
    )

    const currentState: IAdapter = {
      ...state,
      assistants: {
        status: STATUSES.FULFILLED,
        ids: Object.keys(entities),
        entities
      }
    }

    return currentState;
  }

  public assistantsUpdate(state: IAdapter, action: PayloadAction<IAssistantResponseSuccess>): IAdapter {
    const { data } = action.payload;

    const entities = {
      ...state.assistants.entities,
      [data.id]: data
    };

    const currentState: IAdapter = {
      ...state,
      assistants: {
        status: STATUSES.FULFILLED,
        ids: Object.keys(entities),
        entities
      }
    }

    return currentState;
  }
}

const adapter = new Adapter();

const initialState = adapter.getInitialState();

export { initialState };

export default adapter;
