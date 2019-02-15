import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';

export default class SettingsComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { settings } = this.props
    this.setState(settings)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.settings);
  }

  render() {
    const { updateSettings } = this.props
    const { gain, tempo, isActivated } = this.state
    return (
      <View
        style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}
      >
        <CheckBox
          center
          title='Activate tempo'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={isActivated}
          onPress={() => updateSettings({ isActivated: !isActivated, gain, tempo })}
        />
        <Slider
          value={gain}
          onValueChange={gain => updateSettings({isActivated, gain, tempo})}
        />
        <Text>Gain: {gain}</Text>

        <Slider
          value={tempo}
          minimumValue={90}
          maximumValue={200}
          onValueChange={tempo => updateSettings({isActivated, gain, tempo})}
        />
        <Text>Tempo: {tempo}</Text>
      </View>
    );
  }
}
