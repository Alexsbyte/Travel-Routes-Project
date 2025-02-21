import React, { useEffect } from 'react';
import style from './RouteList.module.css';
import { getAllRoutesThunk, RouteItem } from '@/entities/route';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';

export function RouteList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const routes = useAppSelector((store) => store.route.routes);

  useEffect(() => {
    dispatch(getAllRoutesThunk());
  }, [dispatch]);

  return (
    <div className={style.list}>
      {routes.map((route) => (
        <RouteItem key={route.id} route={route} />
      ))}
    </div>
  );
}
