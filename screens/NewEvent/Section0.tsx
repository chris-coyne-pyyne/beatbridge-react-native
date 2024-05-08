import {useContext, useState} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {Button} from '../../components/Button';
import {AppContext} from '../../stores/store';
import {TextInput} from '../../components/TextInput';

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
    <View>
      <ScrollView>
        <Text size="xlarge" weight="bold">
          Event Description
        </Text>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          label={'Event Name'}
        />
        <TextInput
          placeholder="Genre"
          value={genre}
          onChangeText={setGenre}
          label={'Event Genre'}
        />

        <TextInput
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
