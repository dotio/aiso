import { createAsyncThunk } from '@reduxjs/toolkit';

import { IResponseFailure, IResponseStatus } from '@web/types';
import {
  IAssistantResponseSuccess,
  IAssistantStartChannelParams,
  wsApi
} from '@web/connections';

export const ASSISTANTS_START_CHANNEL_ACTION = 'assistants/start/channel';

export const assistantsStartChannelAction = createAsyncThunk<
  IAssistantResponseSuccess,
  IAssistantStartChannelParams,
  { rejectValue: IResponseFailure }
>(ASSISTANTS_START_CHANNEL_ACTION, async (params, thunkApi) => {
  const response = await wsApi.assistantsStartChannel(params);
  if (response.status === IResponseStatus.FAILURE) {
    return thunkApi.rejectWithValue(response);
  }

  return response;
});
