// Context/store.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {Bridgefy, BridgefyEvents} from 'bridgefy-react-native';
import * as RNPermissions from 'react-native-permissions';
import {
  type EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {AppContext} from './store';
import Toast from 'react-native-toast-message';
import {BridgefyData} from '../types/bridgefyData';

const showToast = (title: string, message: string) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
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

  // if initialized - try to start
  useEffect(() => {
    const startUp = async () => {
      if (
        bridgefyState.initialized === true &&
        appContext?.globalState.user?.id
      ) {
        const isStarted = await bridgefy.isStarted();
        console.log('is started ', isStarted);
        if (!isStarted) {
          try {
            console.log('STARTING BRIDGEFY');
            bridgefy.start(appContext?.globalState.user?.id).catch(error => {
              log(`Started error`, error.message, true);
            });
          } catch (e) {
            console.log('failure to start Bridgefy');
          }
        } else {
          console.log('Bridgefy is already started - skipping');
        }
      }
    };
    startUp();
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
        console.log('RECEIVED DATA ');

        // add to DB
        const receivedData: BridgefyData = JSON.parse(event.data);
        if (receivedData.mode === 'message') {
          showToast('Received New Message ', receivedData.message);
          const oldMessages = appContext?.globalState.messages || [];
          const newMessages = [...oldMessages, receivedData];
          appContext?.updateGlobalState({messages: newMessages});
        } else if (receivedData.mode === 'notification') {
          showToast('Received New Notification ', receivedData.message);
          const oldNotifications = appContext?.globalState.notifications || [];
          const newNotifications = [...oldNotifications, receivedData];
          appContext?.updateGlobalState({notifications: newNotifications});
        } else {
          // in this case it is a report
          showToast('Received New Report ', receivedData.message);
          const oldReports = appContext?.globalState.reports || [];
          const newReports = [...oldReports, receivedData];
          appContext?.updateGlobalState({reports: newReports});
        }
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
