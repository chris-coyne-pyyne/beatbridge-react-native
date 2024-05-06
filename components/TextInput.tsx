import React from 'react';
import {TextInput as Input, View, StyleSheet, Text} from 'react-native';

// Define the props type for TypeScript support
type CustomTextInputProps = {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  label: string;
};

export const TextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  label,
}: CustomTextInputProps) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Input
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: '#333',
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#000',
    borderStyle: 'solid',
    borderRadius: 5,
  },
});
