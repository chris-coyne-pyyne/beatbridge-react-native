import {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {TextInput} from '../../components/TextInput';
import {Button} from '../../components/Button';
import {Text} from '../../components/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useMutation} from 'react-query';

import {globalStyles} from '../../styles/Styles';
import {User} from '../../types/user';
import {AppContext} from '../../stores/store';
import {Container} from '../../components/Container';
import {apiClient} from '../../api/axiosConfig';

export function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(AppContext);

  // Setup the mutation with React Query
  const {mutate, isLoading, error} = useMutation(
    async () => {
      const response = await apiClient.post('login', {
        email,
        name,
        password,
      });
      return response.data;
    },
    {
      onSuccess: async data => {
        await AsyncStorage.setItem('user', JSON.stringify(data));

        // update store
        context?.updateGlobalState({
          user: data,
        });

        // after - go to home
        navigation.navigate('Home');
      },
      onError: err => {
        // Optional: Handle error in mutation state
        console.error(
          'Error logging in:',
          err.response ? err.response.data.message : err.message,
        );
      },
    },
  );

  /*
  const handleLogin = async () => {
    console.log('handling...');
    try {
      const response = await apiClient.post('user')

      console.log('response ', response.data);
      return;
    } catch (e: any) {
      console.log('Error: ', e.message);
      if (e.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      } else if (e.request) {
        // The request was made but no response was received
        console.log(e.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', e.message);
      }
      return;
    }
    await AsyncStorage.setItem('userToken', 'TEST TOKEN');
    const testToken = await AsyncStorage.getItem('userToken');
    console.log('test token ', testToken);
    console.log('Login attempt with:', email, password);

    try {
      let response;

      // mock for now
      const user: User = {
        name: 'christopher coyne',
        email: 'chris@pyyne.com',
        token: 'token...',
      };
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // update store
      context?.updateGlobalState({
        user: user,
      });

      // after - go to home
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
  */

  return (
    <Container>
      <Text>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true} // Hides the password text
      />
      <Button title="Login" onPress={mutate} />
    </Container>
  );
}

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
