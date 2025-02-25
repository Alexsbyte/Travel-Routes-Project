import { IPoint } from "@/entities/point/model";

export type RawRouteData = {
  title: string;
  description: string;
  category: string | 'автомобильный' | 'пеший' | 'велосипедный';
};

type Photo = { url: string };



export type Route = {
  id: number;
  user_id: number;
  user: { username: string; email: string };
  photos: Photo[];
  points: IPoint[];
  createdAt: string;
  updatedAt: string;
} & RawRouteData;

export type ArrayRoutesType = Route[];
