export type Client = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  plan_id: number | null;
  code: string;
  created_at?: string;
  updated_at?: string;
};

export type ClientForm = Omit<Client, 'id' | 'created_at' | 'updated_at'>;
