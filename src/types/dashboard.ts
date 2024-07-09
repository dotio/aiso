import { IResponse } from '@web/types/connections';

type Currency = 'RUB' | 'USD' | 'EUR';

interface Cost {
  amount: number;
  currency: Currency;
}

interface Topic {
  total_count: number;
  success_count: number;
  failure_count: number;
  success_percent: number;
  failure_percent: number;
  total_percent: number;
}

interface TargetActions {
  count: number;
  type: string;
  cost: Cost;
}

export interface IDashboardItemList {
  date: string;
  topics_count: number;
  topics_duration: number;
  target_topics: Topic;
  service_topics: Topic;
  non_target_topics: Topic;
  target_actions: TargetActions;
}

export interface IDashboardItem {
  topics_count: number;
  topics_duration: number;
  target_topics: Topic;
  service_topics: Topic;
  non_target_topics: Topic;
  target_actions: TargetActions;
}

export interface IDashboardStatisticParams {
  from_date: string;
  to_date: string;
}

export interface IDashboardMeta {
  from_date: string;
  to_date: string;
  detalization_level: 'hour' | 'day';
}

export enum DashboardPeriods {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  ALL = 'all'
}

export interface IDashboard {
  items: IDashboardItemList[];
  dashboard: IDashboardItem;
}

export interface IDashboardData {
  data: {
    items: IDashboardItemList[];
    dashboard: IDashboardItem;
  }
  meta: IDashboardMeta;
}

export type IDashboardStatisticResponse = IResponse<IDashboardMeta, IDashboardData>;
