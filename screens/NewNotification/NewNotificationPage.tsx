import {useState} from 'react';
import {Text, View, Button, StyleSheet, TextInput, Alert} from 'react-native';
import {globalStyles} from '../../styles/Styles';
import {User} from '../../types/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export function NewNotificationScreen({navigation}) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateNotification = () => {
    /*
     * send notification with bridgefy, then add it locally
     */
    console.log('sending notification...');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter message"
        value={message}
        multiline
        numberOfLines={4}
        onChangeText={setMessage}
      />
      <Button title="Create Notification" onPress={handleCreateNotification} />
    </View>
  );
}
