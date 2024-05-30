export type RootStackParamList = {
  Home: undefined;
  Intro: undefined;
  Signup: undefined;
  Login: undefined;
  Event: {id: string};
  NewEvent: undefined;
  Profile: undefined;
  NewReport: undefined;
  NewNotification: undefined;
  MessageBoard: undefined;
  NewMessage: undefined;
  Messages: {messageType: 'Board' | 'Alerts' | 'Reports'};
  Reports: undefined;
};
