import {useContext} from 'react';
import {View} from 'react-native';
import {Text} from '../../components/Text';
import {BridgefyContext} from '../../stores/bridgefyStore';

export const ProfileScreen = () => {
  const context = useContext(BridgefyContext);
  console.log('initalized ', context?.bridgefyState?.initialized);
  return (
    <View>
      <Text>Bridgefy Testing</Text>
      <Text>
        Initialized: {context?.bridgefyState?.initialized ? 'TRUE' : 'FALSE'}
      </Text>
    </View>
  );
};
