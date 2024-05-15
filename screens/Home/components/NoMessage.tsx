import {Text} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

type Props = {
  text: string;
};
export const NoMessage = ({text}: Props) => {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    margin: 12,
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
