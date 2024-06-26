import {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {AppContext} from '../../stores/store';
import {NoMessage} from '../Home/components/NoMessage';
import {Button, Chip, Text} from 'react-native-paper';
import {formatUnixTimestamp} from '../../utils/dates';
import {globalStyles} from '../../styles/Styles';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/nav';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export const NotificationPage = ({navigation}: Props) => {
  const context = useContext(AppContext);
  const notifications = context?.globalState.notifications;
  notifications?.sort((a, b) => b.date - a.date);

  const activeEvent = context?.globalState.events
    ? context.globalState.events.find(event => event.active === true)
    : null;

  const isAdmin = context?.globalState.user?.id === activeEvent?.organizer?.id;

  return (
    <View style={{padding: 16}}>
      <Text style={globalStyles.container} variant="headlineMedium">
        Notifications
      </Text>
      <Text variant="bodyLarge">
        Notifications let admins send messages to a large amount of attendees at
        one time
      </Text>
      {notifications &&
        (!notifications.length ? (
          <NoMessage text="No notifications" />
        ) : (
          notifications.map(notification => (
            <View
              key={notification.id}
              id={notification.id}
              style={[styles.notificationContainer, globalStyles.container]}>
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
                  {!!notification.tags.length &&
                    notification.tags.map(tag => <Chip key={tag}>{tag}</Chip>)}
                </View>
              </View>
            </View>
          ))
        ))}
      {isAdmin && (
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate('NewNotification')}
            style={globalStyles.container}
            mode="contained">
            New Notification
          </Button>
        </View>
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
