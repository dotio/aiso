import { createAsyncThunk } from '@reduxjs/toolkit';

import { IResponseFailure, IResponseStatus } from '@web/types';
import {
  IAssistantResponseSuccess,
  IAssistantUpdateParams,
  wsApi
} from '@web/connections';

export const ASSISTANTS_UPDATE_ACTION = 'assistants/update';

export const assistantsUpdateAction = createAsyncThunk<
  IAssistantResponseSuccess,
  IAssistantUpdateParams,
  { rejectValue: IResponseFailure }
>(ASSISTANTS_UPDATE_ACTION, async (params, thunkApi) => {
  const response = await wsApi.assistantsUpdate(params);
  if (response.status === IResponseStatus.FAILURE) {
    return thunkApi.rejectWithValue(response);
  }

  return response;
});
