export type RawRouteData = {
  title: string;
  description: string;
  category: string | 'автомобильный' | 'пеший' | 'велосипедный';
};

export type Route = {
  id: number;
  user_id: number;
  user: { username: string; email: string };
  createdAt: string;
  updatedAt: string;
} & RawRouteData;

export type ArrayRoutesType = Route[];
