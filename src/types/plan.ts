export type Plan = {
  id: number;
  name: string;
  days: number;
  total_classes: number;
  created_at: string;
  price: number;
  unlimited: boolean;
};

export type CreatePlan = {
  name: string;
  days: number;
  total_classes: number;
  price: number;
  unlimited: boolean;
};

export type UpdatePlan = CreatePlan;
