export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          days_available: number;
          plan_type: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          days_available?: number;
          plan_type: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          days_available?: number;
          plan_type?: string;
        };
      };
    };
  };
};

export type Client = Database['public']['Tables']['clients']['Row'];
