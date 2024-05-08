import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Event} from '../../types/event';
import {globalStyles} from '../../styles/Styles';
import {Button} from '../../components/Button';
import {TextInput} from '../../components/TextInput';
import {useState} from 'react';
import {useQuery} from 'react-query';
import {apiClient} from '../../api/axiosConfig';
import {Container} from '../../components/Container';

const fetchData = async () => {
  const {data} = await apiClient.get('events');
  return data;
};

export function NoEvents({navigation}) {
  console.log('HERE');
  const testEvents: Event[] = [];

  const {
    data: events,
    error,
    isLoading,
  } = useQuery<Event[]>('allEvents', fetchData);

  console.log('axios data ', events);

  const [text, setText] = useState('');
  return (
    <Container>
      <ScrollView>
        <Text>Let's get started</Text>
        <Text>
          Search by name, genre, or location to find an event near you
        </Text>
        <TextInput
          placeholder={'searchEvents'}
          value={text}
          onChangeText={setText}
          label={'Event'}
        />
        <ScrollView style={{borderWidth: 2, borderColor: 'red'}}>
          {events &&
            events.map((event: Event) => {
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
        <Button
          title={'New Event'}
          onPress={() => navigation.navigate('NewEvent')}
        />
      </ScrollView>
    </Container>
  );
}
