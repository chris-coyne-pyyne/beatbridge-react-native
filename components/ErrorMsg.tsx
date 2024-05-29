import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
export const ErrorMsg = ({text}: {text: string}) => {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={{fontWeight: '800', color: '#c20000'}}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffcece',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
});
