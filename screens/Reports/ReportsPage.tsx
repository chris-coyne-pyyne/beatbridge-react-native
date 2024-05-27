import {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container} from '../../components/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Report} from '../../types/report';
import {generateRandomString} from '../../utils/randomNumber';
import {AppContext} from '../../stores/store';
import {BridgefyContext} from '../../stores/bridgefyStore';
import {TextInput, Button, Text, Avatar} from 'react-native-paper';
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
    marginTop: 12,
  },
  pageContainer: {
    padding: 0,
    paddingBottom: 24,
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 2,
    padding: 12,
    borderColor: '#E1E1E1',
  },
  messageTextContainer: {
    marginLeft: 8,
  },
  messagesContainer: {
    marginBottom: 12,
  },
  buttonContainer: {
    paddingVertical: 12,
  },
});

export const ReportsPage = ({navigation}: any) => {
  const context = useContext(AppContext);
  const reports = context?.globalState.reports;

  const fakeReports = [
    {
      id: '123123123sdfs',
      sender: {
        id: '123',
        email: 'chris',
        name: 'chris',
      },
      message: 'something about xyz...',
      date: 100,
      mode: 'report',
    },
    {
      id: '123123123',
      sender: {
        id: '123',
        email: 'chris',
        name: 'chris',
      },
      message: 'something about xyz...',
      date: 100,
      mode: 'report',
    },
  ];

  const activeEvent = context?.globalState.events
    ? context.globalState.events.find(event => event.active === true)
    : null;

  const isAdmin = context?.globalState.user?.id === activeEvent?.organizer?.id;
  return (
    <Container>
      <Text variant="titleLarge" style={styles.container}>
        Report
      </Text>
      <Text variant="bodyLarge" style={styles.container}>
        Problems that festival attendees have, and have sent directly to the
        admin
      </Text>
      {isAdmin &&
        fakeReports &&
        fakeReports.map(message => (
          <View key={message.id} style={styles.messageContainer}>
            <Avatar.Image
              size={70}
              source={require('../../assets/avatar.jpeg')}
            />
            <View style={styles.messageTextContainer}>
              <Text variant="titleLarge">{message.sender?.name}</Text>
              <Text variant="bodyLarge">{message.message}</Text>
            </View>
          </View>
        ))}
      {!isAdmin && (
        <Button
          onPress={() => navigation.navigate('NewReport')}
          mode="contained"
          style={styles.container}>
          New Report
        </Button>
      )}
    </Container>
  );
};
