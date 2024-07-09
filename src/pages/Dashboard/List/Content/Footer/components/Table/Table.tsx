import React from 'react';
import { Table } from '@mantine/core';

import classes from './Table.module.css';
import { IDashboardItemList } from '@web/types';
import dayjs from '@web/utils/dayjs';

type Props = {
  data: IDashboardItemList[]
}

function DashboardTable({ data } : Props) {
  const rows = data?.map((element: IDashboardItemList, index: number) => (
    <Table.Tr className={classes.body} key={index}>
      <Table.Td>
        {dayjs(element?.date).format('D MMMM, ')}<br/>
        {dayjs(element?.date).format('HH:mm – HH:mm')}
      </Table.Td>
      <Table.Td>{element?.target_topics?.total_percent}</Table.Td>
      <Table.Td>{element?.service_topics?.total_percent}</Table.Td>
      <Table.Td>{element?.non_target_topics?.total_percent}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table withColumnBorders={false} withRowBorders={false}>
      <Table.Thead className={classes.thead}>
        <Table.Tr>
          <Table.Th className={classes.th1}>Дата, время</Table.Th>
          <Table.Th>Целевых, %</Table.Th>
          <Table.Th>Сервисных, %</Table.Th>
          <Table.Th className={classes.th4}>Нецелевых, %</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default DashboardTable;
