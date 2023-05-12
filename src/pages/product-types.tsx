import { ProductService } from '@/api/product.service';
import Layout from '@/components/Layout/Layout';
import { Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useTransition, animated } from 'react-spring';

const ProductTypes = () => {
  const [parent, enableAnimations] = useAutoAnimate();
  // enableAnimations(true);

  const { data, refetch } = useQuery('productTypes', ProductService.find, {
    select: ({ data }: { data: IProduct[] }) => data.reverse(),
  });

  const transitions = useTransition(data, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 60 },
    leave: { opacity: 0, height: 0 },
    config: { duration: 200 },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync } = useMutation('create product type', ProductService.create, {
    onSuccess: () => {
      refetch();
    },
  });

  const onSubmit = async (data: any) => {
    await mutateAsync(data);
  };

  const handleProductTypeDelete = async (id: number) => {
    // enableAnimations(false);
    await ProductService.delete(id);
    refetch();
  };

  return (
    <Layout>
      <Grid
        container
        sx={{
          '& h1': {
            margin: '5px!important',
          },
        }}
        mt={4}
      >
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <Box display="flex" flexDirection="column" gap={2} alignItems="center">
            <h1>Создать товар</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5rem',
                maxWidth: '100%',
                width: '400px',
              }}
            >
              <TextField
                label="Название"
                variant="outlined"
                {...register('name', { required: true })}
              />
              <Typography color="error">
                {errors.name?.type === 'required' && 'Поле "Название" обязательно для заполнения'}
              </Typography>
              <TextField
                label="Описание"
                variant="outlined"
                rows={4}
                multiline
                {...register('description', { required: true })}
              />
              <Typography color="error">
                {errors.description?.type === 'required' &&
                  'Поле "Описание" обязательно для заполнения'}
              </Typography>
              <TextField
                label="Цена"
                variant="outlined"
                type="number"
                {...register('price', { required: true, valueAsNumber: true })}
              />
              <Typography color="error">
                {errors.price?.type === 'required' && 'Поле "Цена" обязательно для заполнения'}
              </Typography>
              <Button type="submit" variant="contained">
                Создать
              </Button>
            </form>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          lg={7}
          sx={{
            '@media (max-width: 661px)': {
              marginTop: '40px!important',
            },
          }}
        >
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
              {!!data?.length &&
                data?.map((productType: IProduct) => (
                  <animated.div
                    key={productType.id}
                    style={{
                      width: '100%',
                    }}
                  >
                    <Card
                      sx={{
                        padding: '1rem',
                        width: '100%',
                      }}
                    >
                      <Stack direction="column" gap={1}>
                        <Grid container>
                          <Grid item xs={8}>
                            <Typography>
                              <b>Название</b> - {productType.name}
                            </Typography>
                            <Typography>
                              <b>Описание</b> - {productType.description}
                            </Typography>
                            <Typography>
                              <b> Цена</b> - {productType.price}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                          >
                            <Button
                              onClick={() => {
                                handleProductTypeDelete(productType?.id as any);
                              }}
                              variant="contained"
                              color="error"
                              sx={{
                                '&:hover': {
                                  boxShadow: 'none',
                                },
                                boxShadow: 'none',
                              }}
                            >
                              Удалить
                            </Button>
                          </Grid>
                        </Grid>
                      </Stack>
                    </Card>
                  </animated.div>
                ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ProductTypes;
