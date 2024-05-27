import {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container} from '../../components/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {generateRandomString} from '../../utils/randomNumber';
import {AppContext} from '../../stores/store';
import {BridgefyContext} from '../../stores/bridgefyStore';
import {TextInput, Button, Text} from 'react-native-paper';
import uuid from 'react-native-uuid';
import {
  Bridgefy,
  BridgefyEvents,
  BridgefyTransmissionModeType,
} from 'bridgefy-react-native';
import {Message} from '../../types/message';
import {BottomNav} from '../../components/BottomNav';

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

const showToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Sent Message',
    text2: 'Your message has been sent to all users within your area',
  });
};

export const NewMessagePage = ({navigation}: any) => {
  const [message, setMessage] = useState('');
  const context = useContext(AppContext);
  const bridgefyContext = useContext(BridgefyContext);

  const handleCreateMessage = async () => {
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
        notifications: [...parsedOldMessages, newMessage],
      });

      showToast();
      navigation.navigate('MessageBoard');
    }
  };

  return (
    <Container>
      <Text variant="titleLarge">Message</Text>
      <Text variant="bodyLarge">
        Send a message to everyone else in your vicinity
      </Text>
      <View style={styles.container}>
        <TextInput
          label="Message contents"
          placeholder="Enter Message"
          value={message}
          onChangeText={setMessage}
        />
        <Button onPress={handleCreateMessage} mode="contained">
          Send Report
        </Button>
      </View>
    </Container>
  );
};
