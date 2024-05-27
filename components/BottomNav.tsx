import {useState, useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/Home/Homepage';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, Icon, Text} from 'react-native-paper';
import {AppContext} from '../stores/store';

export function BottomNav({navigation}: any) {
  const context = useContext(AppContext);
  const activeEvent = context?.globalState.events
    ? context.globalState.events.find(event => event.active === true)
    : null;

  const isAdmin = context?.globalState.user?.id === activeEvent?.organizer?.id;
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#d5fbff',
        justifyContent: 'space-between',
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
        onPress={() => navigation.navigate('MessageBoard')}>
        <Icon source="message" size={20} />
        <Text>Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.buttonContainer}
        onPress={() => navigation.navigate(isAdmin ? 'Reports' : 'NewReport')}>
        <Icon source="exclamation-thick" size={20} />
        <Text>Reports</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Event', {id: activeEvent?.id})}>
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
