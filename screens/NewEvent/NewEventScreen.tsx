import {useContext, useState} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {AppContext} from '../../stores/store';
import {launchImageLibrary} from 'react-native-image-picker';
import StepCounter from './StepCounter';
import {Section0} from './Section0';
import {Section1} from './Section1';
import {Section2} from './Section2';
import Toast from 'react-native-toast-message';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Event} from '../../types/event';
import {useMutation} from 'react-query';
import {apiClient} from '../../api/axiosConfig';
import {BandSet} from '../../types/event';
import {useForm, FormProvider} from 'react-hook-form';

const showToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Event created',
    text2: 'Your event has been successfully created',
  });
};

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
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const methods = useForm({defaultValues: emptyForm, mode: 'onSubmit'});

  const context = useContext(AppContext);

  const user = context?.globalState.user;
  const isUserLoading = context?.globalState.userLoading;

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

  const selectImage = async () => {
    const result = await launchImageLibrary();

    console.log('result ', result);
    setImageSource(result);
  };

  return (
    <FormProvider {...methods}>
      <View style={{padding: 12, flex: 1}}>
        <StepCounter currentStep={step} totalSteps={3} />
        {step === 0 ? (
          <Section0 setStep={setStep} />
        ) : step === 1 ? (
          <Section1
            selectImage={selectImage}
            imageSource={imageSource}
            setStep={setStep}
          />
        ) : (
          <Section2 setStep={setStep} isLoading={isLoading} />
        )}
      </View>
    </FormProvider>
  );
};
