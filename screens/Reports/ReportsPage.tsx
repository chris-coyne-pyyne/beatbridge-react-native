import {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container} from '../../components/Container';
import Toast from 'react-native-toast-message';
import {AppContext} from '../../stores/store';
import {Button, Text, Avatar} from 'react-native-paper';
import {globalStyles} from '../../styles/Styles';
import {NoMessage} from '../Home/components/NoMessage';

const showToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Sent notification',
    text2: 'Your notification has been sent to all users within your area',
  });
};

export const ReportsPage = ({navigation}: any) => {
  const context = useContext(AppContext);
  const reports = context?.globalState.reports;

  const activeEvent = context?.globalState.events
    ? context.globalState.events.find(event => event.active === true)
    : null;

  const isAdmin = context?.globalState.user?.id === activeEvent?.organizer?.id;
  return (
    <Container>
      <Text variant="titleLarge" style={globalStyles.container}>
        Report
      </Text>
      <Text variant="bodyLarge" style={globalStyles.container}>
        Problems that festival attendees have, and have sent directly to the
        admin
      </Text>
      {isAdmin &&
        (reports && reports.length ? (
          reports.map(message => (
            <View key={message.id} style={styles.messageContainer}>
              <Avatar.Image
                size={70}
                source={require('../../assets/avatar.jpeg')}
              />
              <View style={styles.messageTextContainer}>
                <Text variant="titleLarge">{message.sender?.name}</Text>
                <Text variant="bodyLarge">{message.message}</Text>
              </View>
            </View>
          ))
        ) : (
          <NoMessage text="No attendees have sent reports" />
        ))}
      {!isAdmin && (
        <Button
          onPress={() => navigation.navigate('NewReport')}
          mode="contained"
          style={globalStyles.container}>
          New Report
        </Button>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 2,
    padding: 12,
    borderColor: '#E1E1E1',
  },
  messageTextContainer: {
    marginLeft: 8,
  },
});
