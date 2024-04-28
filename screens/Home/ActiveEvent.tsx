import {Text, View, Button} from 'react-native';
import useAsyncStorage from '../../hooks/useAsyncStorage';

import {globalStyles} from '../../styles/Styles';
import {User} from '../../types/user';
import {NoEvents} from './NoEvents';
import {Event} from '../../types/event';
import {Notification} from '../../types/notification';

export function ActiveEvent({navigation, activeEvent}) {
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
      <Button
        onClick={() => console.log('removing...')}
        title={'Archive Event'}
      />
      <Button
        onClick={() => navigation.navigate('Notification')}
        title={'Write Notification'}
      />
    </View>
  );
}
