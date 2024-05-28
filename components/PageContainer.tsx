import {View} from 'react-native';
import {BottomNav} from './BottomNav';
export const PageContainer = ({children, navigation}: any) => {
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      ]}>
      {children}
      <BottomNav navigation={navigation} />
    </View>
  );
};
