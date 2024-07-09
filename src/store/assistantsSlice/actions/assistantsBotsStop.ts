import { createAsyncThunk } from '@reduxjs/toolkit';

import { IResponseFailure, IResponseStatus } from '@web/types';
import { IAssistantResponseSuccess, IAssistantStopParams, wsApi } from '@web/connections';

export const ASSISTANTS_BOTS_STOP_ACTION = 'assistants/bots/stop';

export const assistantsBotsStopAction = createAsyncThunk<
  IAssistantResponseSuccess,
  IAssistantStopParams,
  { rejectValue: IResponseFailure }
>(ASSISTANTS_BOTS_STOP_ACTION, async (params, thunkApi) => {
  const response = await wsApi.assistantsStop(params);
  if (response.status === IResponseStatus.FAILURE) {
    return thunkApi.rejectWithValue(response);
  }

  return response;
});
