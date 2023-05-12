import React, { FC, ReactNode } from 'react';
import Header from '../Header';
import { Container } from '@mui/material';

const Layout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
