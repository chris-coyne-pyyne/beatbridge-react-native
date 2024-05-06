import {
  Button as RnButton,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {colors} from '../styles/colors';

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sm: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    text: {
      fontSize: 12,
    },
  },
  md: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    text: {
      fontSize: 16,
    },
  },
  lg: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    text: {
      fontSize: 20,
    },
  },
  disabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
});

type ButtonProps = {
  title: string;
  onPress: () => void;
  theme?: 'primary' | 'danger';
  filled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
};

export const Button = ({
  title,
  onPress,
  filled,
  size = 'md',
  disabled,
  theme = 'primary',
}: ButtonProps) => {
  const backgroundColor = filled ? colors[theme] : 'transparent';
  const textColor = filled ? '#ffffff' : colors[theme];
  const borderColor = colors[theme];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        styles[size],
        {backgroundColor, borderColor, borderWidth: filled ? 0 : 2},
        disabled && styles.disabled,
      ]}
      activeOpacity={0.8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Button labeled ${title}`}
      accessibilityState={{disabled}}
      disabled={disabled}>
      <Text style={[styles.text, {color: textColor}, styles[size].text]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
