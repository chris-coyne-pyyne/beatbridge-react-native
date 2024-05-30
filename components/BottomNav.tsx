import {useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import {AppContext} from '../stores/store';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/nav';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export function BottomNav({navigation}: Props) {
  const context = useContext(AppContext);
  const activeEvent = context?.globalState.events
    ? context.globalState.events.find(event => event.active === true)
    : null;

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 8,
        backgroundColor: '#d5fbff',
        justifyContent: 'space-around',
      }}>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Home')}>
        <Icon source="home" size={20} />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Messages')}>
        <Icon source="message" size={20} />
        <Text>Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.buttonContainer}
        onPress={() => {
          if (activeEvent?.id) {
            navigation.navigate('Event', {id: activeEvent?.id});
          }
        }}>
        <Icon source="nature-people" size={20} />
        <Text>Event</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
  },
});
