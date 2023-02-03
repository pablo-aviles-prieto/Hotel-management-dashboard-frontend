export interface IUserData {
  contact: string;
  email: string;
  password?: string;
  job?: { position?: string; description?: string; schedule?: string };
  name: string;
  photo: File | string | null;
  status: string;
  [key: string]: any;
}
