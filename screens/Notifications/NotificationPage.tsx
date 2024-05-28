import {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {AppContext} from '../../stores/store';
import {NoMessage} from '../Home/components/NoMessage';
import {Button, Chip, Text} from 'react-native-paper';
import {formatUnixTimestamp} from '../../utils/dates';
import {globalStyles} from '../../styles/Styles';

export const NotificationPage = ({navigation}: any) => {
  const context = useContext(AppContext);
  const notifications = context?.globalState.notifications;
  notifications?.sort((a, b) => b.date - a.date);

  const activeEvent = context?.globalState.events
    ? context.globalState.events.find(event => event.active === true)
    : null;

  const isAdmin = context?.globalState.user?.id === activeEvent?.organizer?.id;

  return (
    <View style={{padding: 16}}>
      <Text style={globalStyles.container} variant="titleLarge">
        Notifications
      </Text>
      {notifications &&
        (!notifications.length ? (
          <NoMessage text="No notifications" />
        ) : (
          notifications.map(notification => (
            <TouchableOpacity
              key={notification.id}
              id={notification.id}
              style={[styles.notificationContainer, globalStyles.container]}
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
      {isAdmin && (
        <Button
          onPress={() => navigation.navigate('NewNotification')}
          style={globalStyles.container}
          mode="contained">
          New Notification
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  dateContainer: {
    backgroundColor: '#E1E1E1',
    borderRadius: 50,
    height: 65,
    width: 65,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
