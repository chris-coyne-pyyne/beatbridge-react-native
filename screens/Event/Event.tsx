import {View, Image, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Event} from '../../types/event';
import {useContext} from 'react';
import {AppContext} from '../../stores/store';
import {Container} from '../../components/Container';
import {apiClient} from '../../api/axiosConfig';
import {Text, Chip, Button, Card} from 'react-native-paper';
import {useQuery} from 'react-query';

function sortEvents(events: any): Event[] {
  return events.sort((a, b) => {
    const parseDateTime = (event: any): Date => {
      const [date, startTime] = [event.date, event.startTime];
      const [time, modifier] = startTime.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier === 'PM' && hours !== 12) {
        hours += 12;
      }
      if (modifier === 'AM' && hours === 12) {
        hours = 0;
      }

      const [month, day] = date.split(' ');
      const year = new Date().getFullYear(); // Assuming the events are in the current year
      const monthIndex = new Date(`${month} 1`).getMonth(); // Get the month index (0-11)

      const fullDateString = `${year}-${monthIndex + 1}-${day}T${hours
        .toString()
        .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
      console.log('fullDateString: ', fullDateString);

      return new Date(fullDateString);
    };

    return parseDateTime(a).getTime() - parseDateTime(b).getTime();
  });
}

function groupEvents(events: any) {
  const months = [];
  for (const e of events) {
    // adding a new goup
    if (!months.length || months[months.length - 1][0].date !== e.date) {
      months.push([e]);
    }
    // appending to existing group
    else {
      months[months.length - 1].push(e);
    }
  }
  return months;
}

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

  console.log('ACTIVE EVENT ', selectedEvent);

  let groupedArtists = [];
  const sortedArtists = selectedEvent?.artists
    ? [...selectedEvent.artists]
    : [];

  sortEvents(sortedArtists);

  console.log('SORTED ARTSITS ', sortedArtists);

  groupedArtists = groupEvents(sortedArtists);

  console.log('groupedArtists ', groupedArtists);

  const addEvent = async () => {
    try {
      const activeNewEvent = {...selectedEvent, active: true};
      const allEvents = await AsyncStorage.getItem('events');
      const parsedEvents = JSON.parse(allEvents || '[]');
      const newEvents = [...parsedEvents, activeNewEvent];
      console.log('new Events ', newEvents);
      await AsyncStorage.setItem('events', JSON.stringify(newEvents));
      context?.updateGlobalState({events: newEvents});
      navigation.navigate('Home');
    } catch (e) {
      console.log('error ', e);
    }
  };

  const archiveEvent = async () => {
    const events = context?.globalState.events;
    if (events) {
      const newEvents = [...events];
      const activeEventInd = newEvents.findIndex(
        event => event.active === true,
      );
      newEvents[activeEventInd].active = false;
      context?.updateGlobalState({events: newEvents});
      await AsyncStorage.setItem('events', JSON.stringify(newEvents));
      navigation.navigate('Home');
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
          {selectedEvent.pic && (
            <Image
              source={{
                uri: selectedEvent.pic,
              }}
              style={styles.image}
            />
          )}
        </View>
        <View style={[styles.subtitleContainer, styles.container]}>
          <Chip>{selectedEvent.genre}</Chip>
          <Text variant="bodyLarge">
            {selectedEvent.startDate} - {selectedEvent.endDate}
          </Text>
        </View>
        <Text variant="bodyLarge" style={[styles.container]}>
          {selectedEvent.description}
        </Text>
        <View style={styles.section}>
          <View style={styles.titleContainer}>
            <Text variant="titleLarge">Itinerary</Text>
          </View>
          {groupedArtists &&
            groupedArtists.map(artistGroup => {
              return (
                <View key={artistGroup[0].player}>
                  <Text style={styles.container}>{artistGroup[0].date}</Text>
                  {artistGroup.map(artist => (
                    <Card
                      style={[styles.card, {padding: 12}]}
                      key={artist.player}>
                      <View>
                        <Text variant="titleLarge">{artist.player}</Text>
                      </View>
                      <Text>
                        {artist.startTime} - {artist.endTime}
                      </Text>
                    </Card>
                  ))}
                </View>
              );
            })}
        </View>

        <View style={styles.section}>
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
                <View style={[styles.cardTextContainer]}>
                  <Text variant="bodyLarge" style={{flexWrap: 'wrap'}}>
                    {selectedEvent.organizer.name}
                  </Text>
                  <Text variant="bodyLarge">
                    {selectedEvent.organizer.email}
                  </Text>
                </View>
              </View>
            </Card>
          )}
        </View>
        {/* show buttons based on login + role */}
        {!context?.globalState.userLoading && (
          /* if active event is not viewed event - let them join */
          <View style={styles.buttonContainer}>
            {activeEvent?.id !== selectedEvent.id ? (
              <Button
                onPress={() => addEvent()}
                mode="contained"
                style={styles.container}>
                Add Event
              </Button>
            ) : selectedEvent.organizer?.id ===
              context?.globalState.user?.id ? (
              <>
                <Button
                  onPress={() => navigation.navigate('NewNotification')}
                  mode="contained"
                  icon="pencil"
                  style={styles.container}>
                  Send Notification{' '}
                </Button>
                <Button
                  onPress={() => archiveEvent()}
                  mode="outlined"
                  textColor="red"
                  icon="trash-can"
                  style={styles.container}>
                  {' '}
                  Archive Event{' '}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onPress={() => navigation.navigate('NewReport')}
                  mode="contained"
                  icon="pencil"
                  style={styles.container}>
                  Send Report{' '}
                </Button>
                <Button
                  onPress={() => archiveEvent()}
                  mode="outlined"
                  textColor="red"
                  icon="trash-can"
                  style={styles.container}>
                  {' '}
                  Archive Event{' '}
                </Button>
              </>
            )}
          </View>
        )}
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
    marginTop: 12,
  },
  cardContainer: {
    padding: 12,
    display: 'flex',
    flexDirection: 'row',
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  cardTextContainer: {
    paddingLeft: 6,
  },
  buttonContainer: {
    marginTop: 24,
  },
  section: {
    marginTop: 24,
  },
});
