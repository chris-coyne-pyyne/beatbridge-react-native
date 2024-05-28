import {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Avatar, ActivityIndicator} from 'react-native-paper';
import {PageContainer} from '../../components/PageContainer';
import {AppContext} from '../../stores/store';

// TODO - make this proper - show friends if decide to implement that feature
export const ProfileScreen = ({navigation}: any) => {
  const globalContext = useContext(AppContext);
  const user = globalContext?.globalState.user;

  return (
    <PageContainer navigation={navigation}>
      <View style={styles.container}>
        {globalContext?.globalState.userLoading ? (
          <ActivityIndicator size={32} />
        ) : (
          <View>
            <Avatar.Image
              size={100}
              source={require('../../assets/avatar.jpeg')}
            />
            <Text>{user?.name}</Text>
            <Text>{user?.email}</Text>
          </View>
        )}
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    style: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
});
