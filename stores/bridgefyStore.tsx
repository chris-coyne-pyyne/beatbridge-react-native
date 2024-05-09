// Context/store.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {
  Bridgefy,
  BridgefyEvents,
  BridgefyTransmissionModeType,
} from 'bridgefy-react-native';
import * as RNPermissions from 'react-native-permissions';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  type EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  Touchable,
} from 'react-native';
import {AppContext} from './store';
import Toast from 'react-native-toast-message';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Event} from '../../types/event';
import {generateRandomString} from '../../utils/randomNumber';
import {Notification} from '../types/notification';

const showToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Received New Notification',
    text2: 'message...',
  });
};

// Define an interface for your global state
interface BridgefyState {
  bridgefy: any;
  initialized: boolean;
}

// Define the context type
interface AppContextType {
  bridgefyState: BridgefyState;
  updateBridgefyState: any;
}

// Create the context
export const BridgefyContext = createContext<AppContextType | undefined>(
  undefined,
);

let bridgefy = new Bridgefy();
// Provider component
export const BridgefyProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [bridgefyState, setBridgefyState] = useState<BridgefyState>({
    bridgefy: bridgefy,
    initialized: false,
  });

  const userId = useRef<string>('');

  const appContext = useContext(AppContext);

  console.log('BRIDGEFY USER ', appContext?.globalState.user);

  // if initialized - try to start
  useEffect(() => {
    console.log(
      'should i start?',
      'initialized ',
      bridgefyState.initialized,
      ' , user ',
      appContext?.globalState.user?.id,
    );
    if (
      bridgefyState.initialized === true &&
      appContext?.globalState.user?.id
    ) {
      console.log('STARTING BRIDGEFY');
      bridgefy.start(appContext?.globalState.user?.id).catch(error => {
        log(`Started error`, error.message, true);
      });
    }
  }, [bridgefyState.initialized, appContext?.globalState.user?.id]);

  const log = (event: string, body: any, error = false) => {
    if (error) {
      console.error(event, body);
    } else {
      console.log(event, body);
    }
  };

  useEffect(() => {
    const subscriptions: EmitterSubscription[] = [];
    const eventEmitter = new NativeEventEmitter(
      NativeModules.BridgefyReactNative,
    );
    // subscription for successful notification send
    subscriptions.push(
      eventEmitter.addListener(BridgefyEvents.bridgefyDidStart, event => {
        userId.current = event.userId;
        log(`bridgefyDidStart`, event);
        bridgefy.isStarted().then(value => {
          console.log('bridgefy successfully started');
        });
      }),
    );
    subscriptions.push(
      eventEmitter.addListener(BridgefyEvents.bridgefyDidFailToStart, event => {
        log(`bridgefyDidFailToStart`, event, true);
      }),
    );
    subscriptions.push(
      eventEmitter.addListener(BridgefyEvents.bridgefyDidStop, () => {
        log(`bridgefyDidStop`, 'Bridgefy stopped.');
      }),
    );
    subscriptions.push(
      eventEmitter.addListener(BridgefyEvents.bridgefyDidFailToStop, event => {
        log(`bridgefyDidFailToStop`, event, true);
      }),
    );
    subscriptions.push(
      eventEmitter.addListener(
        BridgefyEvents.bridgefyDidDestroySession,
        event => {
          log(`bridgefyDidDestroySession`, event);
        },
      ),
    );
    subscriptions.push(
      eventEmitter.addListener(
        BridgefyEvents.bridgefyDidFailToDestroySession,
        event => {
          log(`bridgefyDidFailToDestroySession`, event, true);
        },
      ),
    );
    subscriptions.push(
      eventEmitter.addListener(BridgefyEvents.bridgefyDidConnect, event => {
        log(`bridgefyDidConnect`, event);
      }),
    );
    subscriptions.push(
      eventEmitter.addListener(BridgefyEvents.bridgefyDidDisconnect, event => {
        log(`bridgefyDidDisconnect`, event);
      }),
    );
    subscriptions.push(
      eventEmitter.addListener(
        BridgefyEvents.bridgefyDidEstablishSecureConnection,
        event => {
          log(`bridgefyDidEstablishSecureConnection`, event);
        },
      ),
    );
    subscriptions.push(
      eventEmitter.addListener(
        BridgefyEvents.bridgefyDidFailToEstablishSecureConnection,
        event => {
          log(`bridgefyDidFailToEstablishSecureConnection`, event, true);
        },
      ),
    );
    subscriptions.push(
      eventEmitter.addListener(BridgefyEvents.bridgefyDidSendMessage, event => {
        log(`bridgefyDidSendMessage`, event);
      }),
    );
    subscriptions.push(
      eventEmitter.addListener(
        BridgefyEvents.bridgefyDidFailSendingMessage,
        event => {
          log(`bridgefyDidFailSendingMessage`, event, true);
        },
      ),
    );
    subscriptions.push(
      eventEmitter.addListener(BridgefyEvents.bridgefyDidReceiveData, event => {
        log(`bridgefyDidReceiveData`, event);
        showToast();
        // add to DB
        const receivedNotification: Notification = JSON.parse(event.data);
        const oldNotifications = appContext?.globalState.notifications || [];
        const newNotifications = [...oldNotifications, receivedNotification];
        appContext?.updateGlobalState({notifications: newNotifications});
      }),
    );
    subscriptions.push(
      eventEmitter.addListener(
        BridgefyEvents.bridgefyDidSendDataProgress,
        event => {
          log(`bridgefyDidSendDataProgress`, event);
        },
      ),
    );

    RNPermissions.requestMultiple([
      RNPermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      RNPermissions.PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
      RNPermissions.PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      RNPermissions.PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    ]).then(_statuses => {
      console.log('INITIALIZING...');
      // Initialize Bridgefy using our API key.
      bridgefy
        .initialize('355b1a15-76c0-4c4f-8f65-fbb1e08458eb', true)
        .then(() => {
          bridgefy
            .isInitialized()
            .then(value => {
              console.log('SETTING INITIALZE TO TRUE ', value);
              updateBridgefyState({initialized: true});
            })
            .catch(error => {
              log(`isInitialized error`, error.message, true);
            });
        })
        .catch(error => {
          log(`Initialize error`, error.message, true);
        });
    });

    return () => {
      for (const sub of subscriptions) {
        sub.remove();
      }
    };
  }, []);

  const updateBridgefyState = (newState: Partial<BridgefyState>) => {
    setBridgefyState(prevState => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <BridgefyContext.Provider value={{bridgefyState, updateBridgefyState}}>
      {children}
    </BridgefyContext.Provider>
  );
};
