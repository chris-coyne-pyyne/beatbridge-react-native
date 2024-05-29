import {ScrollView, StyleSheet, View} from 'react-native';
import {TextInput, Button, Text, Card, IconButton} from 'react-native-paper';
import {useContext, useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {BandSet} from '../../../types/event';
import {useFormContext} from 'react-hook-form';
import {formatDate} from '../../../utils/dates';
import {DateInput} from './components/DateInput';
import {useMutation} from 'react-query';
import {AppContext} from '../../../stores/store';
import {apiClient} from '../../../api/axiosConfig';
import useAsyncStorage from '../../../hooks/useAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Event} from '../../../types/event';
import {globalStyles} from '../../../styles/Styles';
import {ErrorMsg} from '../../../components/ErrorMsg';

const showToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Event created',
    text2: 'Your event has been successfully created',
  });
};

export const Section2 = ({setStep, navigation}: any) => {
  const {watch, setValue} = useFormContext();
  const allValues = watch();
  const {data: events} = useAsyncStorage<Event[]>('events');
  const [formError, setFormError] = useState(false);

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

  const context = useContext(AppContext);
  const user = context?.globalState.user;
  const isUserLoading = context?.globalState.userLoading;

  // lazy solution for MVP - find better way of doing this in future
  const handleSubmit = () => {
    if (
      !allValues.name ||
      !allValues.genre ||
      !allValues.description ||
      !allValues.imageSource ||
      !allValues.startDate ||
      !allValues.endDate
    ) {
      setFormError(true);
    } else {
      mutate();
    }
  };

  // axios
  const {mutate, isLoading} = useMutation(
    async () => {
      const response = await apiClient.post('event', {
        name: allValues.name,
        genre: allValues.genre,
        description: allValues.description,
        imageSource: allValues.imageSource,
        startDate: allValues.startDate,
        endDate: allValues.endDate,
        userId: user && !isUserLoading ? user.id : '',
        artists: allValues.artists,
      });
      return response.data;
    },
    {
      onSuccess: async data => {
        const newLocalEvents = events || [];
        for (const e of newLocalEvents) {
          e.active = false;
        }

        const createdEvent = {...data, active: true};

        await AsyncStorage.setItem(
          'events',
          JSON.stringify([...newLocalEvents, createdEvent]),
        );
        context?.updateGlobalState({
          events: [...newLocalEvents, createdEvent],
        });

        showToast();
        navigation.navigate('Home');
      },
    },
  );

  const handleStartDate = (date: Date) => {
    const formatted = formatDate(date).formattedDate;
    setValue('startDate', formatted);
    setStartDateVis(false);
  };

  const handleEndDate = (date: Date) => {
    const formatted = formatDate(date).formattedDate;
    setValue('endDate', formatted);
    setEndDateVis(false);
  };

  // artist specific functions
  const handleStartTimeArtistConfirm = (time: Date) => {
    const formattedTime = formatDate(time).formattedTime;
    setStartTime(formattedTime);
    setArtistStartTimeVis(false);
  };

  const handleEndTimeArtistConfirm = (time: Date) => {
    const formattedTime = formatDate(time).formattedTime;
    setEndTime(formattedTime);
    setArtistEndTimeVis(false);
  };

  const handleArtistDateConfirm = (date: Date) => {
    const formattedDate = formatDate(date).formattedDate;
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

  const removeArtist = (player: string) => {
    const newArtists = allValues.artists.filter(
      (artist: BandSet) => artist.player !== player,
    );
    setValue('artists', newArtists);
  };

  return (
    <ScrollView>
      <Text variant="titleLarge" style={globalStyles.container}>
        Event Itinerary
      </Text>
      <View style={[styles.dateInputContainer, globalStyles.container]}>
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

      <Text variant="titleLarge" style={[globalStyles.container]}>
        Add a New Artist
      </Text>
      <View style={[globalStyles.container]}>
        <TextInput
          label="Artist Name"
          value={artist}
          onChangeText={setArtist}
        />
      </View>
      <View style={[styles.dateInputContainer, globalStyles.container]}>
        <DateInput
          onPress={() => setArtistStartTimeVis(true)}
          text={`Start: ${startTime}` || 'Start Time'}
        />
        <DateInput
          onPress={() => setArtistEndTimeVis(true)}
          text={`End: ${endTime}` || 'End Time'}
        />
      </View>
      <View style={globalStyles.container}>
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
          style={globalStyles.container}>
          Add Artist
        </Button>
      </View>
      <Text variant="titleLarge" style={[globalStyles.container]}>
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
      {formError && <ErrorMsg text="Please enter all form fields" />}
      <Button
        onPress={() => setStep(1)}
        mode="outlined"
        style={globalStyles.container}>
        Prev Section
      </Button>
      <Button
        onPress={() => handleSubmit()}
        mode="contained"
        loading={isLoading}
        style={globalStyles.container}>
        Create Event
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
