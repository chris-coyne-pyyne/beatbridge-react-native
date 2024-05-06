import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../styles/colors';

type TagProps = {
  title: string;
};

export const Tag = ({title}: TagProps) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    borderRadius: 4,
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  text: {
    color: 'white',
  },
});
