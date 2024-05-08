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

  const handleCreateReport = async () => {
    // send notification with bridgefy, then add it locally
    console.log('CREATING');
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
          label="Report Title"
          placeholder="Enter message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send Report" onPress={handleCreateReport} filled />
      </View>
    </Container>
  );
};
