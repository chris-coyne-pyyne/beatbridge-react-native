import {useContext, useState} from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Container} from '../../../components/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Notification} from '../../../types/notification';
import {AppContext} from '../../../stores/store';
import uuid from 'react-native-uuid';
import {BridgefyContext} from '../../../stores/bridgefyStore';
import {TextInput, Text, Button} from 'react-native-paper';
import {globalStyles} from '../../../styles/Styles';
import {BridgefyTransmissionModeType} from 'bridgefy-react-native';
import {PageContainer} from '../../../components/PageContainer';
import {ErrorMsg} from '../../../components/ErrorMsg';
import {RootStackParamList} from '../../../types/nav';
import {NavigationProp} from '@react-navigation/native';

const showToast = () => {
  Toast.show({
    type: 'info',
    text1: 'Processing Message',
    text2: 'Waiting for nearby users...',
  });
};

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

// notifications allow the admin to send messages to event attendees
export function NewNotificationScreen({navigation}: Props) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState('');
  const context = useContext(AppContext);
  const bridgefyContext = useContext(BridgefyContext);
  const [formError, setFormError] = useState(false);

  const handleCreateNotification = async () => {
    // send notification with bridgefy, then add it locally
    if (!message || !title) {
      setFormError(true);
      return;
    }

    const oldNotifications = await AsyncStorage.getItem('notifications');
    const parsedOldNotifications = JSON.parse(oldNotifications || '[]');

    const currentDate = new Date();
    const newNotification: Notification = {
      id: uuid.v4() as string,
      message,
      title,
      mode: 'notification',
      tags: tags ? [tags] : [],
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
        <Text style={globalStyles.container} variant="titleLarge">
          Send new notification
        </Text>
        <View style={globalStyles.container}>
          <TextInput
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
            label="Notification Title"
            style={globalStyles.container}
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
                style={globalStyles.container}
              />
            </View>
          </TouchableWithoutFeedback>
          <TextInput
            label="Notification Tags"
            placeholder="Enter tags separated by space"
            value={tags}
            onChangeText={setTags}
            style={globalStyles.container}
          />
          {formError && <ErrorMsg text="Please enter a title and message" />}
          <Button
            onPress={handleCreateNotification}
            style={globalStyles.container}
            mode="contained">
            Create Notification
          </Button>
        </View>
      </Container>
    </PageContainer>
  );
}
