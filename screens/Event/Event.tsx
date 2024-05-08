import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {Button} from '../../components/Button';
import {Text} from '../../components/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {globalStyles} from '../../styles/Styles';
import {Event} from '../../types/event';
import {useContext} from 'react';
import {AppContext} from '../../stores/store';
import {Container} from '../../components/Container';
import {apiClient} from '../../api/axiosConfig';
import {useQuery} from 'react-query';

export function EventScreen({route, navigation}) {
  const {id} = route.params;
  const context = useContext(AppContext);

  const fetchData = async () => {
    const {data} = await apiClient.get(`events/${id}`);
    return data;
  };

  // TODO - should only be called if coming from the main event picker component
  const {
    data: apiEvent,
    error,
    isLoading,
  } = useQuery<Event[]>(['event', id], fetchData);
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

  const loadedUser =
    context?.globalState.user !== 'loading' &&
    context?.globalState.user !== null;
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
        <Text size="xxlarge" weight="semibold">
          {selectedEvent.name}
        </Text>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: selectedEvent.pic,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.subtitleContainer}>
          <Text>{selectedEvent.genre}</Text>
          <Text>
            {selectedEvent.startDate} - {selectedEvent.endDate}
          </Text>
        </View>
        <Text>{selectedEvent.description}</Text>
        <Text size="xlarge" weight="semibold">
          Organizer
        </Text>

        <View style={styles.card}>
          <Image
            source={{
              uri: 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=',
            }}
            style={styles.profilePic}
          />
          {selectedEvent.organizer && (
            <View>
              <Text>{selectedEvent.organizer.name}</Text>
              <Text>{selectedEvent.organizer.id}</Text>
            </View>
          )}
        </View>
        {/* show buttons based on login + role */}
        {loadedUser &&
          /* if active event is not viewed event - let them join */
          (activeEvent?.id !== selectedEvent.id ? (
            <Button onPress={() => addEvent()} title={'Add Event'} />
          ) : selectedEvent.organizer?.id === context?.globalState.user.id ? (
            <>
              <Button onPress={() => addEvent()} title={'Send Notification'} />
              <Button
                onPress={() => console.log('end event')}
                title={'Archive event'}
              />
            </>
          ) : (
            <Button
              onPress={() => console.log('sending...')}
              title={'Send Message'}
            />
          ))}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  imageContainer: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'red',
    height: 'auto',
  },
  subtitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,

    display: 'flex',
    flexDirection: 'row',
  },
  profilePic: {
    width: 100,
    height: 100,
  },
});
