import {Text, View, Button} from 'react-native';
import useAsyncStorage from '../../hooks/useAsyncStorage';

import {globalStyles} from '../../styles/Styles';
import {User} from '../../types/user';
import {NoEvents} from './NoEvents';

export function HomeScreen({navigation}) {
  const {data, loading, error} = useAsyncStorage<User>('user');
  console.log('DATA ', data);

  if (loading) {
    return <Text>loading...</Text>;
  }

  // return
  if (data) {
    return <NoEvents navigation={navigation} />;
  }

  if (!data) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Beat Bridge</Text>
        <Text style={globalStyles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
        <Button title="Log In" onPress={() => navigation.navigate('Login')} />
      </View>
    );
  }
}
