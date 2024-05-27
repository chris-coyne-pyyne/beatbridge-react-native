import {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from 'react-query';

import {Button, Text, Avatar} from 'react-native-paper';
import {AppContext} from '../../stores/store';
import {apiClient} from '../../api/axiosConfig';
import {Message} from '../../types/message';
import {MessagesTabs} from './MessagesTabs';
import {Container} from '../../components/Container';

export function MessageBoardScreen({navigation}: any) {
  const context = useContext(AppContext);

  // const messages = context?.globalState.messages;

  const messages: Message[] = [
    {
      mode: 'report',
      id: '123',
      date: 123,
      message: 'test message please ignore',
      sender: {
        id: '123',
        email: 'chris@gmail.com',
        name: 'chris coyne',
      },
    },
    {
      mode: 'report',
      id: '123123',
      date: 123,
      message: 'test message please ignore',
      sender: {
        id: '123',
        email: 'chris@gmail.com',
        name: 'chris coyne',
      },
    },
    {
      mode: 'report',
      id: '123333',
      date: 123,
      message: 'test message please ignore',
      sender: {
        id: '123',
        email: 'chris@gmail.com',
        name: 'chris coyne',
      },
    },
    {
      mode: 'report',
      id: '123asdf',
      date: 123,
      message: 'test message please ignore',
      sender: {
        id: '123',
        email: 'chris@gmail.com',
        name: 'chris coyne',
      },
    },

    {
      mode: 'report',
      id: '123asdfas',
      date: 123,
      message: 'test message please ignore',
      sender: {
        id: '123',
        email: 'chris@gmail.com',
        name: 'chris coyne',
      },
    },
    {
      mode: 'report',
      id: '123123fdd',
      date: 123,
      message: 'test message please ignore',
      sender: {
        id: '123',
        email: 'chris@gmail.com',
        name: 'chris coyne',
      },
    },
    {
      mode: 'report',
      id: '123333we',
      date: 123,
      message: 'test message please ignore',
      sender: {
        id: '123',
        email: 'chris@gmail.com',
        name: 'chris coyne',
      },
    },
    {
      mode: 'report',
      id: '123asdfsfdm',
      date: 123,
      message: 'test message please ignore',
      sender: {
        id: '123',
        email: 'chris@gmail.com',
        name: 'chris coyne',
      },
    },
  ];

  return (
    <Container>
      <MessagesTabs navigation={navigation} />
      <ScrollView style={styles.pageContainer}>
        <Text variant="headlineLarge">Message Board</Text>
        <View style={styles.messagesContainer}>
          {messages &&
            messages.map(message => (
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
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('NewMessage')}>
            Send New Message
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
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
