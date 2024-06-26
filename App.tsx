/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './screens/Home/Homepage';
import {LoginScreen} from './screens/Login/LoginPage';
import {SignupScreen} from './screens/Signup/SignupPage';
import {NewEventScreen} from './screens/Event/NewEvent/NewEventScreen';
import {QueryClient, QueryClientProvider} from 'react-query';
import Toast, {BaseToast, BaseToastProps} from 'react-native-toast-message';
import {ProfileScreen} from './screens/Profile/ProfileScreen';
import {BridgefyProvider} from './stores/bridgefyStore';
import {Provider as PaperProvider, IconButton} from 'react-native-paper';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {EventScreen} from './screens/Event/Event';
import {NewNotificationScreen} from './screens/Notifications/NewNotification/NewNotificationPage';
import {AppProvider} from './stores/store';
import {NewReportPage} from './screens/Reports/NewReport/NewReportPage';

import {DefaultTheme} from 'react-native-paper';
import {IntroScreen} from './screens/Intro/Intro';
import {MessageBoardScreen} from './screens/MessageBoard/MessageBoardPage';
import {NewMessagePage} from './screens/Messages/NewMessage/NewMessagePage';
import {ReportsPage} from './screens/Reports/ReportsPage';
import {MessagesPage} from './screens/Messages/Messages';
import {RootStackParamList} from './types/nav';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'green'}}
      contentContainerStyle={{paddingHorizontal: 12, paddingVertical: 16}}
      text1Style={{
        fontSize: 20,
        fontWeight: '400',
      }}
      text2Style={{
        fontSize: 16,
        fontWeight: '400',
      }}
    />
  ),
  info: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'yellow'}}
      contentContainerStyle={{paddingHorizontal: 12, paddingVertical: 16}}
      text1Style={{
        fontSize: 20,
        fontWeight: '400',
      }}
      text2Style={{
        fontSize: 16,
        fontWeight: '400',
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'red'}}
      contentContainerStyle={{paddingHorizontal: 12, paddingVertical: 16}}
      text1Style={{
        fontSize: 20,
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

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#0077b6', // A strong blue, suitable as the primary color.
      accent: '#03a9f4', // A lighter, vibrant blue for accentuating elements.
      surfaceVariant: '#ededed', // A very light cyan, works well for surfaces and variants.
      primaryContainer: '#bbdefb', // A light blue, good for containers of primary elements.
      onPrimaryContainer: '#003c8f', // A dark blue that contrasts well on primary containers.
      secondaryContainer: '#b3e5fc', // Another light blue, slightly different for secondary containers.
      onSecondaryContainer: '#002171', // A very dark blue, providing high contrast on secondary containers.
      elevation: {
        level0: 'white',
        level1: 'white',
        level2: 'white',
        level3: 'white',
        level4: 'white',
        level5: 'white',
      },
    },
  };

  // reference theme
  /*
  const theme = {
    ...DefaultTheme,
    colors: {
      primary: 'rgb(255, 255, 0)',
      onPrimary: 'rgb(255, 255, 0)',
      primaryContainer: 'rgb(255, 255, 0)',
      onPrimaryContainer: 'rgb(255, 255, 0)',
      secondary: 'rgb(255, 255, 0)',
      onSecondary: 'rgb(255, 255, 0)',
      secondaryContainer: 'rgb(255, 255, 0)',
      onSecondaryContainer: 'rgb(255, 255, 0)',
      tertiary: 'rgb(255, 255, 0)',
      onTertiary: 'rgb(255, 255, 0)',
      tertiaryContainer: 'rgb(255, 255, 0)',
      onTertiaryContainer: 'rgb(255, 255, 0)',
      error: 'rgb(255, 255, 0)',
      onError: 'rgb(255, 255, 0)',
      errorContainer: 'rgb(255, 255, 0)',
      onErrorContainer: 'rgb(255, 255, 0)',
      background: 'rgb(255, 255, 0)',
      onBackground: 'rgb(255, 255, 0)',
      surface: 'rgb(255, 255, 0)',
      onSurface: 'rgb(255, 255, 0)',
      surfaceVariant: 'rgb(255, 255, 0)',
      onSurfaceVariant: 'rgb(255, 255, 0)',
      outline: 'rgb(255, 255, 0)',
      outlineVariant: 'rgb(255, 255, 0)',
      shadow: 'rgb(255, 255, 0)',
      scrim: 'rgb(255, 255, 0)',
      inverseSurface: 'rgb(255, 255, 0)',
      inverseOnSurface: 'rgb(255, 255, 0)',
      inversePrimary: 'rgb(255, 255, 0)',
      elevation: {
        level0: 'rgb(255, 255, 0)',
        level1: 'rgb(255, 255, 0)',
        level2: 'rgb(255, 255, 0)',
        level3: 'rgb(255, 255, 0)',
        level4: 'rgb(255, 255, 0)',
        level5: 'rgb(255, 255, 0)',
      },
    },
  };
  */

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BridgefyProvider>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={({navigation, route}) => {
                  const isIntro: boolean = route.name === 'Intro';
                  return {
                    // Conditionally set the header style and header right component
                    headerStyle: {backgroundColor: '#fff'}, // Apply no style if it's 'Intro'
                    headerRight: () => (
                      <IconButton
                        icon="account"
                        onPress={() => navigation.navigate('Profile')}
                      />
                    ),
                    // You might want to also control the visibility of the header
                    headerShown: !isIntro, // Hide the header completely if it's 'Intro'
                  };
                }}>
                <Stack.Screen name="Intro" component={IntroScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                  name="Signup"
                  component={SignupScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen name="Event" component={EventScreen} />
                <Stack.Screen name="NewEvent" component={NewEventScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="NewReport" component={NewReportPage} />
                <Stack.Screen
                  name="NewNotification"
                  component={NewNotificationScreen}
                />
                <Stack.Screen
                  name="MessageBoard"
                  component={MessageBoardScreen}
                />
                <Stack.Screen name="NewMessage" component={NewMessagePage} />
                <Stack.Screen name="Messages" component={MessagesPage} />
                <Stack.Screen name="Reports" component={ReportsPage} />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </BridgefyProvider>
      </AppProvider>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

export default App;
