import {View} from 'react-native';
import {NoEvents} from './NoEvents';
import {ActiveEvent} from './ActiveEvent';
import {useContext, useEffect} from 'react';
import {AppContext} from '../../stores/store';
import {ActivityIndicator} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../types/nav';

type Props = {
  navigation: NavigationProp<RootStackParamList>;
};

export const HomeScreen = ({navigation}: Props) => {
  const context = useContext(AppContext);

  const activeEvent = context?.globalState.events
    ? context.globalState.events.find(event => event.active === true)
    : null;

  useEffect(() => {
    // if user is finished loading and user is empty - redirect to signup/login home
    if (!context?.globalState.userLoading && !context?.globalState.user) {
      navigation.navigate('Intro');
    }
  }, [context?.globalState.user, context?.globalState.userLoading, navigation]);

  if (context?.globalState.userLoading === true) {
    return (
      <View style={{flex: 1, paddingTop: 48}}>
        <ActivityIndicator size={48} />
      </View>
    );
  }

  if (context?.globalState.user?.email && activeEvent) {
    return <ActiveEvent activeEvent={activeEvent} navigation={navigation} />;
  }

  if (context?.globalState.user?.email) {
    return <NoEvents navigation={navigation} />;
  }

  return <View></View>;
};
