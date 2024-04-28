import {useState} from 'react';
import {Text, View, Button, StyleSheet, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {globalStyles} from '../../styles/Styles';
import {User} from '../../types/user';

const styles = StyleSheet.create({
  input: {
    width: '80%', // Specifies width relative to the container
    padding: 10, // Padding inside the text input
    marginVertical: 8, // Margin vertically between inputs
    borderWidth: 1, // Width of the border around the text input
    borderColor: '#ddd', // Color of the border
    borderRadius: 6, // Rounds the corners of the border
    backgroundColor: '#fff', // Background color of the input
  },
});

export function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await AsyncStorage.setItem('userToken', 'TEST TOKEN');
    const testToken = await AsyncStorage.getItem('userToken');
    console.log('test token ', testToken);
    console.log('Login attempt with:', email, password);

    try {
      /*
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos/1',
      );
      */
      let response;

      // mock for now
      const user: User = {
        name: 'christopher coyne',
        email: 'chris@pyyne.com',
        token: 'token...',
      };
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // Handle success
      navigation.navigate('Home');
    } catch (error) {
      // Handle errors
      console.error(
        'Login error:',
        error.response ? error.response.data : error,
      );
      Alert.alert(
        'Login Failed',
        error.response ? error.response.data.message : 'An error occurred.',
      );
    }
  };
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // Hides the password text
        autoCapitalize="none"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
