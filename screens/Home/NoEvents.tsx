import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {Event} from '../../types/event';
import {globalStyles} from '../../styles/Styles';
import {Button} from '../../components/Button';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {apiClient} from '../../api/axiosConfig';
import {Container} from '../../components/Container';
import {FAB, Card, Text, Searchbar, Chip} from 'react-native-paper';

const fetchData = async () => {
  const {data} = await apiClient.get('events');
  return data;
};

export function NoEvents({navigation}) {
  /*
  const {
    data: events,
    error,
    isLoading,
  } = useQuery<Event[]>('allEvents', fetchData);
  */

  const events = [
    {
      id: '12',
      organizer: {
        id: '5c914685-54da-49d4-adc5-078b2d14b30e',
        email: 'natwilliams@gmail.com',
        name: 'Nat Williams',
      },
      pic: 'https://cdn1.vectorstock.com/i/1000x1000/13/15/poster-for-country-music-festival-vector-28611315.jpg',
      name: 'Cool Country Event',
      description: 'sample description here...',
      genre: 'Country',
      active: true,
      startDate: 'April 30',
      endDate: 'May 7',
    },
    {
      id: '1234',
      organizer: {
        id: '578ec1bc-147d-415e-8edb-de52fc2b3b0e',
        email: 'alexjohnson@gmail.com',
        name: 'Alex Johnson',
      },
      pic: 'https://static.vecteezy.com/system/resources/previews/012/825/177/original/trumpet-logo-jazz-music-festival-logo-vector.jpg',
      name: 'Jazz Event',
      description: 'sample description here...',
      genre: 'Jazz',
      active: true,
      startDate: 'June 7',
      endDate: 'June 14',
    },
    {
      id: '122342342234',
      organizer: {
        id: '4d2e94ec-a7b1-48d9-8936-8f81acfca57f',
        email: 'samjones@gmail.com',
        name: 'Sam Jones',
      },
      pic: 'https://images-platform.99static.com/xWEScRj3mwOdRZ7bDsRUYPuzDRQ=/0x0:2000x2000/500x500/top/smart/99designs-contests-attachments/81/81591/attachment_81591882',
      name: 'Cool EDM Event',
      description: 'sample description here...',
      genre: 'Electronic',
      active: true,
      startDate: 'April 30',
      endDate: 'May 7',
    },
    {
      id: '1234sdfd',
      organizer: {
        id: '791b648a-71fe-4630-ac2e-943d41aefb07',
        email: 'sarahcarson@gmail.com',
        name: 'Sarah Carson',
      },
      pic: 'https://cdn4.vectorstock.com/i/1000x1000/03/68/rap-festival-logo-colorful-creative-banner-vector-20600368.jpg',
      name: 'Hip Hop Event',
      description: 'sample description here...',
      genre: 'Hip Hop',
      active: true,
      startDate: 'June 20',
      endDate: 'June 30',
    },
  ];

  console.log('axios data ', events);

  const [text, setText] = useState('');
  return (
    <View style={styles.pageContainer}>
      <ScrollView style={{borderWidth: 2, borderColor: 'red'}}>
        <View style={styles.container}>
          <Text variant="headlineLarge">Let's get started</Text>
        </View>
        <View style={styles.container}>
          <Text variant="bodyLarge">
            Search by name, genre, or location to find an event near you
          </Text>
        </View>
        <View style={styles.container}>
          <Searchbar
            placeholder={'Search Events'}
            value={text}
            onChangeText={setText}
            label={'Event'}
          />
        </View>
        <View style={styles.container}>
          {events &&
            events.map((event: Event) => {
              return (
                <TouchableOpacity
                  key={event.id}
                  onPress={() => navigation.navigate('Event', {id: event.id})}
                  style={styles.card}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: event.pic,
                    }}
                  />
                  <View style={styles.cardTextContainer}>
                    <Text variant="titleLarge">{event.name}</Text>
                    <Text variant="bodyMedium">{event.genre}</Text>
                    <Text variant="bodyMedium">
                      {event.startDate} - {event.endDate}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        small
        icon="pencil"
        label="New Event"
        onPress={() => navigation.navigate('NewEvent')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 16,
  },
  container: {
    marginTop: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  card: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',

    backgroundColor: '#fff', // White background for the card
    borderRadius: 8, // Rounded corners
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset x, y
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
    elevation: 5, // Elevation for Android (shadow effect)
    padding: 16, // Padding inside the card
  },
  image: {
    width: 100,
    height: 100,
  },
  cardTextContainer: {
    padding: 6,
  },
});
