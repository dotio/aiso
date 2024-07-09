import { createSlice } from '@reduxjs/toolkit';

import dashboardAdapter, { initialState } from './adapter';

import {
  dashboardFetchAllAction,
  dashboardStartAction,
  dashboardStatusAction,
  dashboardResetAction
} from './actions';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    builder
      .addCase(dashboardStartAction, dashboardAdapter.dashboardStart)
      .addCase(dashboardResetAction, dashboardAdapter.dashboardReset)
      .addCase(dashboardStatusAction, dashboardAdapter.dashboardStatus)
      .addCase(dashboardFetchAllAction.pending, dashboardAdapter.dashboardFetchAllPending)
      .addCase(dashboardFetchAllAction.fulfilled, dashboardAdapter.dashboardFetchAllFullfilled);
  }
});

export default dashboardSlice.reducer;
