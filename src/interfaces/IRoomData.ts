export interface IRoomData {
  photo: string | FileList | FileList[] | null;
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
