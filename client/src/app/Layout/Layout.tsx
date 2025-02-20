import { refreshTokensThunk } from "@/entities/user/api";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";


import { JSX, useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function Layout(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshTokensThunk());
  }, [dispatch]);

  return (
    <>
  
      <main>
        <Outlet />
      </main>
    </>
  );
}
