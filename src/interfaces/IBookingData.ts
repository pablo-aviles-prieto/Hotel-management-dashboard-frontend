export interface IBookingData {
  bookingNumber: number;
  userName: string;
  checkIn: string;
  checkOut: string;
  specialRequest?: string;
  status: string;
  [key: string]: any;
}
