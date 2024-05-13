import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

type StepCounterProps = {
  currentStep: number;
  totalSteps: number;
};

const StepCounter = ({currentStep, totalSteps}: StepCounterProps) => {
  // Calculate the percentage of steps completed
  const percentageCompleted = ((currentStep + 1) / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">
        {currentStep + 1} Steps of {totalSteps}
      </Text>
      <View style={styles.progressBarContainer}>
        <View
          style={[styles.progressBar, {width: `${percentageCompleted}%`}]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative', // Added position relative
    marginBottom: 12,
  },
  progressBarContainer: {
    width: '100%',
    height: 30,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'rgb(147, 190, 255)',
  },
});

export default StepCounter;
