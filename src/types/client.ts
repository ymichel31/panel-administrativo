export type Client = {
  id: number;
  dni: number;
  email: string;
  phone: string;
  status: string;
  end_date: string;
  is_active: boolean;
  last_name: string;
  plan_id: number;
  plan_name: string;
  first_name: string;
  start_date: string;
  classes_used: number;
  classes_remaining: number;
};

export type CreateClient = {
  first_name: string;
  last_name: string;
  email: string;
  dni: number;
  phone: string;
  plan_id: number;
};

export type UpdateClient = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  plan_id: number;
  dni: number;
};
