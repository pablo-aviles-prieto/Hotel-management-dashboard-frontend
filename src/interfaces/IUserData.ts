export interface IUserData {
  contact: string;
  email: string;
  password?: string;
  job?: { position?: string; description?: string; schedule?: string };
  name: string;
  photo: string | FileList | FileList[] | null;
  status: string;
  [key: string]: any;
}
