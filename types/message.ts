import {BridgefyData} from './bridgefyData';

export interface Message extends BridgefyData {
  sender?: {
    id: string;
    email: string;
    name: string;
  };
  receiver?: {
    id: string;
  };
  title: string;
  message: string;
  date: number;
}
