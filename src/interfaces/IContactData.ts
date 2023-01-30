export interface IContactMessage {
  body: string;
  subject: string;
  [key: string]: any;
}

export interface IContactUser {
  email: string;
  name: string;
  phone: string;
  [key: string]: any;
}
