export interface Invitation {
  id: string;
  email: string;
  status: string;
  createdAt: string;
  groupe: {
    id: string;
    name: string;
  };
}
