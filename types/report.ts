import {BridgefyData} from './bridgefyData';

export interface Report extends BridgefyData {
  sender?: {
    id: string;
    email: string;
    name: string;
  };
  message: string;
  date: number;
  mode: 'report';
}
