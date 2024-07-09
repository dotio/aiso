import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDashboardStatistic } from '@web/apis/dashboard';

export const DASHBOARD_FETCH_ALL_ACTION = 'dashboard/fetch/all';

export const dashboardFetchAllAction = createAsyncThunk(DASHBOARD_FETCH_ALL_ACTION, fetchDashboardStatistic);
