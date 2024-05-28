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
import {PageContainer} from '../../components/PageContainer';
import {DateMessageContainer} from '../../components/messages/DateMessageContainer';
import {globalStyles} from '../../styles/Styles';

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
    <PageContainer navigation={navigation}>
      <ScrollView style={globalStyles.pageContainer}>
        <Text variant="headlineLarge">{activeEvent.name}</Text>
        <View
          style={[
            {display: 'flex', flexDirection: 'row'},
            globalStyles.container,
          ]}>
          <Chip>{isAdmin ? 'Admin' : 'Attendee'}</Chip>
        </View>
        <View style={styles.eventContainer}>
          {activeEvent?.pic && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Event', {id: activeEvent.id})
              }>
              <Image
                source={{
                  uri: activeEvent.pic,
                }}
                style={{
                  width: '100%',
                  height: 200,
                }}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.notificationTitleContainer}>
          <Text variant="titleLarge">Admin Notifications</Text>
        </View>

        {notifications &&
          (!notifications.length ? (
            <NoMessage
              text={
                isAdmin
                  ? 'You have not sent any notifications'
                  : 'The admin has not sent any notifications'
              }
            />
          ) : (
            notifications.slice(1, 4).map(notification => (
              <TouchableOpacity
                key={notification.id}
                id={notification.id}
                style={[styles.notificationContainer, globalStyles.container]}
                delayPressIn={50}
                onPress={() => setModalOpen(notification)}>
                <View style={styles.dateContainer}>
                  <Text variant="bodyLarge">
                    {formatUnixTimestamp(notification.date).day}
                  </Text>
                  <Text variant="bodyLarge">
                    {formatUnixTimestamp(notification.date).month}
                  </Text>
                </View>
                <View style={styles.notificationTextContainer}>
                  <Text variant="titleLarge">{notification.title}</Text>
                  <Text
                    variant="bodyLarge"
                    ellipsizeMode="tail"
                    numberOfLines={4}
                    style={globalStyles.container}>
                    {notification.message}
                  </Text>
                  <View
                    style={[
                      styles.notificationTagsContainer,
                      globalStyles.container,
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

        <View style={styles.messagesContainer}>
          {messages &&
            (!messages.length ? (
              <NoMessage text="No Messages have been detected" />
            ) : (
              messages
                .slice(1, 4)
                .map(message => (
                  <DateMessageContainer key={message.id} message={message} />
                ))
            ))}
        </View>

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
                        globalStyles.container,
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
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  notificationTitleContainer: {
    borderBottomWidth: 2,
    borderColor: '#E1E1E1',
    padding: 6,
  },
  eventContainer: {
    paddingVertical: 24,
    flex: 1,
    flexDirection: 'column',
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
    height: 65,
    width: 65,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    maxHeight: 100,
  },
  messagesContainer: {
    marginBottom: 24,
  },
});
