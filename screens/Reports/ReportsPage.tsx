import {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container} from '../../components/Container';
import Toast from 'react-native-toast-message';
import {AppContext} from '../../stores/store';
import {Button, Text, Avatar} from 'react-native-paper';
import {globalStyles} from '../../styles/Styles';
import {NoMessage} from '../Home/components/NoMessage';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/nav';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export const ReportsPage = ({navigation}: Props) => {
  const context = useContext(AppContext);
  const reports = context?.globalState.reports;

  const activeEvent = context?.globalState.events
    ? context.globalState.events.find(event => event.active === true)
    : null;

  const isAdmin = context?.globalState.user?.id === activeEvent?.organizer?.id;
  return (
    <Container>
      <Text variant="headlineMedium" style={globalStyles.container}>
        Report
      </Text>
      <Text variant="bodyLarge">
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
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate('NewReport')}
            mode="contained"
            style={globalStyles.container}>
            New Report
          </Button>
        </View>
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
