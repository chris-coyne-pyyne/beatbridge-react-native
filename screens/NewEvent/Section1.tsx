import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useFormContext, Controller} from 'react-hook-form';
import {Button, Text, Icon} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const Section1 = ({setStep}: any) => {
  const {register, watch, setValue, control} = useFormContext();
  const allValues = watch();

  const selectImage = async () => {
    const result = await launchImageLibrary();

    console.log('result ', result);
    setValue('imageSource', result);
  };

  console.log('all values ', allValues);
  return (
    <ScrollView>
      <Text variant="titleLarge" style={styles.container}>
        Event Thumbnail
      </Text>
      <View style={styles.container}>
        {/* TODO - add a way to reselect image if they want to change */}
        {allValues?.imageSource.assets ? (
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: allValues.imageSource.assets[0].uri,
              }}
              style={{width: 200, height: 200}}
            />
          </View>
        ) : (
          <TouchableOpacity onPress={selectImage} style={styles.imagePicker}>
            <Icon source="camera" size={20} />
            <Text>Select Image</Text>
          </TouchableOpacity>
        )}
      </View>
      <Button
        onPress={() => setStep(0)}
        mode="contained"
        style={styles.container}>
        Prev Section
      </Button>
      <Button
        onPress={() => setStep(2)}
        mode="contained"
        style={styles.container}>
        Next Section
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  imagePicker: {
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
