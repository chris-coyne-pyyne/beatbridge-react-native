import {useContext, useState} from 'react';
import {Text, View, Button, ScrollView, StyleSheet} from 'react-native';
import {AppContext} from '../../stores/store';
import {TextInput as BBTextInput} from '../../components/TextInput';

export const Section0 = ({
  name,
  setName,
  genre,
  setGenre,
  description,
  setDescription,
  setStep,
}: any) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text size="xlarge" weight="bold">
          Event Description
        </Text>

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

        <Button title="Next Section" onPress={() => setStep(1)} filled />
      </ScrollView>
    </View>
  );
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
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: 16,
  },
});
