import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

// Define the props type for TypeScript support
type CardProps = {
  onPress: () => void; // Function to execute on pressing the card
  children?: React.ReactNode;
};

const Card = ({children, onPress}: CardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.card}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    margin: 10,
    overflow: 'hidden', // Ensures the shadow and rounded corners are properly displayed
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  textContainer: {
    padding: 10,
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default Card;
