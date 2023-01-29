import { IRoomObj } from './IRoomObj';

export interface IBookingObj {
  id: string;
  bookingNumber: number;
  userName: string;
  orderDate: string;
  checkIn: string;
  checkOut: string;
  specialRequest: string;
  status: string;
  roomId: IRoomObj;
}
