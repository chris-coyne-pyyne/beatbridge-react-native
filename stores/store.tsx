// Context/store.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import {Notification} from '../types/notification';
import {User} from '../types/user';
import {Event} from '../types/event';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Message} from '../types/message';

// Define an interface for your global state
interface GlobalState {
  user: User | null;
  userLoading: boolean;
  notifications: Notification[];
  events: Event[];
  messages: Message[];
}

// Define the context type
interface AppContextType {
  globalState: GlobalState;
  updateGlobalState: any;
}

// Create the context
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    user: null,
    userLoading: true,
    notifications: [],
    events: [],
    messages: [],
  });

  // TODO: turn useeffects into custom, reusable hooks
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        console.log('stored user ', storedUser);
        if (storedUser) {
          setGlobalState(prevState => ({
            ...prevState,
            user: JSON.parse(storedUser),
          }));
        } else {
          setGlobalState(prevState => ({
            ...prevState,
            user: null,
          }));
        }
        // set loading to false for user
        setGlobalState(prevState => ({
          ...prevState,
          userLoading: false,
        }));
      } catch (error) {
        console.error('Failed to load user from AsyncStorage', error);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    const loadMessagesData = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem('messages');
        console.log('stored messages ', storedMessages);
        if (storedMessages && storedMessages.length) {
          setGlobalState(prevState => ({
            ...prevState,
            events: JSON.parse(storedMessages),
          }));
        } else {
          setGlobalState(prevState => ({
            ...prevState,
            messages: [],
          }));
        }
      } catch (error) {
        console.error('Failed to load messages from AsyncStorage', error);
      }
    };

    loadMessagesData();
  }, []);

  useEffect(() => {
    const loadEventsData = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem('events');
        console.log('stored events ', storedEvents);
        if (storedEvents && storedEvents.length) {
          setGlobalState(prevState => ({
            ...prevState,
            events: JSON.parse(storedEvents),
          }));
        } else {
          setGlobalState(prevState => ({
            ...prevState,
            events: [],
          }));
        }
      } catch (error) {
        console.error('Failed to load user from AsyncStorage', error);
      }
    };

    loadEventsData();
  }, []);

  useEffect(() => {
    const loadNotificationsData = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        console.log('stored notifications ', storedNotifications);
        if (storedNotifications && storedNotifications.length) {
          setGlobalState(prevState => ({
            ...prevState,
            notifications: JSON.parse(storedNotifications),
          }));
        } else {
          setGlobalState(prevState => ({
            ...prevState,
            notifications: [],
          }));
        }
      } catch (error) {
        console.error('Failed to load notifications from AsyncStorage', error);
      }
    };

    loadNotificationsData();
  }, []);

  const updateGlobalState = (newState: Partial<GlobalState>) => {
    setGlobalState(prevState => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <AppContext.Provider value={{globalState, updateGlobalState}}>
      {children}
    </AppContext.Provider>
  );
};
