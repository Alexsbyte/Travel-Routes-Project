import { Footer } from '@/widgets';
import { Header } from '@/widgets';
import React from 'react';
import { Outlet } from 'react-router-dom';

export function Layout(): React.JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
