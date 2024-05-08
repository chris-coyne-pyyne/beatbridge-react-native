import {useContext, useState} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {Button} from '../../components/Button';
import {AppContext} from '../../stores/store';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Container} from '../../components/Container';
import StepCounter from './StepCounter';
import {Section0} from './Section0';
import {Section1} from './Section1';
import {Section2} from './Section2';
import Toast from 'react-native-toast-message';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Event} from '../../types/event';
import {generateRandomString} from '../../utils/randomNumber';
import {formatDate} from '../../utils/dates';
import {useMutation} from 'react-query';
import {apiClient} from '../../api/axiosConfig';
import {create} from 'react-test-renderer';

const showToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Hello',
    text2: 'This is some something 👋',
  });
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

export const NewEventScreen = ({navigation}) => {
  const {data: events} = useAsyncStorage<Event[]>('events');
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const context = useContext(AppContext);

  const user = context?.globalState.user;

  // date picker stuff
  const [startVis, setStartVis] = useState(false);
  const [endVis, setEndVis] = useState(false);

  // axios
  const {mutate, isLoading, error} = useMutation(
    async () => {
      const response = await apiClient.post('event', {
        name,
        genre,
        description,
        imageSource,
        startDate,
        endDate,
        userId: user && user !== 'loading' ? user.id : '',
      });
      return response.data;
    },
    {
      onSuccess: async data => {
        console.log('data ', data);
        const newLocalEvents = events || [];
        for (const e of newLocalEvents) {
          e.active = false;
        }

        const createdEvent = {...data, active: true};

        console.log('WILL ADD EVENT ', [...newLocalEvents, createdEvent]);

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
      onError: err => {
        // Optional: Handle error in mutation state
        console.error(
          'Error logging in:',
          err.response ? err.response.data.message : err.message,
        );
      },
    },
  );

  const handleEndConfirm = date => {
    console.log('handle end confrim');
    const formatted = formatDate(date);
    setEndDate(formatted);
    setEndVis(false);
  };

  const handleStartConfirm = date => {
    console.log('handle start confirm');
    const formatted = formatDate(date);
    setStartDate(formatted);
    setStartVis(false);
  };

  const selectImage = async () => {
    const result = await launchImageLibrary();

    console.log('result ', result);
    setImageSource(result);
  };

  console.log('END ', endDate);

  const handleCreate = async () => {
    // create new event with data - save to API, and also save locally afterwards
    console.log(
      'relevant info: ',
      name,
      genre,
      description,
      imageSource,
      startDate,
      endDate,
    );
    return;
    // send to api

    if (context?.globalState.events) {
      // TO DO - send post request to backend to create

      // create new event
      const newEvent: Event = {
        name: 'Vans Warped Tour 2001',
        genre: 'Pop Punk',
        description: 'lorem ipsum...',
        active: true,
        id: generateRandomString(16),
        organizer: 'chris.coyne@pyyne.com',
      };

      // after API request - update all events in local database
      console.log(
        'SETTING ASYNC WITH NEW EVENTS ',
        'events ',
        events,
        ' new event ',
        newEvent,
      );
      const newLocalEvents = events || [];
      for (const e of newLocalEvents) {
        e.active = false;
      }

      console.log('WILL ADD EVENT ', [...newLocalEvents, newEvent]);

      await AsyncStorage.setItem(
        'events',
        JSON.stringify([...newLocalEvents, newEvent]),
      );
      context?.updateGlobalState({
        events: [...newLocalEvents, newEvent],
      });

      showToast();
      navigation.navigate('Home');
    }
  };

  console.log('step ', step);

  return (
    <Container>
      <StepCounter currentStep={step} totalSteps={3} />
      {step === 0 ? (
        <Section0
          name={name}
          setName={setName}
          genre={genre}
          setGenre={setGenre}
          description={description}
          setDescription={setDescription}
          setStep={setStep}
        />
      ) : step === 1 ? (
        <Section1
          selectImage={selectImage}
          imageSource={imageSource}
          setStep={setStep}
        />
      ) : (
        <Section2
          setStartVis={setStartVis}
          setEndVis={setEndVis}
          endVis={endVis}
          startVis={startVis}
          handleStartConfirm={handleStartConfirm}
          handleEndConfirm={handleEndConfirm}
          handleCreate={mutate}
          setStep={setStep}
        />
      )}
    </Container>
  );
};
