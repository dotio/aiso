import { createAsyncThunk } from '@reduxjs/toolkit';

import { IResponseFailure, IResponseStatus } from '@web/types';
import { IAssistantResponseSuccess, IAssistantStartParams, wsApi } from '@web/connections';

export const ASSISTANTS_BOTS_START_ACTION = 'assistants/bots/start';

export const assistantsBotsStartAction = createAsyncThunk<
  IAssistantResponseSuccess,
  IAssistantStartParams,
  { rejectValue: IResponseFailure }
>(ASSISTANTS_BOTS_START_ACTION, async (params, thunkApi) => {
  const response = await wsApi.assistantsStart(params);
  if (response.status === IResponseStatus.FAILURE) {
    return thunkApi.rejectWithValue(response);
  }

  return response;
});
