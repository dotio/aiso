import React from 'react';
import { DatePickerInput, DatePickerInputProps } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import _ from 'lodash';

import { useAppDispatch } from '@web/store';
import dayjs from '@web/utils/dayjs/dayjs';
import { dashboardFetchAllAction } from '@web/store/dashboardSlice/actions';
import { datesIsSame } from '@web/utils/dayjs';

interface CalendarProps extends Omit<DatePickerInputProps<'range'>, 'type'> {
  label?: string;
  placeholder?: string;
  noData: boolean;
  setSelectedDates: React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>;
  selectedDates: [Date | null, Date | null];
}

function Calendar({
  label,
  placeholder,
  onChange,
  value,
  defaultValue,
  setSelectedDates,
  selectedDates,
  noData
}: CalendarProps) {
  const dispatch = useAppDispatch();

  const doFetchDate = async (dates: [Date | null, Date | null]) => {
    if (dates[0] && dates[1]) {
      const dateFrom = dayjs(dates[0]).format('YYYY-MM-DD');
      const dateTo = dayjs(dates[1]).format('YYYY-MM-DD');
      await dispatch(dashboardFetchAllAction({ from_date: dateFrom, to_date: dateTo }));
    }
  };

  const handleChange = (dates: [Date | null, Date | null]) => {
    setSelectedDates(dates);
    if (onChange) {
      onChange(dates);
    }
  };

  React.useEffect(() => {
    if (
      selectedDates[0] &&
      selectedDates[1] &&
      !datesIsSame(selectedDates[0], selectedDates[1]) &&
      !_.some(selectedDates, _.isNull)
    ) {
      doFetchDate(selectedDates);
    }
  }, [selectedDates, dispatch]);

  return (
    <DatePickerInput
      disabled={noData}
      type="range"
      value={value || selectedDates}
      onChange={handleChange}
      locale="ru"
      valueFormat="DD MMM"
      clearable
      placeholder={placeholder}
      defaultValue={selectedDates}
      leftSection={<IconCalendar color="var(--mantine-color-blue-6)" />}
    />
  );
}

export default Calendar;
