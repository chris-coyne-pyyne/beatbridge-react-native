import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {Event} from '../../types/event';
import {useState} from 'react';
import {useQuery} from 'react-query';
import {apiClient} from '../../api/axiosConfig';
import {FAB, Text, Searchbar} from 'react-native-paper';
import {globalStyles} from '../../styles/Styles';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/nav';

const fetchData = async () => {
  const {data} = await apiClient.get('events');
  return data;
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export function NoEvents({navigation}: Props) {
  const {
    data: events,
    error,
    isLoading,
  } = useQuery<Event[]>('allEvents', fetchData);

  /*
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
  */

  const [searchText, setSearchText] = useState('');
  const filteredEvents =
    !searchText || !events
      ? events
      : events.filter(event => event.name.includes(searchText));

  return (
    <View style={globalStyles.pageContainer}>
      <ScrollView>
        <View style={globalStyles.container}>
          <Text variant="headlineLarge">Let's get started</Text>
        </View>
        <View style={globalStyles.container}>
          <Text variant="bodyLarge">
            Search by name, genre, or location to find an event near you
          </Text>
        </View>
        <View style={globalStyles.container}>
          <Searchbar
            placeholder={'Search Events'}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={globalStyles.container}>
          {filteredEvents &&
            filteredEvents.map((event: Event) => {
              return (
                <TouchableOpacity
                  key={event.id}
                  onPress={() => navigation.navigate('Event', {id: event.id})}
                  style={[styles.card, globalStyles.container]}>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',

    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
  cardTextContainer: {
    padding: 6,
  },
});
