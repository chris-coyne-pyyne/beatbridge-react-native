import {View, Button, Image, StyleSheet, ScrollView} from 'react-native';
import {Text} from '../../components/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {globalStyles} from '../../styles/Styles';
import {Event} from '../../types/event';
import {useContext} from 'react';
import {AppContext} from '../../stores/store';
import {Container} from '../../components/Container';

export function EventScreen({route, navigation}) {
  const {id} = route.params;
  const context = useContext(AppContext);

  const activeEvent = context?.globalState.events
    ? context.globalState.events.find(event => event.active === true)
    : null;

  console.log('id ', id);
  const mockEvent: Event = {
    organizer: {
      id: 'johnsmith@gmail.com',
      pic: 'xyz',
      name: 'John Smith',
    },
    active: true,
    id: '1',
    name: 'vans warped tour 2001',
    pic: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Vans_Warped_Tour_Logo.png',
    genre: 'rock',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.',
    startDate: 'April 20',
    endDate: 'April 30',
  };

  const addEvent = async () => {
    try {
      const allEvents = await AsyncStorage.getItem('events');
      const parsedEvents = JSON.parse(allEvents || '[]');
      const newEvents = [...parsedEvents, mockEvent];
      console.log('new Events ', newEvents);
      await AsyncStorage.setItem('events', JSON.stringify(newEvents));
      context?.updateGlobalState({events: newEvents});
      navigation.navigate('Home');
    } catch (e) {
      console.log('error ', e);
    }
  };
  return (
    <Container>
      <ScrollView>
        <Text size="xxlarge" weight="semibold">
          {mockEvent.name}
        </Text>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://cdn11.bigcommerce.com/s-fg272t4iw0/images/stencil/1280x1280/products/9545/9798/C-19597__94556.1557820471.jpg?c=2',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.subtitleContainer}>
          <Text>{mockEvent.genre}</Text>
          <Text>
            {mockEvent.startDate} - {mockEvent.endDate}
          </Text>
        </View>
        <Text>{mockEvent.description}</Text>
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
          <View>
            <Text>{mockEvent.organizer.name}</Text>
            <Text>{mockEvent.organizer.id}</Text>
          </View>
        </View>
        {/* show buttons based on login + role */}
        {
          /* if active event is not viewed event - let them join */
          activeEvent?.id !== mockEvent.id ? (
            <Button onPress={() => addEvent()} title={'Add Event'} />
          ) : mockEvent.organizer.id === activeEvent?.id ? (
            <>
              <Button onPress={() => addEvent()} title={'Send Notification'} />{' '}
              <Button
                onPress={console.log('end event')}
                title={'Archive event'}
              />
            </>
          ) : (
            <Button
              onPress={() => console.log('sending...')}
              title={'Send Message'}
            />
          )
        }
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
