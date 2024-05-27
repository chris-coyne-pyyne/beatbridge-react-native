import {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container} from '../../../components/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Report} from '../../../types/report';
import {generateRandomString} from '../../../utils/randomNumber';
import {AppContext} from '../../../stores/store';
import {BridgefyContext} from '../../../stores/bridgefyStore';
import {TextInput, Button, Text} from 'react-native-paper';
import uuid from 'react-native-uuid';
import {
  Bridgefy,
  BridgefyEvents,
  BridgefyTransmissionModeType,
} from 'bridgefy-react-native';
import {Message} from '../../../types/message';

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

export const NewReportPage = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const context = useContext(AppContext);
  const bridgefyContext = useContext(BridgefyContext);

  const handleCreateReport = async () => {
    const currentDate = new Date();
    const newReport: Report = {
      id: uuid.v4() as string,
      message,
      mode: 'report',
      date: Math.floor(currentDate.getTime() / 1000),
    };
    const newReportString = JSON.stringify(newReport);
    // send notification with bridgefy TO THE ADMIN of the event

    const activeEvent = context?.globalState.events.find(event => event.active);
    const eventAdminId = activeEvent?.organizer?.id;

    bridgefyContext?.bridgefyState.bridgefy.send(newReportString, {
      type: BridgefyTransmissionModeType.mesh,
      uuid: eventAdminId,
    });
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