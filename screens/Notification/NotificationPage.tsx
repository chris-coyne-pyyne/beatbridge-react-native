import {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {AppContext} from '../../stores/store';
import {NoMessage} from '../Home/components/NoMessage';
import {Button, Chip, Text} from 'react-native-paper';
import {formatUnixTimestamp} from '../../utils/dates';

export const NotificationPage = ({navigation}: any) => {
  const context = useContext(AppContext);
  const notifications = context?.globalState.notifications;
  notifications?.sort((a, b) => b.date - a.date);

  return (
    <View style={{padding: 16}}>
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
              onPress={() => console.log('hello world')}>
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
          ))
        ))}
      <Button
        onPress={() => navigation.navigate('NewNotification')}
        style={styles.container}
        mode="contained">
        New Notification
      </Button>
    </View>
  );
};

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
    height: 65,
    width: 65,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    maxHeight: 100,
  },
});
