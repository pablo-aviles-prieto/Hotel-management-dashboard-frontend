export interface IRoomData {
  photo: File | string | null;
  roomName: string;
  roomNumber: number;
  roomType: string;
  roomFloor: string;
  bedType: string;
  roomDiscount: number;
  ratePerNight: number;
  roomDescription?: string;
  facilities: string[];
  status: string;
  checkOffer: boolean;
  [key: string]: any;
}
