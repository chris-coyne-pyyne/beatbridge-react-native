import React from 'react';
import {TextInput as Input, View, StyleSheet} from 'react-native';

// Define the props type for TypeScript support
type CustomTextInputProps = {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

export const TextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}: CustomTextInputProps) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#888" // Example of custom placeholder color
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    marginVertical: 5,
  },
  input: {
    color: '#333',
    fontSize: 16,
  },
});
