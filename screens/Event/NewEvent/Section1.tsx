import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useFormContext} from 'react-hook-form';
import {Button, Text, Icon} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import {globalStyles} from '../../../styles/Styles';

export const Section1 = ({setStep}: any) => {
  const {watch, setValue} = useFormContext();
  const allValues = watch();

  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    setValue('imageSource', result);
  };

  return (
    <ScrollView>
      <Text variant="titleLarge" style={globalStyles.container}>
        Event Thumbnail
      </Text>
      <View style={globalStyles.container}>
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
        mode="outlined"
        style={globalStyles.container}>
        Prev Section
      </Button>
      <Button
        onPress={() => setStep(2)}
        mode="contained"
        style={globalStyles.container}>
        Next Section
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
