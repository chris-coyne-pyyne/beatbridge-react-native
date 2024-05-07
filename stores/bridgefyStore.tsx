// Context/store.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import {
  Bridgefy,
  BridgefyEvents,
  BridgefyTransmissionModeType,
} from 'bridgefy-react-native';
import * as RNPermissions from 'react-native-permissions';

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

  const log = (event: string, body: any, error = false) => {
    if (error) {
      console.error(event, body);
    } else {
      console.log(event, body);
    }
  };

  useEffect(() => {
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
