import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Icon} from 'react-native-paper';

export const DateInput = ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Icon source="calendar" size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#eeeeee',
    borderRadius: 12,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 12,
  },
  text: {
    marginRight: 12,
  },
});
