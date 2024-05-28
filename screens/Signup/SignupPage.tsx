import {useContext, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from 'react-query';

import {Button, Text, TextInput} from 'react-native-paper';
import {AppContext} from '../../stores/store';
import {apiClient} from '../../api/axiosConfig';
import {globalStyles} from '../../styles/Styles';

export function SignupScreen({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const context = useContext(AppContext);

  // Setup the mutation with React Query
  const {mutate, isLoading, error} = useMutation(
    async () => {
      const response = await apiClient.post('signup', {
        name,
        email,
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
      <View style={{width: '100%', height: '40%'}}>
        <Text variant="headlineLarge" style={styles.title}>
          Sign Up
        </Text>
        <Image
          source={require('../../assets/background-abstract.png')}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <View style={styles.signupContainer}>
        <View style={globalStyles.container}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            mode="flat"
          />
        </View>
        <View style={globalStyles.container}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            mode="flat"
          />
        </View>
        <View style={globalStyles.container}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            mode="flat"
          />
        </View>
        <View style={{marginTop: 24}}>
          <View style={globalStyles.container}>
            <Button
              mode="contained"
              onPress={() => mutate()}
              loading={isLoading}>
              Sign Up
            </Button>
          </View>
          <View style={[globalStyles.container, styles.dividerContainer]}>
            <Text>Or</Text>
          </View>
          <View style={globalStyles.container}>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Login')}>
              Log In
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
    fontWeight: 'bold',
  },
  dividerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupContainer: {
    padding: 16,
  },
});
