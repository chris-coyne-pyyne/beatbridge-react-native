import {Text as RNText, StyleSheet} from 'react-native';

type TextProps = {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  weight?: string;
  children: any;
};

export const TextSizeStyles = StyleSheet.create({
  small: {fontSize: 12},
  medium: {fontSize: 16},
  large: {fontSize: 20, color: 'black'},
  xlarge: {fontSize: 24, color: 'black'},
});

export const TextWeightStyles = StyleSheet.create({
  normal: {fontWeight: 'normal'},
  bold: {fontWeight: 'bold'},
});

export const Text = ({
  children,
  size = 'medium',
  weight = 'normal',
}: TextProps) => {
  return (
    <RNText style={[TextSizeStyles[size], TextWeightStyles[weight]]}>
      {children}
    </RNText>
  );
};
