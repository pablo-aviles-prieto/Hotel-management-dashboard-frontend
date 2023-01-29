export interface IContactObj {
  id: string;
  date: string;
  user: { name: string; email: string; phone: string };
  message: { subject: string; body: string };
  rate?: number;
  archived?: boolean;
}
