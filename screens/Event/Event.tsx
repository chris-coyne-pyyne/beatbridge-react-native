import {Text, View, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {globalStyles} from '../../styles/Styles';
import {Event} from '../../types/event';

export function EventScreen({route, navigation}) {
  const {id} = route.params;
  console.log('id ', id);
  const mockEvent: Event = {
    active: true,
    id: '1',
    name: 'vans warped tour 2001',
    genre: 'rock',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.',
  };

  const addEvent = async () => {
    const allEvents = await AsyncStorage.getItem('events');
    const parsedEvents = JSON.parse(allEvents || '[]');
    const newEvents = [...parsedEvents, mockEvent];
    await AsyncStorage.setItem('events', JSON.stringify(newEvents));
    navigation.navigate('Home');
  };
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>{mockEvent.name}</Text>
      <Text>{mockEvent.genre}</Text>
      <Text style={globalStyles.paragraph}>{mockEvent.description}</Text>
      <Button onClick={() => addEvent()} title={'Add Event'} />
    </View>
  );
}
