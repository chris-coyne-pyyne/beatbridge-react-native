import {useContext} from 'react';
import {View, StyleSheet} from 'react-native';

import {Button, Text} from 'react-native-paper';
import {AppContext} from '../../stores/store';
import {NoMessage} from '../Home/components/NoMessage';
import {DateMessageContainer} from '../../components/messages/DateMessageContainer';
import {globalStyles} from '../../styles/Styles';

export function MessageBoardScreen({navigation}: any) {
  const context = useContext(AppContext);

  const messages = context?.globalState.messages;

  /*
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
  */

  return (
    <View style={globalStyles.pageContainer}>
      <Text variant="titleLarge" style={globalStyles.container}>
        Message Board
      </Text>
      <View style={styles.messagesContainer}>
        {messages && messages.length ? (
          messages.map(message => (
            <DateMessageContainer message={message} key={message.id} />
          ))
        ) : (
          <NoMessage text="No messages were found" />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('NewMessage')}>
          Send New Message
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginVertical: 12,
  },
  buttonContainer: {
    paddingVertical: 12,
  },
});
