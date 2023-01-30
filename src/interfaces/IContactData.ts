export interface IContactData {
  archived: string;
  date?: string;
  id?: string;
  message: {
    body: string;
    subject: string;
  };
  user: {
    email: string;
    name: string;
    phone: string;
  };
  [key: string]: any;
}
