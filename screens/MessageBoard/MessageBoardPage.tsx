import {useContext} from 'react';
import {View, StyleSheet} from 'react-native';

import {Button, Text} from 'react-native-paper';
import {AppContext} from '../../stores/store';
import {NoMessage} from '../Home/components/NoMessage';
import {DateMessageCard} from '../../components/messages/DateMessageCard';
import {globalStyles} from '../../styles/Styles';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/nav';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export function MessageBoardScreen({navigation}: any) {
  const context = useContext(AppContext);

  const messages = context?.globalState.messages;

  return (
    <View style={globalStyles.pageContainer}>
      <View>
        <Text variant="headlineMedium" style={[globalStyles.container]}>
          Message Board
        </Text>
        <Text variant="bodyLarge">
          Messages received by people in your vicinity
        </Text>
      </View>
      <View style={styles.messagesContainer}>
        {messages && messages.length ? (
          messages.map(message => (
            <DateMessageCard message={message} key={message.id} />
          ))
        ) : (
          <NoMessage text="No messages were found" />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('NewMessage')}>
          New Message
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
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  introContainer: {
    padding: 12,
    backgroundColor: '#aef8ff',
  },
  introTitle: {},
});
