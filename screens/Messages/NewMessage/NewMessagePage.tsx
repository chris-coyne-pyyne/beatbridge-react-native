import {useContext, useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {AppContext} from '../../../stores/store';
import {BridgefyContext} from '../../../stores/bridgefyStore';
import {TextInput, Button, Text} from 'react-native-paper';
import uuid from 'react-native-uuid';
import {BridgefyTransmissionModeType} from 'bridgefy-react-native';
import {Message} from '../../../types/message';
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

export const NewMessagePage = ({navigation}: any) => {
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState(false);
  const context = useContext(AppContext);
  const bridgefyContext = useContext(BridgefyContext);

  const handleCreateMessage = async () => {
    if (!message) {
      setFormError(true);
      return;
    }
    const currentDate = new Date();
    const user = context?.globalState.user;

    if (user) {
      const newMessage: Message = {
        id: uuid.v4() as string,
        message,
        mode: 'message',
        sender: {
          id: user?.id,
          email: user?.email,
          name: user?.name,
        },
        date: Math.floor(currentDate.getTime() / 1000),
      };
      const newMessageString = JSON.stringify(newMessage);

      await bridgefyContext?.bridgefyState.bridgefy.send(newMessageString, {
        type: BridgefyTransmissionModeType.broadcast,
        uuid: user.id,
      });

      // save locally
      const oldMessages = await AsyncStorage.getItem('messages');
      const parsedOldMessages = JSON.parse(oldMessages || '[]');

      // add notification to local db
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify([...parsedOldMessages, newMessage]),
      );
      // sync context notifications
      context?.updateGlobalState({
        messages: [...parsedOldMessages, newMessage],
      });

      showToast();
      navigation.navigate('Messages', {messageType: 'Board'});
    }
  };

  return (
    <PageContainer navigation={navigation}>
      <View style={{padding: 16}}>
        <Text variant="titleLarge" style={globalStyles.container}>
          Message
        </Text>
        <Text variant="bodyLarge" style={globalStyles.container}>
          Send a message to everyone else in your vicinity
        </Text>
        <View style={globalStyles.container}>
          <TextInput
            label="Message contents"
            placeholder="Enter Message"
            value={message}
            onChangeText={setMessage}
          />
          {formError && <ErrorMsg text="Please enter a message" />}
          <Button
            onPress={handleCreateMessage}
            mode="contained"
            style={globalStyles.container}>
            Send Message
          </Button>
        </View>
      </View>
    </PageContainer>
  );
};
