import { Photo } from "./Photo";

export interface User {
  id: number;
  username: string;
  knownas: string; //not coming
  age: number;
  gender: string;
  created: Date;
  lastActive: Date; //notcoming
  photourl: string; //not coming
  city: string;
  country: string;
  interest?: string; //not coming
  introduction?: string;
  lookingfor?: string; // not coming
  photos?: Photo[]; // not coming/
}
