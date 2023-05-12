import { ProductService } from '@/api/product.service';
import Layout from '@/components/Layout/Layout';
import { Box, Button, Card, Grid, Stack, TextField, Typography, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { OrderService } from '@/api/order.service';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import DialogForm from '@/components/DialogForm';
import OrderItem from '@/components/OrderItem';

const CreateDelivery = () => {
  const [parent, enableAnimations] = useAutoAnimate();
  const { data } = useQuery('products', ProductService.find, {
    select: ({ data }: { data: IProduct[] }) => data,
  });
  const { data: Orders, refetch } = useQuery('orders', OrderService.find, {
    select: ({ data }: { data: IOrder[] }) => data,
  });

  const productFields = data?.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  const { mutateAsync: createOrderAsync } = useMutation('create order', OrderService.create, {
    onSettled: () => {
      refetch();
    },
  });

  const [defaultOrder, setDefaultOrder] = React.useState<IOrder>({
    product: {
      name: '',
      price: '',
      description: '',
    },
    quantity: '',
    address_type: 'kz',
    status: 'avia',
    phone_number: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    defaultValues: defaultOrder,
  });

  const submit = async (dataFields: any) => {
    createOrderAsync(dataFields);
  };

  const handleDeleteOrder = async (id: number) => {
    await OrderService.delete(id);
    refetch();
  };

  return (
    <Layout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt={4}
        // height="80vh"
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <Box
              sx={{
                width: '90%',
                maxWidth: '90%',
                margin: '0 auto',
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <h1>Отправка товара</h1>
              <form
                onSubmit={handleSubmit(submit)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  width: '90%',
                  maxWidth: '90%',
                }}
              >
                <span
                  style={{
                    zIndex: 1000,
                  }}
                >
                  {' '}
                  <AsyncSelect
                    defaultOptions={productFields}
                    options={productFields}
                    placeholder="Выберите товар"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        height: '56px',
                      }),
                    }}
                    {...register('product', { required: true })}
                    onChange={(e) => {
                      setValue('product', {
                        ...(data?.find((el) => el?.id === e?.value) as IProduct),
                      });
                      trigger('product');
                    }}
                  />
                  <Typography color="error">
                    {errors.product && 'Товар обязателен для заполнения'}
                  </Typography>
                </span>
                <TextField
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  label="Номер телефона"
                  {...register('phone_number', { required: true })}
                />
                <Typography color="error">
                  {errors.phone_number && 'Номер телефона обязателен для заполнения'}
                </Typography>
                <span
                  style={{
                    zIndex: 100,
                  }}
                >
                  <Select
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        height: '56px',
                      }),
                    }}
                    options={[
                      { value: 'kz', label: 'Казахстан' },
                      { value: 'ru', label: 'Россия' },
                      { value: 'uz', label: 'Узбекистан' },
                    ]}
                    {...register('address_type', { required: true })}
                    placeholder="Выберите адрес"
                    onChange={(e) => {
                      setValue('address_type', e?.value as any);
                      trigger('address_type');
                    }}
                  />
                </span>
                <Typography color="error">
                  {errors?.address_type && 'Адрес обязателен для заполнения'}
                </Typography>
                <span
                  style={{
                    zIndex: 10,
                  }}
                >
                  <Select
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        height: '56px',
                      }),
                    }}
                    options={[
                      { value: 'avia', label: 'Авиа' },
                      { value: 'train', label: 'Авто' },
                      { value: 'track', label: 'Камаз' },
                    ]}
                    {...register('status', { required: true })}
                    placeholder="Выберите адрес"
                    onChange={(e) => {
                      setValue('status', e?.value as any);
                      trigger('status');
                    }}
                  />
                </span>
                <Typography color="error">
                  {errors.status && 'Метод доставки обязателен для заполнения'}
                </Typography>
                <TextField
                  label="Вес, кг"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  {...register('quantity', { required: true })}
                />
                <Typography color="error">
                  {errors.quantity && 'Вес обязателен для заполнения'}
                </Typography>
                <Button type="submit" variant="contained" size="large">
                  Отправить
                </Button>
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{}}>
              <h1>Список товаров</h1>

              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
                sx={{
                  width: '90%',
                  padding: '10px',
                }}
                ref={parent}
              >
                {!!Orders?.length &&
                  Orders?.map((order: IOrder) => {
                    return (
                      <OrderItem
                        data={data}
                        handleDeleteOrder={handleDeleteOrder}
                        order={order}
                        productFields={productFields}
                        refetch={refetch}
                      />
                    );
                  })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default CreateDelivery;
