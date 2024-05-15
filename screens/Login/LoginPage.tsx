import {useContext, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from 'react-query';

import {Button, Text, TextInput} from 'react-native-paper';
import {AppContext} from '../../stores/store';
import {apiClient} from '../../api/axiosConfig';

export function LoginScreen({navigation}: any) {
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
    },
  );

  return (
    <View>
      <View style={{width: '100%', height: '35%'}}>
        <Text variant="headlineLarge">Welcome{'\n'}Back</Text>
        <Image
          source={require('../../assets/background-abstract.png')}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.container}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            mode="flat"
          />
        </View>
        <View style={styles.container}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            mode="flat"
          />
        </View>
        <View style={styles.container}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            mode="flat"
          />
        </View>
        <View style={{marginTop: 24}}>
          <View style={styles.container}>
            <Button
              mode="contained"
              onPress={() => mutate()}
              loading={isLoading}>
              Login
            </Button>
          </View>
          <View style={[styles.container, styles.dividerContainer]}>
            <Text>Or</Text>
          </View>
          <View style={styles.container}>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Signup')}>
              Sign Up
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    top: '45%',
    left: '10%',
    zIndex: 2,
    color: 'white',
    fontWeight: 700,
  },
  container: {
    marginTop: 12,
  },
  dividerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginContainer: {
    padding: 16,
  },
});
