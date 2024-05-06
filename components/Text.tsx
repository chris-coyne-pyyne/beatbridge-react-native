import {Text, StyleSheet} from 'react-native';

type TextProps = {
  title: string;
  size: string;
};

export const TextStyles = StyleSheet.create({
  small: {fontSize: 12},
  medium: {fontSize: 16},
  large: {fontSize: 20, color: 'black'},
  xlarge: {fontSize: 24, color: 'black'},
  normal: {fontWeight: 'normal'},
  bold: {fontWeight: 'bold'},
});

export const BBText = ({title}: TextProps) => {
  return <Text>{title}</Text>;
};
