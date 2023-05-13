import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const Home = () => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h2" fontWeight={600}>
        Логистика
      </Typography>
      <Typography variant="h6">Добро пожаловать в систему управления перевозками</Typography>
      <br />
      <br />
      <Button
        onClick={() => {
          router.push('/product-types');
        }}
        color="info"
        variant="contained"
        size="large"
      >
        Вход в кабинет учета
      </Button>
    </Box>
  );
};

export default Home;
