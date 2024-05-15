import {useState} from 'react';
import {View} from 'react-native';
import StepCounter from './StepCounter';
import {Section0} from './Section0';
import {Section1} from './Section1';
import {Section2} from './Section2';
import {BandSet} from '../../types/event';
import {useForm, FormProvider} from 'react-hook-form';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

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

/*
type Props = {
  navigation: NativeStackNavigationProp
}

type Props2 = NativeStackScreenProps<RootStackParamList, 'Profile', 'MyStack'>;
*/

export const NewEventScreen = ({navigation}: any) => {
  const [step, setStep] = useState(0);

  const methods = useForm({defaultValues: emptyForm, mode: 'onSubmit'});

  return (
    <FormProvider {...methods}>
      <View style={{padding: 12, flex: 1}}>
        <StepCounter currentStep={step} totalSteps={3} />
        {step === 0 ? (
          <Section0 setStep={setStep} />
        ) : step === 1 ? (
          <Section1 setStep={setStep} />
        ) : (
          <Section2 setStep={setStep} navigation={navigation} />
        )}
      </View>
    </FormProvider>
  );
};
