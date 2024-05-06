import {useContext, useState} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {Button} from '../../components/Button';
import {AppContext} from '../../stores/store';
import {TextInput as BBTextInput} from '../../components/TextInput';
import {Text, TextStyles} from '../../components/Text';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {BBContainer} from '../../components/Container';
import StepCounter from './StepCounter';
import {Section0} from './Section0';
import {Section1} from './Section1';
import {Section2} from './Section2';
import Toast from 'react-native-toast-message';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Event} from '../../types/event';
import {generateRandomString} from '../../utils/randomNumber';

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
  const context = useContext(AppContext);
  const [imageSource, setImageSource] = useState(null);

  // date picker stuff
  const [startVis, setStartVis] = useState(false);
  const [endVis, setEndVis] = useState(false);

  const handleEndConfirm = date => {
    console.warn('A date has been picked: ', date);
    setEndVis;
  };

  const handleStartConfirm = date => {
    console.warn('A date has been picked: ', date);
    setStartVis(false);
  };

  const selectImage = async () => {
    const result = await launchImageLibrary();

    console.log('result ', result);
    setImageSource(result);
  };

  const handleCreate = async () => {
    // create new event with data - save to API, and also save locally afterwards
    // send to api

    if (context?.globalState.events) {
      // TO DO - send post request to backend to create

      // create new event
      const newEvent: Event = {
        name,
        genre,
        description,
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

  return (
    <BBContainer>
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
          handleCreate={handleCreate}
          setStep={setStep}
        />
      )}
    </BBContainer>
  );
};
