import {Text, View, Button} from 'react-native';
import useAsyncStorage from '../../hooks/useAsyncStorage';

import {globalStyles} from '../../styles/Styles';
import {User} from '../../types/user';
import {NoEvents} from './NoEvents';
import {Event} from '../../types/event';
import {Notification} from '../../types/notification';
import {useContext} from 'react';
import {AppContext} from '../../stores/store';

export function ActiveEvent({navigation, activeEvent}) {
  const context = useContext(AppContext);
  const notifications: Notification[] = [
    {
      title: 'Important notice about bathrooms...',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.',
    },
    {
      title: 'Important notice about bathrooms...',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.',
    },
  ];

  const archiveEvent = () => {
    console.log('archiving...');
    context?.updateGlobalState({events: []});
    /*
    const events = context?.globalState.events;
    if (events) {
      const newEvents = [...events];
      const activeEventInd = newEvents.findIndex(
        event => event.active === true,
      );
      newEvents[activeEventInd].active = false;
      context?.updateGlobalState({events: newEvents});
    }
    */
  };
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Event: {activeEvent.name}</Text>
      <Text style={globalStyles.title}>Notifications: {activeEvent.name}</Text>
      {notifications.map(notification => (
        <View>
          <Text>{notification.title}</Text>
          <Text>{notification.message}</Text>
        </View>
      ))}
      <Button onPress={() => archiveEvent()} title={'Archive Event'} />
      <Button
        onPress={() => navigation.navigate('NewNotification')}
        title={'Write Notification'}
      />
    </View>
  );
}
