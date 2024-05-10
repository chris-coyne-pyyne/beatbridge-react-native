import {View, Image, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {globalStyles} from '../../styles/Styles';
import {Event} from '../../types/event';
import {useContext} from 'react';
import {AppContext} from '../../stores/store';
import {Container} from '../../components/Container';
import {apiClient} from '../../api/axiosConfig';
import {Text, Chip, Button, Card} from 'react-native-paper';
import {useQuery} from 'react-query';

export function EventScreen({route, navigation}) {
  const {id} = route.params;
  const context = useContext(AppContext);

  const fetchData = async () => {
    const {data} = await apiClient.get(`events/${id}`);
    return data;
  };

  // TODO - should only be called if coming from the main event picker component
  /*
  const {
    data: apiEvent,
    error,
    isLoading,
  } = useQuery<Event[]>(['event', id], fetchData);
  */
  const apiEvent = {
    id: '1234',
    organizer: {
      id: '578ec1bc-147d-415e-8edb-de52fc2b3b0e',
      email: 'alexjohnson@gmail.com',
      name: 'Alex Johnson',
    },
    pic: 'https://static.vecteezy.com/system/resources/previews/012/825/177/original/trumpet-logo-jazz-music-festival-logo-vector.jpg',
    name: 'Jazz Event',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    genre: 'Jazz',
    active: true,
    startDate: 'June 7',
    endDate: 'June 14',
  };
  console.log('EVENT INFO ', apiEvent);

  let selectedEvent: Event | null;

  const activeEvent = context?.globalState.events
    ? context.globalState.events.find(event => event.active === true) || null
    : null;

  // if this is not the active event for the user - just set selected event to API request
  // refactor in future - just do now for convenience
  if (activeEvent?.id !== id) {
    selectedEvent = apiEvent;
  } else {
    selectedEvent = activeEvent;
  }

  const addEvent = async () => {
    try {
      const allEvents = await AsyncStorage.getItem('events');
      const parsedEvents = JSON.parse(allEvents || '[]');
      const newEvents = [...parsedEvents, selectedEvent];
      console.log('new Events ', newEvents);
      await AsyncStorage.setItem('events', JSON.stringify(newEvents));
      context?.updateGlobalState({events: newEvents});
      navigation.navigate('Home');
    } catch (e) {
      console.log('error ', e);
    }
  };

  if (!selectedEvent) {
    return (
      <Container>
        <Text>Loading</Text>
      </Container>
    );
  }
  return (
    <Container>
      <ScrollView>
        <Text variant="headlineLarge" style={styles.container}>
          {selectedEvent.name}
        </Text>
        <View style={[styles.imageContainer, styles.container]}>
          <Image
            source={{
              uri: selectedEvent.pic,
            }}
            style={styles.image}
          />
        </View>
        <View style={[styles.subtitleContainer, styles.container]}>
          <Chip>{selectedEvent.genre}</Chip>
          <Text variant="bodyMedium">
            {selectedEvent.startDate} - {selectedEvent.endDate}
          </Text>
        </View>
        <Text variant="bodyMedium" style={[styles.container]}>
          {selectedEvent.description}
        </Text>
        <View style={styles.titleContainer}>
          <Text variant="titleLarge">Organizer</Text>
        </View>

        {selectedEvent.organizer && (
          <Card style={styles.card}>
            <View style={styles.cardContainer}>
              <Image
                source={{
                  uri: 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=',
                }}
                style={styles.profilePic}
              />
              <View style={styles.cardTextContainer}>
                <Text variant="bodyMedium">{selectedEvent.organizer.name}</Text>
                <Text variant="bodyMedium">
                  {selectedEvent.organizer.email}
                </Text>
              </View>
            </View>
          </Card>
        )}
        {/* show buttons based on login + role */}
        {!context?.globalState.userLoading &&
          /* if active event is not viewed event - let them join */
          (activeEvent?.id !== selectedEvent.id ? (
            <Button onPress={() => addEvent()} mode="contained">
              Add Event
            </Button>
          ) : selectedEvent.organizer?.id === context?.globalState.user?.id ? (
            <>
              <Button onPress={() => console.log('going...')}>
                Send Notification{' '}
              </Button>
              <Button onPress={() => console.log('end event')}>
                {' '}
                Archive Event{' '}
              </Button>
            </>
          ) : (
            <Button onPress={() => console.log('sending...')}>
              Send Message{' '}
            </Button>
          ))}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  imageContainer: {
    width: '100%',
    height: 'auto',
  },
  subtitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    margin: 12,
  },
  cardContainer: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
  },
  profilePic: {
    width: 100,
    height: 100,
  },
  cardTextContainer: {
    paddingLeft: 6,
  },
});
