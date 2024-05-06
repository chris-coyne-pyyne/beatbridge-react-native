/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
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
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './screens/Home/Homepage';
import {LoginScreen} from './screens/Login/LoginPage';
import {SignupScreen} from './screens/Signup/SignupPage';
import {NewEventScreen} from './screens/NewEvent/NewEventScreen';
import {globalStyles} from './styles/Styles';
import {QueryClient, QueryClientProvider} from 'react-query';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'orange'}}
      contentContainerStyle={{paddingHorizontal: 12, paddingVertical: 16}}
      text1Style={{
        fontSize: 24,
        fontWeight: '400',
      }}
      text2Style={{
        fontSize: 16,
        fontWeight: '400',
      }}
    />
  ),
};

const queryClient = new QueryClient();
/*
import {
  Button,
  type EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
*/

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  Bridgefy,
  BridgefyEvents,
  BridgefyTransmissionModeType,
} from 'bridgefy-react-native';
import * as RNPermissions from 'react-native-permissions';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {EventScreen} from './screens/Event/Event';
import {NewNotificationScreen} from './screens/NewNotification/NewNotificationPage';
import {AppProvider} from './stores/store';

let bridgefy = new Bridgefy();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  const [logText, setLog] = useState<string>('');
  const userId = useRef<string>('');
  const scrollViewLogs = useRef<ScrollView>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  console.log('initialized ', initialized);

  /*
  const log = (event: string, body: any, error = false) => {
    setLog(`${logText}${event} ${JSON.stringify(body)}\n`);
    scrollViewLogs.current?.scrollToEnd();
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

    subscriptions.push(
      eventEmitter.addListener(BridgefyEvents.bridgefyDidStart, event => {
        userId.current = event.userId;
        log(`bridgefyDidStart`, event);
        bridgefy.isStarted().then(value => {
          setStarted(value);
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
        setStarted(false);
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
      // Initialize Bridgefy using our API key.
      bridgefy
        .initialize('355b1a15-76c0-4c4f-8f65-fbb1e08458eb', true)
        .then(() => {
          bridgefy
            .isInitialized()
            .then(value => {
              setInitialized(value);
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
      bridgefy.stop();
      bridgefy = null;
    };
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View>
          <Button
            disabled={!initialized || started}
            title="Start"
            onPress={() =>
              bridgefy.start().catch(error => {
                log(`Started error`, error.message, true);
              })
            }
          />
          <Button
            disabled={!initialized || !started}
            title="Stop"
            onPress={() =>
              bridgefy.stop().catch(error => {
                log(`Stopped error`, error.message, true);
              })
            }
          />
          <Button
            title="Send data"
            disabled={initialized && !started}
            onPress={() =>
              bridgefy
                .send('Hello world', {
                  type: BridgefyTransmissionModeType.broadcast,
                  uuid: userId.current,
                })
                .then(result => {
                  log(`Sent message`, result);
                })
            }
          />
          <Button
            title="Bridgefy Details"
            disabled={initialized && !started}
            onPress={async () => {
              try {
                const connectedPeers = await bridgefy.connectedPeers();
                console.log('connected peers ', connectedPeers);
                console.log('xyz');
                const currentUser = await bridgefy.currentUserId();
                console.log('current user ', currentUser);
                console.log('HERE ');
              } catch (e) {
                console.log('ERROR ', e);
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  */

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Event" component={EventScreen} />
            <Stack.Screen name="NewEvent" component={NewEventScreen} />
            <Stack.Screen
              name="NewNotification"
              component={NewNotificationScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

export default App;

/*
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next: abc
          </Section>
          <Section title="HELLO">Is initialized: {initialized}</Section>
          <LearnMoreLinks />
        </View>
        <View style={styles.buttonBar}>
          <Button
            disabled={!initialized || started}
            title="Start"
            onPress={() =>
              bridgefy.start().catch(error => {
                log(`Started error`, error.message, true);
              })
            }
          />
          <Button
            disabled={!initialized || !started}
            title="Stop"
            onPress={() =>
              bridgefy.stop().catch(error => {
                log(`Stopped error`, error.message, true);
              })
            }
          />
          <Button
            title="Send data"
            disabled={initialized && !started}
            onPress={() =>
              bridgefy
                .send('Hello world', {
                  type: BridgefyTransmissionModeType.broadcast,
                  uuid: userId.current,
                })
                .then(result => {
                  log(`Sent message`, result);
                })
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  */
