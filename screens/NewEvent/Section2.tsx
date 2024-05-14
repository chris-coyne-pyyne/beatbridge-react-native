import {ScrollView, StyleSheet, View} from 'react-native';
import {TextInput, Button, Text, Card, IconButton} from 'react-native-paper';
import {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {BandSet} from '../../types/event';
import {useFormContext, Controller} from 'react-hook-form';
import {formatDate} from '../../utils/dates';
import {DateInput} from './components/DateInput';

export const Section2 = ({setStep, isLoading}: any) => {
  const {watch, setValue} = useFormContext();
  const allValues = watch();

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
      <Text variant="titleLarge" style={styles.container}>
        Event Itinerary
      </Text>
      <View style={[styles.dateInputContainer, styles.container]}>
        <DateInput
          onPress={() => setStartDateVis(true)}
          text={`Start: ${allValues.startDate}` || 'Start Date'}
        />
        <DateInput
          onPress={() => setEndDateVis(true)}
          text={`End: ${allValues.endDate}` || 'End Date'}
        />
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

      <Text variant="titleLarge" style={[styles.marginTop, styles.container]}>
        Add a New Artist
      </Text>
      <View style={[styles.marginTop, styles.container]}>
        <TextInput
          label="Artist Name"
          value={artist}
          onChangeText={setArtist}
        />
      </View>
      <View style={[styles.dateInputContainer, styles.container]}>
        <DateInput
          onPress={() => {
            console.log('setting start time vis... ', artistStartTimeVis);
            setArtistStartTimeVis(true);
          }}
          text={`Start: ${startTime}` || 'Start Time'}
        />
        <DateInput
          onPress={() => setArtistEndTimeVis(true)}
          text={`End: ${endTime}` || 'End Time'}
        />
      </View>
      <View style={styles.container}>
        <DateInput
          onPress={() => setArtistDateVis(true)}
          text={`Date: ${artistDate}` || 'Set Date'}
        />
      </View>
      <View style={styles.addArtistBtnContainer}>
        <Button
          onPress={() => handleAddArtist()}
          mode="contained"
          icon="plus"
          style={styles.container}>
          Add Artist
        </Button>
      </View>
      <Text variant="titleLarge" style={[styles.marginTop, styles.container]}>
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
        onCancel={() => setArtistStartTimeVis(false)}
      />
      <DateTimePickerModal
        isVisible={artistEndTimeVis}
        mode="time"
        onConfirm={handleEndTimeArtistConfirm}
        onCancel={() => setArtistEndTimeVis(false)}
      />
      <Button
        onPress={() => setStep(1)}
        mode="outlined"
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
  addArtistBtnContainer: {
    paddingLeft: '20%',
    paddingRight: '20%',
  },
});
