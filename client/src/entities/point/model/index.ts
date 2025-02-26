export type Point = {
    id: number;
    route_id: number;
    description: string;
    latitude: number;
    longitude: number;
  };
  
// Определяем типы данных
export interface IPoint {
  id: number;
  latitude: number;
  longitude: number;
  description: string | null;
}
