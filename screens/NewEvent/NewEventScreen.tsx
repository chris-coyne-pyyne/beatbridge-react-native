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
import {TextInput} from 'react-native-paper';
import {BandSet} from '../../types/event';
import {create} from 'react-test-renderer';
import {useForm, FormProvider} from 'react-hook-form';

const showToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Event created',
    text2: 'Your event has been successfully created',
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

type Form = {
  name: string;
  genre: string;
  description: string;
  imageSource: string;
  artists: BandSet[];
  startDate: string;
  endDate: string;
};

const emptyForm = {
  name: '',
  genre: '',
  description: '',
  imageSource: '',
  artists: [],
  startDate: '',
  endDate: '',
};

// TODO - refactor this to be less messy
export const NewEventScreen = ({navigation}) => {
  const [form, setForm] = useState<Form>(emptyForm);

  const {data: events} = useAsyncStorage<Event[]>('events');
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [artists, setArtists] = useState<BandSet[]>([]);
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [startVis, setStartVis] = useState(false);
  const [endVis, setEndVis] = useState(false);

  const methods = useForm({defaultValues: emptyForm, mode: 'onSubmit'});

  const context = useContext(AppContext);

  const user = context?.globalState.user;
  const isUserLoading = context?.globalState.userLoading;

  // date picker stuff
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeVisStartArtist, setTimeVisStartArtist] = useState(false);
  const [timeVisEndArtist, setTimeVisEndArtist] = useState(false);
  const [artistDate, setArtistDate] = useState<string | null>(null);
  const [dateVisArtist, setDateVisArtist] = useState(false);
  console.log('ROOT TIME VIS END ARTIST ', timeVisEndArtist);

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
        userId: user && !isUserLoading ? user.id : '',
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
    const formatted = formatDate(date).formattedDate;
    setEndDate(formatted);
    setEndVis(false);
  };

  const handleStartConfirm = date => {
    console.log('handle start confirm');
    const formatted = formatDate(date).formattedDate;
    setStartDate(formatted);
    setStartVis(false);
  };

  const handleEndTimeArtistConfirm = time => {
    const formattedTime = formatDate(time).formattedTime;
    console.log('time ', formattedTime);
    setEndTime(formattedTime);
    setTimeVisEndArtist(false);
  };

  const handleStartTimeArtistConfirm = time => {
    const formattedTime = formatDate(time).formattedTime;
    console.log('time ', time);
    setStartTime(formattedTime);
    setTimeVisStartArtist(false);
  };

  const selectImage = async () => {
    const result = await launchImageLibrary();

    console.log('result ', result);
    setImageSource(result);
  };

  const handleDateArtistConfirm = date => {
    const formatted = formatDate(date).formattedDate;
    setArtistDate(formatted);
    setDateVisArtist(false);
  };

  const onSubmit = data => {
    console.log('submitting...', data);
  };

  return (
    <FormProvider {...methods}>
      <View>
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
              form={form}
              setForm={setForm}
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
              startDate={startDate}
              endDate={endDate}
              isLoading={isLoading}
              artists={artists}
              setArtists={setArtists}
              handleEndTimeArtistConfirm={handleEndTimeArtistConfirm}
              handleStartTimeArtistConfirm={handleStartTimeArtistConfirm}
              timeVisStartArtist={timeVisStartArtist}
              timeVisEndArtist={timeVisEndArtist}
              setTimeVisStartArtist={setTimeVisStartArtist}
              setTimeVisEndArtist={setTimeVisEndArtist}
              startTime={startTime}
              endTime={endTime}
              artistDate={artistDate}
              setArtistDate={setArtistDate}
              dateVisArtist={dateVisArtist}
              setDateVisArtist={setDateVisArtist}
              handleDateArtistConfirm={handleDateArtistConfirm}
            />
          )}
          {/* step === 0 ? (
            <Section0
              name={name}
              setName={setName}
              genre={genre}
              setGenre={setGenre}
              description={description}
              setDescription={setDescription}
              setStep={setStep}
              form={form}
              setForm={setForm}
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
              startDate={startDate}
              endDate={endDate}
              isLoading={isLoading}
              artists={artists}
              setArtists={setArtists}
              handleEndTimeArtistConfirm={handleEndTimeArtistConfirm}
              handleStartTimeArtistConfirm={handleStartTimeArtistConfirm}
              timeVisStartArtist={timeVisStartArtist}
              timeVisEndArtist={timeVisEndArtist}
              setTimeVisStartArtist={setTimeVisStartArtist}
              setTimeVisEndArtist={setTimeVisEndArtist}
              startTime={startTime}
              endTime={endTime}
              artistDate={artistDate}
              setArtistDate={setArtistDate}
              dateVisArtist={dateVisArtist}
              setDateVisArtist={setDateVisArtist}
              handleDateArtistConfirm={handleDateArtistConfirm}
            />
          )*/}
        </Container>
      </View>
    </FormProvider>
  );
};
