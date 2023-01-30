export interface IUserObj {
  id: string;
  photo: string;
  name: string;
  email: string;
  password: string;
  startDate: string;
  job: { position?: string; description?: string; schedule?: string };
  contact: string;
  status: string;
}
