import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {SegmentedButtons} from 'react-native-paper';
import {NavigationProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../types/nav';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export const MessagesTabs = ({navigation}: any) => {
  // const [value, setValue] = React.useState('');
  const route = useRoute();
  const params = route.params;
  const value = params?.messageType || 'Board';

  const updateParams = (newVal: string) => {
    navigation.setParams({messageType: newVal});
  };
  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={updateParams}
        buttons={[
          {
            value: 'Board',
            label: 'Board',
            icon: 'message',
          },
          {
            value: 'Alerts',
            label: 'Alerts',
            icon: 'exclamation-thick',
          },
          {value: 'Reports', label: 'Reports', icon: 'pencil'},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
});
