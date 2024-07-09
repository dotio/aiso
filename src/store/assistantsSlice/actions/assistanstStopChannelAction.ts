import { createAsyncThunk } from '@reduxjs/toolkit';

import { IResponseFailure, IResponseStatus } from '@web/types';
import { IAssistantResponseSuccess, IAssistantStopChannelParams, wsApi } from '@web/connections';

export const ASSISTANTS_STOP_CHANNEL_ACTION = 'assistants/stop/channel';

export const assistantsStopChannelAction = createAsyncThunk<
  IAssistantResponseSuccess,
  IAssistantStopChannelParams,
  { rejectValue: IResponseFailure }
>(ASSISTANTS_STOP_CHANNEL_ACTION, async (params, thunkApi) => {
  const response = await wsApi.assistantsStopChannel(params);
  if (response.status === IResponseStatus.FAILURE) {
    return thunkApi.rejectWithValue(response);
  }

  return response;
});
