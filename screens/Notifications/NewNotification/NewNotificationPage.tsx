import {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Container} from '../../../components/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Notification} from '../../../types/notification';
import {generateRandomString} from '../../../utils/randomNumber';
import {AppContext} from '../../../stores/store';
import uuid from 'react-native-uuid';
import {BridgefyContext} from '../../../stores/bridgefyStore';
import {TextInput, Text, Button} from 'react-native-paper';
import {
  Bridgefy,
  BridgefyEvents,
  BridgefyTransmissionModeType,
} from 'bridgefy-react-native';
import {PageContainer} from '../../../components/PageContainer';

const showToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Sent notification',
    text2: 'Your notification has been sent to all users within your area',
  });
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

// notifications allow the admin to send messages to event attendees
export function NewNotificationScreen({navigation}: any) {
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

    const currentDate = new Date();
    const newNotification: Notification = {
      id: uuid.v4() as string,
      message,
      title,
      mode: 'notification',
      tags: [tags],
      date: Math.floor(currentDate.getTime() / 1000),
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
        uuid: context?.globalState.user?.id,
      });

      // navigate to home + toast
      showToast();
      navigation.navigate('Home');
    } catch (e: any) {
      console.log('error ', e);
    }
  };

  return (
    <PageContainer navigation={navigation}>
      <Container>
        <Text style={styles.container} variant="titleLarge">
          Send new notification
        </Text>
        <View style={styles.container}>
          <TextInput
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
            label="Notification Title"
            style={styles.container}
          />
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View>
              <TextInput
                label="Notification Message"
                placeholder="Enter message"
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
                style={styles.container}
              />
            </View>
          </TouchableWithoutFeedback>
          <TextInput
            label="Notification Tags"
            placeholder="Enter tags separated by space"
            value={tags}
            onChangeText={setTags}
            style={styles.container}
          />
          <Button
            onPress={handleCreateNotification}
            style={styles.container}
            mode="contained">
            Create Notification
          </Button>
        </View>
      </Container>
    </PageContainer>
  );
}
