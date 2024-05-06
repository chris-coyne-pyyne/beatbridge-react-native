import {View, StyleSheet, useWindowDimensions} from 'react-native';

type ContainerProps = {
  children: any;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'green',
    minHeight: '100%',
  },
});

export const Container = ({children}: ContainerProps) => {
  const {height: screenHeight} = useWindowDimensions();
  return <View style={{padding: 16}}>{children}</View>;
};
