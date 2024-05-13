export type Notification = {
  id: string;
  message: string;
  title: string;
  tags: string[];
  date: number;
  mode: 'notification';
};
