import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Spinner from 'react-native-spinkit';

const Loading = ({ text }) => (
  <View style={styles.container}>
    <Spinner
      style={styles.spinner}
      isVisible={true}
      size={100}
      type={'Pulse'}
      color={'#faf6bc'}
    />
    <Text style={styles.text}>{text ? text : 'Loading...'}</Text>
  </View>
);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004363'
  },
  spinner: {
    marginBottom: 50
  },
  text: {
    color: '#faf6bc',
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Loading;
