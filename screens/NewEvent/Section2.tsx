import {ScrollView, StyleSheet, View} from 'react-native';
import {TextInput, Button, Text, Card, IconButton} from 'react-native-paper';
import {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {BandSet} from '../../types/event';
import {useFormContext, Controller} from 'react-hook-form';
import {formatDate} from '../../utils/dates';

export const Section2 = ({setStep, isLoading}: any) => {
  const {register, watch, setValue, control} = useFormContext();
  const allValues = watch();

  console.log('all values ', allValues);
  // artist states
  const [artist, setArtist] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [artistStartTimeVis, setArtistStartTimeVis] = useState(false);
  const [artistEndTimeVis, setArtistEndTimeVis] = useState(false);
  const [artistDateVis, setArtistDateVis] = useState(false);
  const [artistDate, setArtistDate] = useState('');

  // modal visibility
  const [startDateVis, setStartDateVis] = useState(false);
  const [endDateVis, setEndDateVis] = useState(false);

  const handleStartDate = date => {
    console.log('date ', date);
    const formatted = formatDate(date).formattedDate;
    setValue('startDate', formatted);
    setStartDateVis(false);
  };

  const handleEndDate = date => {
    console.log('date ', date);
    const formatted = formatDate(date).formattedDate;
    setValue('endDate', formatted);
    setEndDateVis(false);
  };

  // artist specific functions
  const handleStartTimeArtistConfirm = time => {
    const formattedTime = formatDate(time).formattedTime;
    console.log('time ', time);
    setStartTime(formattedTime);
    setArtistStartTimeVis(false);
  };

  const handleEndTimeArtistConfirm = time => {
    const formattedTime = formatDate(time).formattedTime;
    console.log('time ', time);
    setEndTime(formattedTime);
    setArtistEndTimeVis(false);
  };

  const handleArtistDateConfirm = date => {
    const formattedDate = formatDate(date).formattedDate;
    console.log('time ', date);
    setArtistDate(formattedDate);
    setArtistDateVis(false);
  };

  const handleAddArtist = () => {
    const prevArtists = allValues.artists;
    const newArtist: BandSet = {
      date: artistDate,
      startTime,
      endTime,
      player: artist,
    };
    const newArtists = [...prevArtists, newArtist];
    setValue('artists', newArtists);

    // reset all form values
    setArtistDate('');
    setEndTime('');
    setStartTime('');
    setArtist('');
  };

  const handleCreate = () => {
    /*
  const handleAddArtist = () => {
    const testNewSet: BandSet = {
      date: 'May 1st',
      startTime: '11 am',
      endTime: '12 pm',
      player: artist,
    };
    setArtists((prev: BandSet[]) => [...prev, testNewSet]);
  };
  */

    console.log('creating...');
  };

  const removeArtist = (player: string) => {
    const newArtists = allValues.artists.filter(
      (artist: BandSet) => artist.player !== player,
    );
    setValue('artists', newArtists);
  };

  return (
    <ScrollView>
      <Text variant="titleLarge" style={styles.marginTop}>
        Event Itinerary
      </Text>
      <View style={styles.dateInputContainer}>
        <View>
          <IconButton icon="calendar" onPress={() => setStartDateVis(true)} />
          <Text>Start Date {allValues.startDate}</Text>
        </View>
        <View>
          <Text>End Date {allValues.endDate}</Text>
          <IconButton icon="calendar" onPress={() => setEndDateVis(true)} />
        </View>
      </View>
      <DateTimePickerModal
        isVisible={startDateVis}
        mode="date"
        onConfirm={handleStartDate}
        onCancel={() => setStartDateVis(false)}
      />
      <DateTimePickerModal
        isVisible={endDateVis}
        mode="date"
        onConfirm={handleEndDate}
        onCancel={() => setEndDateVis(false)}
      />
      <Text variant="titleLarge" style={styles.marginTop}>
        Artists
      </Text>
      {allValues.artists.map((artist: BandSet) => (
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
      <View style={styles.dateInputContainer}>
        <View>
          <Text>Start time: {startTime}</Text>
          <IconButton
            icon="calendar"
            onPress={() => {
              console.log('pressing...');
              setArtistStartTimeVis(true);
            }}
          />
        </View>
        <View>
          <Text>End time: {endTime}</Text>
          <IconButton
            icon="calendar"
            onPress={() => {
              console.log('here ');
              setArtistEndTimeVis(true);
            }}
          />
        </View>
      </View>
      <View>
        <Text>Set Date: {artistDate}</Text>
        <IconButton
          icon="calendar"
          onPress={() => {
            setArtistDateVis(true);
          }}
        />
      </View>
      {/* artist specific modals */}
      <DateTimePickerModal
        isVisible={artistDateVis}
        mode="date"
        onConfirm={handleArtistDateConfirm}
        onCancel={() => setArtistDateVis(false)}
      />
      <DateTimePickerModal
        isVisible={artistStartTimeVis}
        mode="time"
        onConfirm={handleStartTimeArtistConfirm}
        onCancel={() => setArtistEndTimeVis(false)}
      />
      <DateTimePickerModal
        isVisible={artistEndTimeVis}
        mode="time"
        onConfirm={handleEndTimeArtistConfirm}
        onCancel={() => setArtistEndTimeVis(false)}
      />
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
