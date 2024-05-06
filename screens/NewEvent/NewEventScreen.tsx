import {useContext, useState} from 'react';
import {Text, View, Button, ScrollView, StyleSheet} from 'react-native';
import {AppContext} from '../../stores/store';
import {TextInput as BBTextInput} from '../../components/TextInput';
import {TextStyles} from '../../components/Text';

export const NewEventScreen = ({navigation}) => {
  const [step, setStep] = useState(0);
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

  if (step === 0) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[TextStyles.xlarge]}>Event Description</Text>

        <BBTextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          label={'Event Name'}
        />

        <BBTextInput
          placeholder="Genre"
          value={genre}
          onChangeText={setGenre}
          label={'Event Genre'}
        />

        <BBTextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          label={'Event Description'}
        />

        <Button title="Next Section" onPress={handleCreate} />
      </ScrollView>
    );
  }

  return <Text>Step not found</Text>;
};

const styles = StyleSheet.create({
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
