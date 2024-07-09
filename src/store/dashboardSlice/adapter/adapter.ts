import { PayloadAction } from "@reduxjs/toolkit";
import { IConnectionState } from "@web/connections";
import {
  STATUSES,
  IDashboardStatisticResponse,
  IProfile,
  IDashboardItem,
  IDashboardItemList,
  IDashboardMeta
} from '@web/types';


interface IAdapter {
  status: IConnectionState;
  dashboard: {
    status: string;
    entities: {
      items: IDashboardItemList[];
      dashboard: IDashboardItem;
    };
    meta: IDashboardMeta
  };
}

const defaultDashboardItem: IDashboardItem = {
  topics_count: 0,
  topics_duration: 0,
  target_topics: {
    total_count: 0,
    total_percent: 0,
    success_count: 0,
    failure_count: 0,
    success_percent: 0,
    failure_percent: 0,
  },
  service_topics: {
    total_count: 0,
    total_percent: 0,
    success_count: 0,
    failure_count: 0,
    success_percent: 0,
    failure_percent: 0,
  },
  non_target_topics: {
    total_count: 0,
    total_percent: 0,
    success_count: 0,
    failure_count: 0,
    success_percent: 0,
    failure_percent: 0,
  },
  target_actions: {
    count: 0,
    type: '',
    cost: {
      amount: 0,
      currency: 'RUB',
    },
  },
};

export const DEFAULTS: IAdapter = {
  status: IConnectionState.DISCONNECTED,
  dashboard: {
    status: STATUSES.IDLE,
    entities: {
      items: [],
      dashboard: defaultDashboardItem,
    },
    meta: {
      from_date: '',
      to_date: '',
      detalization_level: 'day'
    }
  },

}

class Adapter {
  public getInitialState(): IAdapter {
    return DEFAULTS;
  }

  dashboardStart(state: IAdapter, action: PayloadAction<IProfile>): IAdapter {
    return state;
  }

  dashboardReset(state: IAdapter, action: PayloadAction): IAdapter {
    return DEFAULTS;
  }

  dashboardStatus(state: IAdapter, action: PayloadAction<IConnectionState>): IAdapter {
    const status = action.payload;

    return { ...state, status };
  }


  public dashboardFetchAllPending(state: IAdapter, action: PayloadAction): IAdapter {
    const currentState = {
      ...state,
      dashboard: {
        ...state.dashboard,
        status: STATUSES.PENDING
      }
    };

    return currentState;
  }

  public dashboardFetchAllFullfilled(
    state: IAdapter,
    action: PayloadAction<IDashboardStatisticResponse>
  ): IAdapter {
    const { data } = action.payload;

    const currentState = {
      ...state,
      dashboard: {
        status: STATUSES.FULFILLED,
        entities: data.data,
        meta: data.meta
      }
    };

    return currentState;
  }

}

const adapter = new Adapter();

const initialState = adapter.getInitialState();

export { initialState };

export default adapter;
