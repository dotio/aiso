import { createAsyncThunk } from '@reduxjs/toolkit';

import { IResponseFailure, IResponseStatus } from '@web/types';
import { IAssistantCreateParams, IAssistantResponseSuccess, wsApi } from '@web/connections';

export const ASSISTANTS_CREATE_ACTION = 'assistants/create';

export const assistantsCreateAction = createAsyncThunk<
  IAssistantResponseSuccess,
  IAssistantCreateParams,
  { rejectValue: IResponseFailure }
>(ASSISTANTS_CREATE_ACTION, async (params, thunkApi) => {
  const response = await wsApi.assistantsCreate(params);
  if (response.status === IResponseStatus.FAILURE) {
    return thunkApi.rejectWithValue(response);
  }

  return response;
});
