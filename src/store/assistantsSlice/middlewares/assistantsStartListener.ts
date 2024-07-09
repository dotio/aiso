import { startAppListening } from '../../listenerMiddleware';
import { wsApi } from '@web/connections';

import {
  assistantsStartAction,
  assistantsStatusAction
} from '../actions';

startAppListening({
  actionCreator: assistantsStartAction,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    wsApi.events.on(
      'status:changed',
      (status) => listenerApi.dispatch(assistantsStatusAction(status))
    );

    // Add other events here

    listenerApi.dispatch(assistantsStatusAction(wsApi.status));
  }
});
