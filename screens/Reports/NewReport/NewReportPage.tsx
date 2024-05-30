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
import {BridgefyTransmissionModeType} from 'bridgefy-react-native';
import {PageContainer} from '../../../components/PageContainer';
import {globalStyles} from '../../../styles/Styles';
import {ErrorMsg} from '../../../components/ErrorMsg';

const showToast = () => {
  Toast.show({
    type: 'info',
    text1: 'Processing Message',
    text2: 'Waiting for nearby users...',
  });
};

/*
  behavior:
  onsubmit, should put timeout of a couple of seconds to see if the message can be sent
    put message into the async queue

*/

export const NewReportPage = ({navigation}: any) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);
  const context = useContext(AppContext);
  const bridgefyContext = useContext(BridgefyContext);

  const handleCreateReport = async () => {
    if (!title || !message) {
      setFormError(true);
      return;
    }
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

    setLoading(true);
    const sentId = await bridgefyContext?.bridgefyState.bridgefy.send(
      newReportString,
      {
        type: BridgefyTransmissionModeType.mesh,
        uuid: eventAdminId,
      },
    );

    // add report to queued messages - and wait for a response
    const queuedMsgString = (await AsyncStorage.getItem('queuedMsgs')) || '[]';
    const queuedMsgObj = JSON.parse(queuedMsgString);
    const newMsgs = [...queuedMsgObj, sentId];
    await AsyncStorage.setItem('queuedMsgs', JSON.stringify(newMsgs));

    showToast();
    navigation.navigate('Messages', {messageType: 'Board'});
  };

  return (
    <PageContainer navigation={navigation}>
      <Container>
        <Text variant="titleLarge">Report</Text>
        <Text variant="bodyLarge">
          Send a message to the administrators letting them know if theres a
          problem
        </Text>
        <View style={globalStyles.container}>
          <TextInput
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
            label="Report Title"
            style={globalStyles.container}
          />
          <TextInput
            label="Report Message"
            placeholder="Enter message"
            value={message}
            onChangeText={setMessage}
            style={globalStyles.container}
          />
          {formError && <ErrorMsg text="Please enter all fields" />}
          <Button
            onPress={handleCreateReport}
            mode="contained"
            style={globalStyles.container}
            loading={loading}>
            Send Report
          </Button>
        </View>
      </Container>
    </PageContainer>
  );
};
