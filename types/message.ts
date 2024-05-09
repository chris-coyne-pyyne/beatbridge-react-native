export type Message = {
  id: string;
  sender?: {
    id: string;
    email: string;
    name: string;
  };
  receiver?: {
    id: string;
    email: string;
    name: string;
  };
  title: string;
  message: string;
};
