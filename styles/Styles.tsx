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
  card: {
    backgroundColor: '#f9f9f9', // Light grey background
    borderRadius: 8, // Rounded corners
    padding: 16, // Padding around the content inside the card
    shadowColor: '#000', // Black color for shadow
    shadowOffset: {width: 0, height: 2}, // Shadow positioned slightly below the card
    shadowOpacity: 0.1, // Slightly visible shadow
    shadowRadius: 6, // Soft shadow edges
    elevation: 5, // Elevation for Android (shadow effect)
    marginBottom: 20, // Margin at the bottom of the card
  },
});
