import {ScrollView, StyleSheet, View} from 'react-native';
import {TextInput, Button, Text, Card, IconButton} from 'react-native-paper';
import {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {BandSet} from '../../types/event';

export const Section2 = ({
  setStartVis,
  setEndVis,
  endVis,
  startVis,
  handleStartConfirm,
  handleEndConfirm,
  handleCreate,
  setStep,
  endDate,
  startDate,
  isLoading,
  artists,
  setArtists,
}: any) => {
  console.log('END IN SEC 2 ', endDate);
  const [artist, setArtist] = useState('');
  const handleAddArtist = () => {
    const testNewSet: BandSet = {
      date: 'May 1st',
      startTime: '11 am',
      endTime: '12 pm',
      player: artist,
    };
    setArtists((prev: BandSet[]) => [...prev, testNewSet]);
  };

  const removeArtist = (player: string) => {
    const newArtists = artists.filter(artist => artist.player !== player);
    setArtists(newArtists);
  };
  return (
    <ScrollView>
      <Text variant="titleLarge" style={styles.marginTop}>
        Event Itinerary
      </Text>
      <View style={styles.dateInputContainer}>
        <TextInput
          label="Start Date"
          value={startDate}
          style={styles.container}
          right={
            <TextInput.Icon icon="calendar" onPress={() => setStartVis(true)} />
          }
        />
        <TextInput
          label="End Date"
          style={styles.container}
          value={endDate}
          right={
            <TextInput.Icon icon="calendar" onPress={() => setEndVis(true)} />
          }
        />
      </View>
      <DateTimePickerModal
        isVisible={startVis}
        mode="date"
        onConfirm={handleStartConfirm}
        onCancel={() => setStartVis(false)}
      />
      <DateTimePickerModal
        isVisible={endVis}
        mode="date"
        onConfirm={handleEndConfirm}
        onCancel={() => setEndVis(false)}
      />
      <Text variant="titleLarge" style={styles.marginTop}>
        Artists
      </Text>
      {artists.map((artist: BandSet) => (
        <Card key={artist.player}>
          <View style={styles.card}>
            <Text variant="bodyLarge">{artist.player}</Text>
            <IconButton
              icon="trash-can"
              size={20}
              onPress={() => removeArtist(artist.player)}
            />
          </View>
        </Card>
      ))}

      <Text variant="titleLarge" style={styles.marginTop}>
        Add a New Artist
      </Text>
      <View>
        <TextInput
          label="Artist Name"
          value={artist}
          onChangeText={setArtist}
        />
      </View>
      <Button
        onPress={() => handleAddArtist()}
        mode="contained"
        style={styles.container}>
        Add Artist
      </Button>
      <Button
        onPress={() => setStep(1)}
        mode="contained"
        style={styles.container}>
        Prev Section
      </Button>
      <Button
        onPress={() => handleCreate()}
        mode="contained"
        loading={isLoading}
        style={styles.container}>
        Create Event
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
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
  dateInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
});
