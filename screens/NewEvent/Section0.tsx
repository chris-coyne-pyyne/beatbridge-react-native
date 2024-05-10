import {useContext, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {AppContext} from '../../stores/store';
import {TextInput, Button, Text, Chip} from 'react-native-paper';

const sampleGenres = [
  'Jazz',
  'Hip Hop',
  'Country',
  'Electronic',
  'Rock',
  'Emo',
  'Pop Punk',
  'Folk',
  'Indie',
];

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
        <Text variant="titleLarge" style={styles.container}>
          Event Description
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          label={'Event Name'}
          style={styles.container}
        />
        <TextInput
          value={genre}
          onChangeText={setGenre}
          label={'Event Genre'}
          style={styles.container}
        />
        <View style={styles.chipContainer}>
          {sampleGenres.map(genre => (
            <Chip onPress={() => setGenre(genre)} style={styles.chip}>
              {genre}
            </Chip>
          ))}
        </View>

        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          label={'Event Description'}
          multiline
          numberOfLines={5}
          style={styles.container}
        />

        <Button
          title="Next Section"
          onPress={() => setStep(1)}
          style={styles.container}
          mode="contained">
          Next Section
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
  },
  chip: {
    marginRight: 16,
    marginBottom: 16,
  },
});
