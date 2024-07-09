import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@web/store';
import { STATUSES, IDashboard, IDashboardMeta } from '@web/types';

export const dashboardAllSelector = createSelector(
  [
    (state: RootState) => state.dashboard.dashboard
  ],
  (dashboard): [boolean, IDashboard, IDashboardMeta] => {
    const isLoading = dashboard.status === STATUSES.PENDING;
    return [isLoading, dashboard.entities, dashboard.meta];
  }
);
