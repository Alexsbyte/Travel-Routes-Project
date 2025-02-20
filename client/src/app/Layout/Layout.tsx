import { Footer } from '@/widgets';
import { Header } from '@/widgets';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { refreshTokensThunk } from "@/entities/user/api";
import { JSX, useEffect } from "react";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";

export default function Layout(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshTokensThunk());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
