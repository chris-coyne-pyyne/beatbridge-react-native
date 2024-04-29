import {Text, View, Button, TouchableOpacity} from 'react-native';
import {Event} from '../../types/event';
import {globalStyles} from '../../styles/Styles';

export function NoEvents({navigation}) {
  console.log('HERE');
  const testEvents: Event[] = [
    {
      name: 'vans warped tour 2001',
      organizer: 'string',
      description: 'sample description here...',
      id: '2',
      genre: 'rock and roll',
      active: false,
    },
    {
      name: 'vans warped tour 2001',
      organizer: 'string',
      description: 'sample description here...',
      id: '1',
      genre: 'hip hop',
      active: false,
    },
  ];
  return (
    <View>
      <Text>No events selected abc</Text>
      <Text>Events</Text>
      {testEvents.map(event => {
        return (
          <TouchableOpacity
            key={event.id}
            style={globalStyles.card}
            onPress={() => navigation.navigate('Event', {id: event.id})}>
            <Text style={globalStyles.title}>{event.name}</Text>
            <Text>{event.genre}</Text>
          </TouchableOpacity>
        );
      })}
      <Button
        title={'New Event'}
        onPress={() => navigation.navigate('NewEvent')}
      />
    </View>
  );
}
