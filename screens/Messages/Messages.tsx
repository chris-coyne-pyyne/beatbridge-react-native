import {MessagesTabs} from './MessagesTabs';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {MessageBoardScreen} from '../MessageBoard/MessageBoardPage';
import {ReportsPage} from '../Reports/ReportsPage';
import {NewNotificationScreen} from '../Notifications/NewNotification/NewNotificationPage';
import {BottomNav} from '../../components/BottomNav';
import {Container} from '../../components/Container';
import {NotificationPage} from '../Notifications/NotificationPage';

export const MessagesPage = ({navigation}: any) => {
  const route = useRoute();
  const params = route.params;
  const value = params?.messageType || 'Board';
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      ]}>
      <MessagesTabs navigation={navigation} />
      <ScrollView>
        {value === 'Board' && <MessageBoardScreen navigation={navigation} />}
        {value === 'Alerts' && <NotificationPage navigation={navigation} />}
        {value === 'Reports' && <ReportsPage navigation={navigation} />}
      </ScrollView>
      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderWidth: 2,
  },
});
