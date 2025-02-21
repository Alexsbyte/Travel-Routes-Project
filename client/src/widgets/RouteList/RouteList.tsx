import React, { useEffect } from 'react';
import { getAllRoutesThunk, RouteItem } from '@/entities/route';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';

export function RouteList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const routes = useAppSelector((store) => store.route.routes);

  useEffect(() => {
    dispatch(getAllRoutesThunk());
  }, [dispatch]);

  return (
    <>
      {routes.map((route) => (
        <RouteItem key={route.id} route={route} />
      ))}
    </>
  );
}