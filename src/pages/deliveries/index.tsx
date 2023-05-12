import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { OrderService } from '@/api/order.service';
import Layout from '@/components/Layout/Layout';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'phone_number',
    headerName: 'Номер телефона',
    width: 150,
  },
  {
    field: 'address_type',
    headerName: 'Адрес',
    width: 150,
  },
  {
    field: 'status',
    headerName: 'Метод доставки',
    width: 150,
  },
  {
    field: 'quantity',
    headerName: 'Вес, кг',
    type: 'number',
    width: 150,
  },
  {
    field: 'product',
    headerName: 'Товар',
    width: 150,
  },
  {
    field: 'date',
    headerName: 'Выезд',
    width: 150,
  },
  {
    field: 'date_end',
    headerName: 'Дата доставки',
    width: 150,
  },
];

export default function Deliveries() {
  const { data } = useQuery('orders', OrderService.find, {
    select: ({ data }: { data: IOrder[] }) =>
      data?.map((order: any) => ({
        ...order,
        product: order.product.name,
        date: new Date(order.date).toLocaleDateString(),
        date_end: new Date(order.date_end).toLocaleDateString(),
      })),
  });

  return (
    <Layout>
      <Box sx={{ height: 400, width: '100%', mt: 6 }}>
        <h1
          style={{
            textAlign: 'center',
          }}
        >
          Список отправок
        </h1>
        <DataGrid
          disableColumnSelector={true}
          rows={data || []}
          columns={columns}
          sx={{
            height: '70vh',
            '& .MuiDataGrid-cellCheckbox': {
              display: 'none',
            },
            '& .MuiDataGrid-columnHeaderCheckbox': {
              display: 'none',
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {},
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          disableDensitySelector
          disableColumnFilter
        />
      </Box>
    </Layout>
  );
}
