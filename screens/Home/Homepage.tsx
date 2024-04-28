import {Text, View, Button} from 'react-native';
import useAsyncStorage from '../../hooks/useAsyncStorage';

import {globalStyles} from '../../styles/Styles';
import {User} from '../../types/user';
import {NoEvents} from './NoEvents';
import {Event} from '../../types/event';
import {ActiveEvent} from './ActiveEvent';
import {useContext, useState} from 'react';
import {AppContext, AppProvider} from '../../stores/store';

export function HomeScreen({navigation}) {
  // const {data: user, loading, error} = useAsyncStorage<User>('user');
  const context = useContext(AppContext);
  const {
    data: events,
    loading: eventLoading,
    error: eventError,
  } = useAsyncStorage<Event[]>('events');

  const activeEventApi = events
    ? events.find(event => event.active === true)
    : null;

  const [activeEvent, setActiveEvent] = useState<Event | null>(
    activeEventApi || null,
  );

  if (context?.globalState.user === 'loading' || eventLoading) {
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
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Beat Bridge</Text>
        <Text style={globalStyles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
        <Button title="Log In" onPress={() => navigation.navigate('Login')} />
      </View>
    );
  }
}
