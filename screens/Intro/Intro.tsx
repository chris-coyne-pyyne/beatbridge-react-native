import {NavigationProp} from '@react-navigation/native';
import {View, Image, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {RootStackParamList} from '../../types/nav';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export const IntroScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Home_no_login_background.png')}
        style={{width: 250, height: 250}}
      />
      <View>
        <Text variant="headlineLarge">Beat Bridge</Text>
      </View>
      <View style={styles.view}>
        <Text variant="bodyLarge" style={{textAlign: 'center'}}>
          Feel the music, stay connected – only with Beat Bridge.
        </Text>
      </View>
      <View style={styles.view}>
        <Button mode="contained" onPress={() => navigation.navigate('Signup')}>
          Sign Up
        </Button>
      </View>
      <View style={styles.view}>
        <Button mode="outlined" onPress={() => navigation.navigate('Login')}>
          Log In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  view: {
    textAlign: 'center',
    marginTop: 12,
    width: '80%',
  },
});
