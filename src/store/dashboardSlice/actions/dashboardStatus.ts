import { createAction } from '@reduxjs/toolkit';
import { IConnectionState } from '@web/connections';

export const DASHBOARD_STATUS_ACTION = 'dashboard/status';

export const dashboardStatusAction = createAction<IConnectionState>(DASHBOARD_STATUS_ACTION);
