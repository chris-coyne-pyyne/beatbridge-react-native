import {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container} from '../../components/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Report} from '../../types/report';
import {generateRandomString} from '../../utils/randomNumber';
import {AppContext} from '../../stores/store';
import {BridgefyContext} from '../../stores/bridgefyStore';
import {TextInput, Button, Text} from 'react-native-paper';
import uuid from 'react-native-uuid';
import {
  Bridgefy,
  BridgefyEvents,
  BridgefyTransmissionModeType,
} from 'bridgefy-react-native';
import {Message} from '../../types/message';

const showToast = () => {
  Toast.show({
    type: 'success',
    text1: 'Sent notification',
    text2: 'Your notification has been sent to all users within your area',
  });
};

const reports = [];

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 16,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export const ReportsPage = () => {
  return (
    <Container>
      <Text variant="titleLarge">Report</Text>
      <Text variant="bodyLarge">
        Problems that festival attendees have, and have sent directly to the
        admin
      </Text>
    </Container>
  );
};
