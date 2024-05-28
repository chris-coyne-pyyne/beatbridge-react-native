import {Text, Card} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {formatUnixTimestamp} from '../../utils/dates';
import {globalStyles} from '../../styles/Styles';

// container that includes the date
export const DateMessageCard = ({message}: any) => {
  return (
    <Card key={message.id} id={message.id} style={styles.card}>
      <View style={styles.cardContainer}>
        <View style={styles.dateContainer}>
          <Text variant="bodyLarge">
            {formatUnixTimestamp(message.date).day}
          </Text>
          <Text variant="bodyLarge">
            {formatUnixTimestamp(message.date).month}
          </Text>
        </View>
        <View style={styles.notificationTextContainer}>
          <Text variant="titleLarge" ellipsizeMode="tail" numberOfLines={4}>
            {message.sender?.name}
          </Text>
          <Text variant="bodyLarge" ellipsizeMode="tail" numberOfLines={4}>
            {message.message}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 16,
  },
  headerTextContainer: {
    paddingLeft: 12,
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
  card: {
    margin: 12,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 12,
    width: '100%',
  },
  notificationTextContainer: {
    marginLeft: 16,
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
