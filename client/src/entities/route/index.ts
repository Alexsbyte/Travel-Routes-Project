
export type { RawRouteData, Route, ArrayRoutesType } from './model';
export { routeReducer } from './slice';
export {
  createRouteThunk,
  deleteRouteThunk,
  getAllRoutesThunk,
  updateRouteThunk,
} from './api';
export { RouteItem } from './ui/RouteItem/RouteItem';