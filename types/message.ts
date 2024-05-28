import {BridgefyData} from './bridgefyData';

export interface Message extends BridgefyData {
  sender?: {
    id: string;
    email: string;
    name: string;
  };
  message: string;
  date: number;
  mode: 'message';
}
