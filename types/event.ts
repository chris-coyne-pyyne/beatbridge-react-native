export type Event = {
  id: string;
  organizer: {
    id: string; // same as email, for convenience
    name: string;
    pic: string;
  };
  pic: string;
  name: string;
  description: string;
  genre: string;
  active: boolean;
  startDate: string;
  endDate: string;
};
