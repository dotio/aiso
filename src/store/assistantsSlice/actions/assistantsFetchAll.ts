import { createAsyncThunk } from '@reduxjs/toolkit';
import { wsApi } from '@web/connections';

export const ASSISTANTS_FETCH_ALL_ACTION = 'assistants/fetch/all';

export const assistantsFetchAllAction = createAsyncThunk(ASSISTANTS_FETCH_ALL_ACTION, wsApi.assistantsFetchAll);
