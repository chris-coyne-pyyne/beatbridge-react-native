import {MessagesTabs} from './MessagesTabs';
import {ScrollView, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {MessageBoardScreen} from '../MessageBoard/MessageBoardPage';
import {ReportsPage} from '../Reports/ReportsPage';
import {NotificationPage} from '../Notifications/NotificationPage';
import {PageContainer} from '../../components/PageContainer';

export const MessagesPage = ({navigation}: any) => {
  const route = useRoute();
  const params = route.params;
  const value = params?.messageType || 'Board';
  return (
    <PageContainer navigation={navigation}>
      <MessagesTabs navigation={navigation} />
      <ScrollView>
        {value === 'Board' && <MessageBoardScreen navigation={navigation} />}
        {value === 'Alerts' && <NotificationPage navigation={navigation} />}
        {value === 'Reports' && <ReportsPage navigation={navigation} />}
      </ScrollView>
    </PageContainer>
  );
};
