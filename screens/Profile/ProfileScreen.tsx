import {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Text,
  Avatar,
  ActivityIndicator,
  Card,
  Divider,
} from 'react-native-paper';
import {PageContainer} from '../../components/PageContainer';
import {AppContext} from '../../stores/store';
import {globalStyles} from '../../styles/Styles';

export const ProfileScreen = ({navigation}: any) => {
  const globalContext = useContext(AppContext);
  const user = globalContext?.globalState.user;

  const pastEvents =
    (globalContext?.globalState.events
      ? globalContext.globalState.events.filter(event => event.active !== true)
      : []) || [];

  return (
    <PageContainer navigation={navigation}>
      <View style={{padding: 16, flex: 1}}>
        <View style={[styles.container, globalStyles.container]}>
          {globalContext?.globalState.userLoading ? (
            <ActivityIndicator size={32} />
          ) : (
            <View style={styles.avatarContainer}>
              <Avatar.Image
                size={100}
                source={require('../../assets/avatar.jpeg')}
              />
              <Text variant="titleLarge">{user?.name}</Text>
              <Text variant="bodyLarge">{user?.email}</Text>
            </View>
          )}
        </View>
        <Divider style={globalStyles.container} />
        <ScrollView>
          <Text
            variant="bodyLarge"
            style={[globalStyles.container, {textAlign: 'center'}]}>
            Past Events
          </Text>
          <View>
            {pastEvents &&
              pastEvents.map(event => (
                <Card key={event.id} style={[styles.eventCard]}>
                  <Text variant="titleLarge">{event.name}</Text>
                  <Text variant="bodyLarge" style={globalStyles.container}>
                    {event.description}
                  </Text>
                </Card>
              ))}
          </View>
        </ScrollView>
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    style: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventCard: {
    display: 'flex',
    flexDirection: 'row',
    padding: 12,
    margin: 12,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
