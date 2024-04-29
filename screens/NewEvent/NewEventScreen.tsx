import {useContext, useState} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {AppContext} from '../../stores/store';

export const NewEventScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const context = useContext(AppContext);

  const handleCreate = () => {
    // create new event with data - save to API, and also save locally afterwards
    // send to api
    if (context?.globalState.events) {
      const newEvent: Event = {name, genre, description, active: true};
      const oldEvents = [...context?.globalState.events];
      for (const e of oldEvents) {
        e.active = false;
      }
      const newEvents = [...context?.globalState.events, newEvent];
      console.log('new Events ', newEvents);
      context?.updateGlobalState({events: newEvents});
      navigation.navigate('Home');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>New Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Genre"
        value={genre}
        onChangeText={setGenre}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
      />

      <Button title="Create" onPress={handleCreate} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  textArea: {
    height: 100,
    padding: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
});
