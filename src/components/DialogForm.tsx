import React, { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import { useForm } from 'react-hook-form';
import { Box, Button, DialogContent, TextField, Typography } from '@mui/material';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { OrderService } from '@/api/order.service';
import { useMutation } from 'react-query';

const DialogForm: FC<{
  order: IOrder;
  open: boolean;
  data: any;
  productFields: any;
  refetch: () => void;
  handleClose: () => void;
}> = ({ order, open, productFields, data, handleClose, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      phone_number: order.phone_number,
      address_type: order.address_type,
      status: order.status,
      quantity: Number(order.quantity),
      product: order.product,
    },
  });

  const { mutateAsync } = useMutation('create order', ({ id, data }: { id: number; data: any }) =>
    OrderService.update(id, data),
  );

  const submit = async (data: any) => {
    await mutateAsync({ id: order.id as any, data });
    await refetch();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            width: '400px',
            maxWidth: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '100%',
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
                width: '100%',
                maxWidth: '100%',
              }}
            >
              <span
                style={{
                  zIndex: 1000,
                }}
              >
                {' '}
                <AsyncSelect
                  defaultValue={{
                    label: order?.product?.name,
                    value: order?.product?.id,
                  }}
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
                    // @ts-ignore
                    setValue('product', {
                      // @ts-ignore
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
                  defaultValue={{
                    label:
                      order?.address_type === 'kz'
                        ? 'Казахстан'
                        : order?.address_type === 'ru'
                        ? 'Россия'
                        : 'Узбекистан',
                    value: order?.address_type,
                  }}
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
                  defaultValue={{
                    label:
                      order?.status === 'avia'
                        ? 'Авиа'
                        : order?.status === 'train'
                        ? 'Авто'
                        : 'Камаз',
                    value: order?.status,
                  }}
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
                Изменить
              </Button>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogForm;
