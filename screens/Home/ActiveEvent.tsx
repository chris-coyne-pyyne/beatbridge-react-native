import {
  View,
  Button,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text} from '../../components/Text';

import {globalStyles} from '../../styles/Styles';
import {Notification} from '../../types/notification';
import {useContext, useState} from 'react';
import {AppContext} from '../../stores/store';
import {Container} from '../../components/Container';
import {Tag} from '../../components/Tag';
import {FAB} from 'react-native-paper';

export function ActiveEvent({navigation, activeEvent}) {
  const context = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState<Notification | null>(null);

  console.log('messages ', context?.globalState.messages);

  const notifications = context?.globalState.notifications;

  const archiveEvent = () => {
    context?.updateGlobalState({events: []});
    /*
    const events = context?.globalState.events;
    if (events) {
      const newEvents = [...events];
      const activeEventInd = newEvents.findIndex(
        event => event.active === true,
      );
      newEvents[activeEventInd].active = false;
      context?.updateGlobalState({events: newEvents});
    }
    */
  };

  return (
    <Container>
      <ScrollView style={{borderWidth: 2, borderColor: 'red'}}>
        <Text size="xlarge">{activeEvent.name}</Text>
        <View style={styles.eventContainer}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Vans_Warped_Tour_Logo.png',
            }}
            style={{
              width: 125,
              height: 100,
              borderWidth: 2,
              borderColor: 'red',
            }}
          />
          <View>
            <Text size="medium">April 20 - April 30</Text>
            <Text size="medium">Rock and Roll</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Event', {id: activeEvent.id})
              }>
              <Text size="medium">Event Page {'->'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text size="xlarge">Notifications</Text>

        {notifications.map(notification => (
          <TouchableOpacity
            id={notification.id}
            style={styles.notificationContainer}
            delayPressIn={50}
            onPress={() => setModalOpen(notification)}>
            <View>
              <Text>18</Text>
              <Text>December</Text>
            </View>
            <View>
              <Text>{notification.title}</Text>
              <Text>{notification.message}</Text>
              <View style={styles.notificationTagsContainer}>
                {notification.tags.map(tag => (
                  <Tag title={tag} />
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <Button onPress={() => archiveEvent()} title={'Archive Event'} />
        <Button
          onPress={() => navigation.navigate('NewNotification')}
          title={'Write Notification'}
        />

        {modalOpen && (
          <Modal
            transparent={true}
            visible={!!modalOpen}
            onRequestClose={() => setModalOpen(null)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text>Test modal</Text>
                <TouchableOpacity onPress={() => setModalOpen(null)}>
                  <Text>{modalOpen.title}</Text>
                  <Text>{modalOpen.message}</Text>
                  {modalOpen.tags.map(tag => (
                    <Tag title={tag} />
                  ))}
                  <Text>Close Modal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
      <FAB
        style={styles.fab}
        small
        icon="pencil"
        label="Report"
        onPress={() => navigation.navigate('NewReport')}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  eventContainer: {
    paddingVertical: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space between',
    borderWidth: 2,
    borderColor: 'red',
  },
  notificationContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  notificationTagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Control the size of the modal itself
    alignItems: 'center', // Center the text inside the modal
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
