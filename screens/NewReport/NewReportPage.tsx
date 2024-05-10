import {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container} from '../../components/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Notification} from '../../types/notification';
import {generateRandomString} from '../../utils/randomNumber';
import {AppContext} from '../../stores/store';
import {BridgefyContext} from '../../stores/bridgefyStore';
import {TextInput, Button, Text} from 'react-native-paper';
import {
  Bridgefy,
  BridgefyEvents,
  BridgefyTransmissionModeType,
} from 'bridgefy-react-native';

const showToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Sent notification',
    text2: 'Your notification has been sent to all users within your area',
  });
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 16,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export const NewReportPage = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const context = useContext(AppContext);
  const bridgefyContext = useContext(BridgefyContext);

  const activeEvent = context?.globalState.events.find(event => event.active);
  console.log('sending to organizer: ', activeEvent?.organizer?.id);

  const handleCreateReport = async () => {
    // send notification with bridgefy TO THE ADMIN of the event
    console.log('CREATING');

    /*
    await bridgefyContext?.bridgefyState.bridgefy.send('Hello world', {
      type: BridgefyTransmissionModeType.broadcast,
      uuid: '123e4567-e89b-12d3-a456-426614174000',
    });
    */
  };

  return (
    <Container>
      <Text variant="titleLarge">Report</Text>
      <Text variant="bodyLarge">
        Send a message to the administrators letting them know if theres a
        problem
      </Text>
      <View style={styles.container}>
        <TextInput
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
          label="Report Title"
        />
        <TextInput
          label="Report Message"
          placeholder="Enter message"
          value={message}
          onChangeText={setMessage}
        />
        <Button onPress={handleCreateReport} mode="contained">
          Send Report
        </Button>
      </View>
    </Container>
  );
};
