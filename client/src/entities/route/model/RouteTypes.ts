export type RawRouteData = {
  title: string;
  description: string;
  category: string | 'автомобильный' | 'пеший' | 'велосипедный';
};

type Photo = { url: string };

type Point = {
  description: string;
  latitude: number;
  longitude: number;
};

export type Route = {
  id: number;
  user_id: number;
  user: { username: string; email: string };
  photos: Photo[];
  points: Point;
  createdAt: string;
  updatedAt: string;
} & RawRouteData;

export type ArrayRoutesType = Route[];
