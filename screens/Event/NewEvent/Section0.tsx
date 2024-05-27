import {View, ScrollView, StyleSheet} from 'react-native';
import {useFormContext, Controller} from 'react-hook-form';
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

type Props = {
  setStep: (step: number) => void;
};

export const Section0 = ({setStep}: Props) => {
  const {setValue, control} = useFormContext();

  return (
    <View>
      <ScrollView>
        <Text variant="titleLarge" style={styles.container}>
          Event Description
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[styles.container]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Event Name"
            />
          )}
          name="name"
          defaultValue=""
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[styles.container]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label="Event Genre"
            />
          )}
          name="genre"
          defaultValue=""
        />
        <View style={styles.chipContainer}>
          {sampleGenres.map(genre => (
            <Chip
              key={genre}
              onPress={() => setValue('genre', genre)}
              style={styles.chip}>
              {genre}
            </Chip>
          ))}
        </View>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={[styles.container]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={4}
              label="Event Description"
            />
          )}
          name="description"
          defaultValue=""
        />

        <Button
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
