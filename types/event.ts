export type BandSet = {
  startTime: string;
  endTime: string;
  player: string;
  date: string;
};

export type Event = {
  id: string;
  organizer?: {
    id: string;
    email: string;
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
  itinerary: BandSet[];
};
