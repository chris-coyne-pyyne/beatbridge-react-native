import {useContext, useState} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {Button} from '../../components/Button';
import {AppContext} from '../../stores/store';
import {TextInput as BBTextInput} from '../../components/TextInput';
import {Text, TextStyles} from '../../components/Text';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {BBContainer} from '../../components/Container';

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
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const context = useContext(AppContext);
  const [imageSource, setImageSource] = useState(null);
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);

  const showEndDatePicker = () => {
    setIsEndDatePickerVisible(true);
  };
  const hideEndDatePicker = () => {
    setIsEndDatePickerVisible(false);
  };

  const hideStartDatePicker = () => {
    setIsStartDatePickerVisible(false);
  };

  const showStartDatePicker = () => {
    setIsStartDatePickerVisible(true);
  };

  const handleEndConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideEndDatePicker();
  };

  const handleStartConfirm = date => {
    console.warn('A date has been picked: ', date);
    hideStartDatePicker();
  };

  const selectImage = async () => {
    const result = await launchImageLibrary();

    console.log('result ', result);
    setImageSource(result);
  };

  const handleCreate = () => {
    // create new event with data - save to API, and also save locally afterwards
    // send to api
    if (context?.globalState.events) {
      const newEvent: Event = {name, genre, description, active: true};
      const oldEvents = [...context?.globalState.events];
      for (const e of oldEvents) {
        e.active = false;
      }
      const newEvents = [...context?.globalState.events, newEvent];
      console.log('new Events ', newEvents);
      context?.updateGlobalState({events: newEvents});
      navigation.navigate('Home');
    }
  };

  console.log('step ', step);
  if (step === 0) {
    return (
      <BBContainer>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text size="xlarge" weight="bold">
              Event Description
            </Text>

            <BBTextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              label={'Event Name'}
            />

            <BBTextInput
              placeholder="Genre"
              value={genre}
              onChangeText={setGenre}
              label={'Event Genre'}
            />

            <BBTextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              label={'Event Description'}
            />

            <Button title="Next Section" onPress={() => setStep(1)} filled />
          </ScrollView>
        </View>
      </BBContainer>
    );
  }

  if (step === 1) {
    return (
      <BBContainer>
        <ScrollView contentContainerStyle={styles.container}>
          <Text size="large" weight="bold">
            Event Thumbnail
          </Text>
          <View>
            <Button title="Select Image" onPress={selectImage} />
            {imageSource && (
              <Image
                source={{
                  uri: imageSource.assets[0].uri,
                }}
                style={{width: 200, height: 200}}
              />
            )}
          </View>
          <Button title="Next Section" onPress={() => setStep(2)} filled />
        </ScrollView>
      </BBContainer>
    );
  }

  if (step === 2) {
    return (
      <BBContainer>
        <ScrollView contentContainerStyle={styles.container}>
          <Text size="large" weight="bold">
            Event Itinerary
          </Text>
          <Button
            title="Show Start Date Picker"
            onPress={showStartDatePicker}
          />
          <Button title="Show End Date Picker" onPress={showEndDatePicker} />
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            onConfirm={handleStartConfirm}
            onCancel={hideStartDatePicker}
          />
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleEndConfirm}
            onCancel={hideEndDatePicker}
          />
        </ScrollView>
      </BBContainer>
    );
  }

  return <Text>Step not found</Text>;
};
