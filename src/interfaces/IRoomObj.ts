export interface IRoomObj {
  id: string;
  photo: string;
  roomNumber: number;
  roomName: string;
  bedType: string;
  roomFloor: string;
  facilities: Array<string>;
  ratePerNight: number;
  roomDescription?: string;
  roomType: string;
  status: string;
  offerPrice: number | null;
}
