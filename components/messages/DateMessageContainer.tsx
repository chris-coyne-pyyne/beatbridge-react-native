import {Text} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {formatUnixTimestamp} from '../../utils/dates';
import {globalStyles} from '../../styles/Styles';

// container that includes the date
export const DateMessageContainer = ({message, callback}: any) => {
  return (
    <TouchableOpacity
      key={message.id}
      id={message.id}
      style={[styles.notificationContainer, globalStyles.container]}
      delayPressIn={50}
      onPress={() => console.log('hello world')}>
      <View style={styles.dateContainer}>
        <Text variant="bodyLarge">{formatUnixTimestamp(message.date).day}</Text>
        <Text variant="bodyLarge">
          {formatUnixTimestamp(message.date).month}
        </Text>
      </View>
      <View style={styles.notificationTextContainer}>
        <Text variant="bodyLarge" ellipsizeMode="tail" numberOfLines={4}>
          {message.sender?.name}
        </Text>
        <Text
          variant="bodyLarge"
          ellipsizeMode="tail"
          numberOfLines={4}
          style={globalStyles.container}>
          {message.message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 16,
  },
  headerTextContainer: {
    paddingLeft: 12,
  },
  notificationTitleContainer: {
    borderBottomWidth: 2,
    borderColor: '#E1E1E1',
    padding: 6,
  },
  pageContainer: {
    display: 'flex',
    padding: 12,
    flex: 1,
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
});
