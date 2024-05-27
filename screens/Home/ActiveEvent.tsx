import {
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Notification} from '../../types/notification';
import {useContext, useState, useEffect} from 'react';
import {AppContext} from '../../stores/store';
import {
  FAB,
  Text,
  Chip,
  Button,
  Divider,
  BottomNavigation,
} from 'react-native-paper';
import {formatUnixTimestamp} from '../../utils/dates';
import {NoMessage} from './components/NoMessage';
import {BridgefyContext} from '../../stores/bridgefyStore';
import {BottomNav} from '../../components/BottomNav';

export function ActiveEvent({navigation, activeEvent}: any) {
  const context = useContext(AppContext);
  const [modalOpen, setModalOpen] = useState<Notification | null>(null);

  const notifications = context?.globalState.notifications;
  notifications?.sort((a, b) => b.date - a.date);

  const messages = context?.globalState.messages;
  messages?.sort((a, b) => b.date - a.date);

  const bridgefyContext = useContext(BridgefyContext);

  /*
  useEffect(() => {
    const getConnectedPeers = async () => {
      if (bridgefyContext?.bridgefyState.initialized) {
        const isStarted = await bridgefyContext?.bridgefyState.bridgefy.isStarted()
        if (isStarted) {

        }
        const peers =
          await bridgefyContext?.bridgefyState.bridgefy.connectedPeers();
        console.log('PEERS ', peers);
      }
    };
    getConnectedPeers();
  }, [bridgefyContext?.bridgefyState.initialized]);
  */

  /*
  const messages = [
    {
      id: '123',
      title: 'random',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      tags: ['postponement'],
      date: 1715452835,
    },
    {
      id: '123897',
      title: 'random',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      tags: ['postponement'],
      date: 1715452835,
    },
    {
      id: '123897sdf',
      title: 'random',
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      tags: ['postponement'],
      date: 1715452835,
    },
  ];
  */

  const isAdmin = context?.globalState.user?.id === activeEvent?.organizer.id;

  return (
    <View style={styles.pageContainer}>
      <ScrollView>
        <Text variant="headlineLarge">{activeEvent.name}</Text>
        <View
          style={[{display: 'flex', flexDirection: 'row'}, styles.container]}>
          <Chip>{isAdmin ? 'Admin' : 'Attendee'}</Chip>
        </View>
        <View style={styles.eventContainer}>
          {activeEvent?.pic && (
            <Image
              source={{
                uri: activeEvent.pic,
              }}
              style={{
                width: 150,
                height: 125,
              }}
            />
          )}
          <View style={styles.headerTextContainer}>
            <Text variant="bodyLarge" style={{marginTop: 2}}>
              April 20 - April 30
            </Text>
            <Text variant="bodyLarge" style={{marginTop: 2}}>
              Rock and Roll
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Event', {id: activeEvent.id})
              }>
              <Text variant="bodyLarge" style={{marginTop: 2, color: 'orange'}}>
                Event Page
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.notificationTitleContainer}>
          <Text variant="titleLarge">Admin Notifications</Text>
        </View>

        {notifications &&
          (!notifications.length ? (
            <NoMessage text="You have not sent any notifications" />
          ) : (
            notifications.map(notification => (
              <TouchableOpacity
                key={notification.id}
                id={notification.id}
                style={[styles.notificationContainer, styles.container]}
                delayPressIn={50}
                onPress={() => setModalOpen(notification)}>
                <View style={styles.dateContainer}>
                  <Text variant="titleLarge">
                    {formatUnixTimestamp(notification.date).day}
                  </Text>
                  <Text variant="titleLarge">
                    {formatUnixTimestamp(notification.date).month}
                  </Text>
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
                    style={[
                      styles.notificationTagsContainer,
                      styles.container,
                    ]}>
                    {notification.tags.map(tag => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ))}

        <View style={styles.notificationTitleContainer}>
          <Text variant="titleLarge">Messages</Text>
        </View>

        {messages &&
          (!messages.length ? (
            <NoMessage text="No Messages have been detected" />
          ) : (
            messages.map(message => {
              return (
                <TouchableOpacity
                  key={message.id}
                  id={message.id}
                  style={[styles.notificationContainer, styles.container]}
                  delayPressIn={50}
                  onPress={() => console.log('hello world')}>
                  <View style={styles.dateContainer}>
                    <Text variant="titleLarge">
                      {formatUnixTimestamp(message.date).day}
                    </Text>
                    <Text variant="titleLarge">
                      {formatUnixTimestamp(message.date).month}
                    </Text>
                  </View>
                  <View style={styles.notificationTextContainer}>
                    <Text
                      variant="bodyLarge"
                      ellipsizeMode="tail"
                      numberOfLines={4}
                      style={styles.container}>
                      {message.message}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
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
                        <Chip key={tag}>{tag}</Chip>
                      ))}
                    </View>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
      {/*
      <Button onPress={() => navigation.navigate('NewEvent')}>new event</Button>
      <Button
        onPress={async () => {
          const peers =
            await bridgefyContext?.bridgefyState.bridgefy.connectedPeers();
          console.log('peers ', peers);

          const isInitialized =
            await bridgefyContext?.bridgefyState.bridgefy.isInitialized();
          console.log('is initialized ', isInitialized);

          const expireDate =
            await bridgefyContext?.bridgefyState.bridgefy.licenseExpirationDate();
          console.log('expireDate ', expireDate);
        }}>
        get peers
      </Button>
      */}
      <BottomNav navigation={navigation} />
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
    justifyContent: 'space-between',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
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
