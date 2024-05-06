import {Text, View, Button, TouchableOpacity, ScrollView} from 'react-native';
import {Event} from '../../types/event';
import {globalStyles} from '../../styles/Styles';
import {Button as BBButton} from '../../components/Button';
import {TextInput as BBTextInput} from '../../components/TextInput';
import {useState} from 'react';

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
    {
      name: 'vans warped tour 2001',
      organizer: 'string',
      description: 'sample description here...',
      id: '5',
      genre: 'rock and roll',
      active: false,
    },
    {
      name: 'vans warped tour 2001',
      organizer: 'string',
      description: 'sample description here...',
      id: '9',
      genre: 'hip hop',
      active: false,
    },
    {
      name: 'vans warped tour 2001',
      organizer: 'string',
      description: 'sample description here...',
      id: '12',
      genre: 'rock and roll',
      active: false,
    },
    {
      name: 'vans warped tour 2001',
      organizer: 'string',
      description: 'sample description here...',
      id: '13232',
      genre: 'hip hop',
      active: false,
    },
  ];

  const [text, setText] = useState('');
  return (
    <View style={{flex: 1}}>
      <Text>Let's get started</Text>
      <Text>Search by name, genre, or location to find an event near you</Text>
      <BBTextInput
        placeholder={'searchEvents'}
        value={text}
        onChangeText={setText}
        label={'Event'}
      />
      <ScrollView style={{borderWidth: 2, borderColor: 'red'}}>
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
      </ScrollView>
      <BBButton
        title={'New Event'}
        onPress={() => navigation.navigate('NewEvent')}
      />
    </View>
  );
}
