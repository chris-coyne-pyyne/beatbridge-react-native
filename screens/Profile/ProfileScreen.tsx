import {useContext} from 'react';
import {View, Button} from 'react-native';
import {Text} from 'react-native-paper';
import {BridgefyContext} from '../../stores/bridgefyStore';
import {BridgefyTransmissionModeType} from 'bridgefy-react-native';
import {AppContext} from '../../stores/store';

// TODO - make this proper - show friends if decide to implement that feature
export const ProfileScreen = () => {
  const context = useContext(BridgefyContext);
  const globalContext = useContext(AppContext);
  const user = globalContext?.globalState.user;
  console.log('initalized ', context?.bridgefyState?.initialized);

  const getIsStarted = async () => {
    const isStarted = await context?.bridgefyState.bridgefy.isStarted();
    console.log('is started ', isStarted);
  };

  getIsStarted();

  const log = (event: string, body: any, error = false) => {
    if (error) {
      console.error(event, body);
    } else {
      console.log(event, body);
    }
  };
  return (
    <View>
      <Text>Bridgefy Testing</Text>
      <Text>
        Initialized: {context?.bridgefyState?.initialized ? 'TRUE' : 'FALSE'}
      </Text>
      {!globalContext?.globalState.userLoading && (
        <Button
          title="Send data"
          onPress={() =>
            context?.bridgefyState.bridgefy
              .send('Hello world', {
                type: BridgefyTransmissionModeType.broadcast,
                uuid: '123e4567-e89b-12d3-a456-426614174000',
              })
              .then((result: any) => {
                log(`Sent message`, result);
              })
              .catch((e: any) => {
                log('error ', e);
              })
          }
        />
      )}
    </View>
  );
};
