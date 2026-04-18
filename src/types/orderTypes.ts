
export interface Order {
  id: string;
  created_at: string;
  title: string;
  description: string;
  budget: number;
  stack: string[];
  status: string;
  client_id: string;
  profiles: {
    name: string;
  };
}
