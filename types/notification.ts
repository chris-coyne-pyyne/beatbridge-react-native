import {BridgefyData} from './bridgefyData';

export interface Notification extends BridgefyData {
  message: string;
  title: string;
  tags: string[];
  date: number;
  mode: 'notification';
}
