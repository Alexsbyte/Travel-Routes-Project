import { Footer } from '@/widgets';
import { Header } from '@/widgets';
import { Outlet, useLocation } from 'react-router-dom';
import { refreshTokensThunk } from "@/entities/user/api";
import { JSX, useEffect } from "react";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { clearPoints } from '@/entities/point';

export default function Layout(): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshTokensThunk());
  }, [dispatch]);

  

  useEffect(() => {
    dispatch(clearPoints());
  }, [location.pathname]);
  
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
