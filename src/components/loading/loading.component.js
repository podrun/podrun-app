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
      color={'#4286f4'}
    />
    <Text style={styles.text}>{text ? text : 'Loading...'}</Text>
  </View>
);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  spinner: {
    marginBottom: 50
  },
  text: {
    color: '#4286f4',
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default Loading;
