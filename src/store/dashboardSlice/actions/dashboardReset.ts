import { createAction } from '@reduxjs/toolkit';

export const DASHBOARD_RESET_ACTION = 'dashboard/reset';

export const dashboardResetAction = createAction(DASHBOARD_RESET_ACTION);
