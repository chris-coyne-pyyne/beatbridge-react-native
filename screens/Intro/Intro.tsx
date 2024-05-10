import {View, Image, StyleSheet} from 'react-native';
// import {Button} from '../../components/Button';
// import {Text} from '../../components/Text';
import {Button, Text} from 'react-native-paper';

export const IntroScreen = ({navigation}) => {
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
        <Button
          title="Sign Up"
          mode="contained"
          onPress={() => navigation.navigate('Signup')}>
          Sign Up
        </Button>
      </View>
      <View style={styles.view}>
        <Button
          type="outlined"
          title="Log In"
          mode="outlined"
          onPress={() => navigation.navigate('Login')}>
          Log In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes full height of the screen
    justifyContent: 'center', // Centers content vertically in the container
    alignItems: 'center', // Centers content horizontally in the container
    padding: 16,
  },
  view: {
    textAlign: 'center',
    marginTop: 12,
    width: '80%',
  },
});
