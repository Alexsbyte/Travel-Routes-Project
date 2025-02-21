export type RawRouteData = {
  title: string;
  description: string;
  category: 'автомобильный' | 'пеший' | 'велосипедный';
};

export type Route = {
  id: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
} & RawRouteData;

export type ArrayRoutesType = Route[];
