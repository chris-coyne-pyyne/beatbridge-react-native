import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1, // Takes up all available space in the flex container
    justifyContent: 'center', // Centers children vertically in the container
    alignItems: 'center', // Centers children horizontally in the container
    padding: 20, // Adds padding inside the container
    backgroundColor: '#fff', // Sets background color to white
  },
  title: {
    fontSize: 26, // Larger font size for titles
    fontWeight: '600', // Semi-bold font weight
    color: 'darkblue', // Text color
    marginBottom: 15, // Margin below the title
  },
  paragraph: {
    fontSize: 18, // Comfortable reading size for text
    fontWeight: '400', // Normal font weight
    color: 'grey', // Text color
    lineHeight: 24, // Line height to improve readability
  },
});
