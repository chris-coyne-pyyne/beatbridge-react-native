import {MessagesTabs} from './MessagesTabs';
import {ScrollView, StyleSheet} from 'react-native';
import {NavigationProp, useRoute} from '@react-navigation/native';
import {MessageBoardScreen} from '../MessageBoard/MessageBoardPage';
import {ReportsPage} from '../Reports/ReportsPage';
import {NotificationPage} from '../Notifications/NotificationPage';
import {PageContainer} from '../../components/PageContainer';
import {RootStackParamList} from '../../types/nav';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export const MessagesPage = ({navigation}: Props) => {
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
