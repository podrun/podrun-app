import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Controls = ({ paused, onPressPlay, onPressPause }) => (
  <View style={styles.controls}>
    {!paused ? (
      <TouchableOpacity onPress={onPressPause}>
        <Text>Pause</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={onPressPlay}>
        <Text>Play</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  controls: {
    flex: 1,
    flexDirection: 'row',
    height: 400
  }
});

export default Controls;
