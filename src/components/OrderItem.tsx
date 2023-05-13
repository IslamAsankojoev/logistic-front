import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { animated } from 'react-spring';
import DialogForm from './DialogForm';
import { currency } from '@/constants';

const OrderItem: FC<{
  order: IOrder;
  handleDeleteOrder: any;
  refetch: () => void;
  data: any;
  productFields: any;
}> = ({ order, handleDeleteOrder, refetch, data, productFields }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <animated.div
        key={order.id}
        style={{
          width: '90%',
        }}
      >
        <Card
          sx={{
            padding: '1rem',
            width: '90%',
          }}
        >
          <Stack direction="column" gap={1}>
            <Grid container>
              <Grid item xs={8}>
                <Typography>
                  <b>Товар</b> - {order.product.name}
                </Typography>
                <Typography>
                  <b>Адрес</b> -{' '}
                  {(order.address_type === 'kz' && 'Казахстан') ||
                    (order.address_type === 'ru' && 'Россия') ||
                    (order.address_type === 'uz' && 'Узбекистан')}
                </Typography>
                <Typography>
                  <b>Номер</b> - {order.phone_number}
                </Typography>
                <Typography>
                  <b>Метод доставки</b> - {order.status}
                </Typography>
                <Typography>
                  <b>Вес, кг</b> - {order.quantity}
                </Typography>
                <Typography>
                  <b>Выезд</b> - {new Date(order.date as any).toDateString()}
                </Typography>
                <Typography>
                  <b>Дата доставки</b> - {new Date(order.date_end as any).toDateString()}
                </Typography>

                <Typography>
                  <b>Сумма</b> - {order?.total_price + ' ' + currency || ''}
                </Typography>
                <Typography>
                  <b>Статус</b> -{' '}
                  <Box
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      backgroundColor: order.date_status === 'now' ? 'orange' : 'greenyellow',
                      display: 'inline-block',
                    }}
                  >
                    {order.date_status}
                  </Box>
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Изменить
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    handleDeleteOrder(order?.id as any);
                  }}
                >
                  Удалить
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Card>
        <Box
          sx={{
            padding: '1rem',
            width: '90%',
          }}
        >
          <DialogForm
            handleClose={handleClose}
            order={order}
            open={open}
            productFields={productFields}
            data={data}
            refetch={refetch}
          />
        </Box>
      </animated.div>
    </>
  );
};

export default OrderItem;
