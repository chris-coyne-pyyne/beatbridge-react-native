import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../styles/colors';

type StepCounterProps = {
  currentStep: number;
  totalSteps: number;
};

const StepCounter = ({currentStep, totalSteps}: StepCounterProps) => {
  // Calculate the percentage of steps completed
  const percentageCompleted = ((currentStep + 1) / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <Text>
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
    marginBottom: 10,
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
    backgroundColor: colors.primary,
  },
});

export default StepCounter;
