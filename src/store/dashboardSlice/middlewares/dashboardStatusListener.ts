import { startAppListening } from '../../listenerMiddleware';

import { dashboardFetchAllAction } from '../actions';
import { IConnectionState } from '@web/connections';
import dayjs from '@web/utils/dayjs/dayjs';

const today = dayjs();
const yesterday = today.subtract(1, 'day');

startAppListening({
  predicate: (action, currentState, previousState) => {
    if (
      currentState.dashboard.status === IConnectionState.CONNECTED &&
      currentState.dashboard.status !== previousState.dashboard.status
    ) {

      return true;
    }

    return false;
  },
  effect: (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    listenerApi.dispatch(dashboardFetchAllAction({
      from_date: yesterday.format('YYYY-MM-DD'),
      to_date: yesterday.format('YYYY-MM-DD')
    }));
  }
});
