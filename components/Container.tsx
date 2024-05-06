import {View, StyleSheet, useWindowDimensions} from 'react-native';

type ContainerProps = {
  children: any;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'green',
    height: '100%',
  },
});

export const BBContainer = ({children}: ContainerProps) => {
  const {height: screenHeight} = useWindowDimensions();
  return <View style={{height: screenHeight, padding: 16}}>{children}</View>;
};
