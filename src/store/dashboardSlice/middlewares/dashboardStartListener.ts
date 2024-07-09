import { startAppListening } from '../../listenerMiddleware';
import { wsApi } from '@web/connections';

import {
  dashboardStartAction,
  dashboardStatusAction
} from '../actions';

startAppListening({
  actionCreator: dashboardStartAction,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    wsApi.events.on(
      'status:changed',
      (status) => listenerApi.dispatch(dashboardStatusAction(status))
    );

    // Add other events here

    listenerApi.dispatch(dashboardStatusAction(wsApi.status));
  }
});
