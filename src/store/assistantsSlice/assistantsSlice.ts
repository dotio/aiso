import { createSlice } from '@reduxjs/toolkit';

import adapter, { initialState } from './adapter';
import {
  assistantsFetchAllAction,
  assistantsCreateAction,
  assistantsBotsStartAction,
  assistantsBotsStopAction,
  assistantsStartAction,
  assistantsStatusAction,
  assistantsStopChannelAction,
  assistantsStartChannelAction,
  assistantsUpdateAction
} from './actions';

const assistantsSlice = createSlice({
  name: 'assistants',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(assistantsStartAction, adapter.assistantsStart)
    builder.addCase(assistantsStatusAction, adapter.assistantsStatus)
    builder.addCase(assistantsFetchAllAction.pending, adapter.assistantsFetchAllPending)
    builder.addCase(assistantsFetchAllAction.fulfilled, adapter.assistantsFetchAll)
    builder.addCase(assistantsCreateAction.fulfilled, adapter.assistantsCreate)
    builder.addCase(assistantsUpdateAction.fulfilled, adapter.assistantsUpdate)
    builder.addCase(assistantsBotsStartAction.fulfilled, adapter.assistantsUpdate)
    builder.addCase(assistantsBotsStopAction.fulfilled, adapter.assistantsUpdate);
    builder.addCase(assistantsStartChannelAction.fulfilled, adapter.assistantsUpdate);
    builder.addCase(assistantsStopChannelAction.fulfilled, adapter.assistantsUpdate);
  }
});

export default assistantsSlice.reducer;
