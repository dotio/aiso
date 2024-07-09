import { AxiosResponse } from 'axios';
import { httpApi } from '@web/connections';

import { IDashboardStatisticParams, IDashboardStatisticResponse } from '@web/types/dashboard';

export const fetchDashboardStatistic = async (data: IDashboardStatisticParams) => {
  const params = {
    data: data
  };

  const response: AxiosResponse<IDashboardStatisticResponse> = await httpApi.get(
    `/api/analytics/booking_dashboard`,
    { params }
  );

  return response;
};
