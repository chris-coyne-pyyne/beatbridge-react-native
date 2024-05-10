import {View, Image, StyleSheet} from 'react-native';
// import {Button} from '../../components/Button';
// import {Text} from '../../components/Text';
import useAsyncStorage from '../../hooks/useAsyncStorage';

import {globalStyles} from '../../styles/Styles';
import {User} from '../../types/user';
import {NoEvents} from './NoEvents';
import {Event} from '../../types/event';
import {ActiveEvent} from './ActiveEvent';
import {useContext, useState} from 'react';
import {AppContext, AppProvider} from '../../stores/store';
import {Container} from '../../components/Container';
import {Button, Text} from 'react-native-paper';

export function HomeScreen({navigation}) {
  const context = useContext(AppContext);

  console.log('global state events ', context?.globalState.events);

  const activeEvent = context?.globalState.events
    ? context.globalState.events.find(event => event.active === true)
    : null;

  if (context?.globalState.userLoading === true) {
    return <Text>loading...</Text>;
  }

  if (context?.globalState.user?.email && activeEvent) {
    return <ActiveEvent activeEvent={activeEvent} navigation={navigation} />;
  }

  // return
  if (context?.globalState.user?.email) {
    return <NoEvents navigation={navigation} />;
  }

  if (!context?.globalState.user?.email) {
    /*
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/Home_no_login_background.png')}
          style={{width: 250, height: 250}}
        />
        <View>
          <Text variant="headlineLarge">Beat Bridge</Text>
        </View>
        <View style={styles.view}>
          <Text variant="bodyLarge" style={{textAlign: 'center'}}>
            Feel the music, stay connected – only with Beat Bridge.
          </Text>
        </View>
        <View style={styles.view}>
          <Button
            title="Sign Up"
            mode="contained"
            onPress={() => navigation.navigate('Signup')}>
            Sign Up
          </Button>
        </View>
        <View style={styles.view}>
          <Button
            type="outlined"
            title="Log In"
            mode="outlined"
            onPress={() => navigation.navigate('Login')}>
            Log In
          </Button>
        </View>
      </View>
    );
    */
    navigation.navigate('Intro');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes full height of the screen
    justifyContent: 'center', // Centers content vertically in the container
    alignItems: 'center', // Centers content horizontally in the container
    padding: 16,
  },
  view: {
    textAlign: 'center',
    marginTop: 12,
    width: '80%',
  },
});
