import { createAction } from '@reduxjs/toolkit';
import { IConnectionState } from '@web/connections';

export const ASSISTANTS_STATUS_ACTION = 'assistants/status';

export const assistantsStatusAction = createAction<IConnectionState>(ASSISTANTS_STATUS_ACTION);
