import { startAppListening } from '../../listenerMiddleware';

import { assistantsFetchAllAction } from '../actions';
import { IConnectionState } from '@web/connections';

startAppListening({
  predicate: (action, currentState, previousState) => {
    if (
      currentState.assistants.status === IConnectionState.CONNECTED &&
      currentState.assistants.status !== previousState.assistants.status
    ) {
      return true;
    }

    return false;
  },
  effect: (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    listenerApi.dispatch(assistantsFetchAllAction());
  }
});
