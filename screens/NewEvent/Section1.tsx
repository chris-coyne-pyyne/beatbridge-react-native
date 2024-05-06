import {useContext, useState} from 'react';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {Button} from '../../components/Button';
import {Text, TextStyles} from '../../components/Text';

export const Section1 = ({selectImage, imageSource, setStep}: any) => {
  return (
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
      <Button title="Prev Section" onPress={() => setStep(0)} filled />
      <Button title="Next Section" onPress={() => setStep(2)} filled />
    </ScrollView>
  );
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
