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

// Define an interface for your global state
interface GlobalState {
  user: User | null | 'loading';
  notifications: Notification[];
  events: Event[];
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
    user: 'loading',
    notifications: [],
    events: [],
  });

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
      } catch (error) {
        console.error('Failed to load user from AsyncStorage', error);
      }
    };

    loadUserData();
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
