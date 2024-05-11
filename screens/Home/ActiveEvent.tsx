import {
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {globalStyles} from '../../styles/Styles';
import {Notification} from '../../types/notification';
import {useContext, useState} from 'react';
import {AppContext} from '../../stores/store';
import {Container} from '../../components/Container';
import {FAB, Text, Chip, Button, Divider} from 'react-native-paper';

export function ActiveEvent({navigation, activeEvent}) {
  const context = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState<Notification | null>(null);

  console.log('messages ', context?.globalState.messages);

  const notifications = context?.globalState.notifications;

  /*
  const notifications = [
    {
      id: '123',
      title: 'random',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      tags: ['postponement'],
      date: '18 Dec',
    },
    {
      id: '123897',
      title: 'random',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      tags: ['postponement'],
      date: '18 Dec',
    },
    {
      id: '123897sdf',
      title: 'random',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      tags: ['postponement'],
      date: '18 Dec',
    },
  ];
  */

  const isAdmin = context?.globalState.user?.id === activeEvent?.organizer.id;

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
    <View style={styles.pageContainer}>
      <ScrollView>
        <Text variant="headlineLarge">{activeEvent.name}</Text>
        <View
          style={[{display: 'flex', flexDirection: 'row'}, styles.container]}>
          <Chip>{isAdmin ? 'Admin' : 'Attendee'}</Chip>
        </View>
        <View style={styles.eventContainer}>
          <Image
            source={{
              uri: activeEvent.pic,
            }}
            style={{
              width: 150,
              height: 125,
            }}
          />
          <View style={styles.headerTextContainer}>
            <Text variant="bodyLarge" style={{marginTop: 2}}>
              April 20 - April 30
            </Text>
            <Text variant="bodyLarge" style={{marginTop: 2}}>
              Rock and Roll
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Event', {id: activeEvent.id})}
              mode="contained">
              <Text variant="bodyLarge" style={{marginTop: 2, color: 'orange'}}>
                Event Page
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.notificationTitleContainer}>
          <Text variant="titleLarge">Notifications</Text>
        </View>

        {notifications &&
          notifications.map(notification => (
            <TouchableOpacity
              key={notification.id}
              id={notification.id}
              style={[styles.notificationContainer, styles.container]}
              delayPressIn={50}
              onPress={() => setModalOpen(notification)}>
              <View style={styles.dateContainer}>
                <Text variant="titleLarge">18</Text>
                <Text variant="titleLarge">Dec</Text>
              </View>
              <View style={styles.notificationTextContainer}>
                <Text variant="titleLarge">{notification.title}</Text>
                <Text
                  variant="bodyLarge"
                  ellipsizeMode="tail"
                  numberOfLines={4}
                  style={styles.container}>
                  {notification.message}
                </Text>
                <View
                  style={[styles.notificationTagsContainer, styles.container]}>
                  {notification.tags.map(tag => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}

        {modalOpen && (
          <Modal
            transparent={true}
            visible={!!modalOpen}
            onRequestClose={() => setModalOpen(null)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <ScrollView>
                  <TouchableOpacity onPress={() => setModalOpen(null)}>
                    <Text variant="titleLarge">{modalOpen.title}</Text>
                    <Divider
                      bold={true}
                      style={{marginTop: 6, marginBottom: 6}}
                    />
                    <Text variant="bodyLarge">{modalOpen.message}</Text>
                    <View
                      style={[
                        {display: 'flex', flexDirection: 'row'},
                        styles.container,
                      ]}>
                      {modalOpen.tags.map(tag => (
                        <Chip>{tag}</Chip>
                      ))}
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
      {isAdmin ? (
        <FAB
          style={styles.fab}
          small
          icon="pencil"
          label="Notification"
          onPress={() => navigation.navigate('NewNotification')}
        />
      ) : (
        <FAB
          style={styles.fab}
          small
          icon="pencil"
          label="Report"
          onPress={() => navigation.navigate('NewReport')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerTextContainer: {
    paddingLeft: 12,
  },
  notificationTitleContainer: {
    borderBottomWidth: 2,
    borderColor: '#E1E1E1',
    padding: 6,
  },
  container: {
    marginTop: 12,
  },
  pageContainer: {
    display: 'flex',
    padding: 12,
    flex: 1,
  },
  eventContainer: {
    paddingVertical: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space between',
  },
  notificationContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 2,
    padding: 12,
    borderColor: '#E1E1E1',
  },
  notificationTextContainer: {
    overflow: 'visible',
    flexShrink: 1,
    marginLeft: 16,
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
    maxHeight: 400,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  dateContainer: {
    backgroundColor: '#E1E1E1',
    borderRadius: 50,
    height: 90,
    width: 90,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    maxHeight: 100,
  },
});
