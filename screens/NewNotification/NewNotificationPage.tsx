import {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../../components/Text';
import {Container} from '../../components/Container';
import {TextInput} from '../../components/TextInput';
import {Button} from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Notification} from '../../types/notification';
import {generateRandomString} from '../../utils/randomNumber';
import {AppContext} from '../../stores/store';
import uuid from 'react-native-uuid';
import {BridgefyContext} from '../../stores/bridgefyStore';
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

// notifications allow the admin to send messages to event attendees
export function NewNotificationScreen({navigation}) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState('');
  const context = useContext(AppContext);
  const bridgefyContext = useContext(BridgefyContext);

  const handleCreateNotification = async () => {
    // send notification with bridgefy, then add it locally
    console.log('sending notification...');

    const oldNotifications = await AsyncStorage.getItem('notifications');
    const parsedOldNotifications = JSON.parse(oldNotifications || '[]');
    const newNotification: Notification = {
      id: uuid.v4(),
      message,
      title,
      tags: [tags],
    };

    // add notification to local db
    await AsyncStorage.setItem(
      'notifications',
      JSON.stringify([...parsedOldNotifications, newNotification]),
    );

    // sync context notifications
    context?.updateGlobalState({
      notifications: [...parsedOldNotifications, newNotification],
    });

    const payload = {...newNotification, type: 'notification'};
    const payloadString = JSON.stringify(payload);

    try {
      await bridgefyContext?.bridgefyState.bridgefy.send(payloadString, {
        type: BridgefyTransmissionModeType.broadcast,
        uuid: '123e4567-e89b-12d3-a456-426614174000',
      });

      // navigate to home + toast
      showToast();
      navigation.navigate('Home');
    } catch (e: any) {
      console.log('error ', e.message());
    }
  };

  return (
    <Container>
      <Text size="xlarge" weight="semibold">
        Notification
      </Text>
      <View style={styles.container}>
        <TextInput
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
          label="Notification Title"
        />
        <TextInput
          label="Notification Title"
          placeholder="Enter message"
          value={message}
          onChangeText={setMessage}
        />
        <TextInput
          label="Notification Tags"
          placeholder="Enter tags separated by space"
          value={tags}
          onChangeText={setTags}
        />
        <Button
          title="Create Notification"
          onPress={handleCreateNotification}
          filled
        />
      </View>
    </Container>
  );
}
