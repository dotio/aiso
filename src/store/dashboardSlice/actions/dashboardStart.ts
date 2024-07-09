import { createAction } from '@reduxjs/toolkit';
import { IProfile } from '@web/types';

export const DASHBOARD_START_ACTION = 'dashboard/start';

export const dashboardStartAction = createAction<IProfile>(DASHBOARD_START_ACTION);
