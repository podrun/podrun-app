import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  Slider,
  Image,
  findNodeHandle,
  DeviceEventEmitter,
  InteractionManager
} from 'react-native';

import { AudioManager, BlurView } from 'react-native-media';

const { width, height } = Dimensions.get('window');

export default class PlayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      imageData: '',
      selectedPodcast: null,
      viewRef: null
    };
    this.timeChange = this.timeChange.bind(this);
    this.addBLur = this.addBLur.bind(this);
  }

  async componentDidMount() {
    const { nav } = this.props;
    const selectedPodcast = nav.routes[nav.index].params;
    console.log('selectedPodcast', selectedPodcast);
    this.setState({
      selectedPodcast: selectedPodcast.podcast
    });

    DeviceEventEmitter.addListener(
      AudioManager.Events.onTimeChanged,
      currentTime => {
        console.log('current time ' + currentTime);
      }
    );

    AudioManager.setAudioFinishedCallback(null);

    DeviceEventEmitter.addListener(AudioManager.Events.onAudioFinished, () => {
      alert('finished!');
    });
  }

  async pause() {
    let sucess = await AudioManager.pause();
    console.log('pause: ' + sucess);
    alert(sucess);
  }

  async resume() {
    let sucess = await AudioManager.resume();
    console.log('resume: ' + sucess);
    alert(sucess);
  }

  async stop() {
    let sucess = await AudioManager.stop();
    console.log('stop: ' + sucess);
    alert(sucess);
  }

  async loadAndPlay() {
    const { selectedPodcast } = this.state;
    let sucess = await AudioManager.loadPlay(
      selectedPodcast.playbackUrl,
      1,
      false,
      40681
    );
    console.log('load and play: ' + sucess);
    alert(sucess);
  }

  timeChange(time) {
    this.setState({ time });
    AudioManager.seekTime(time * 1000);
  }

  async mute() {
    console.log('Muted');
  }

  async toEarSpeaker() {
    console.log('TO SPEAKER: ' + (await AudioManager.setAudioOutputRoute(1)));
  }

  async toDefaultSpeaker() {
    console.log('TO SPEAKER: ' + (await AudioManager.setAudioOutputRoute(0)));
  }

  async idleTestFalse() {
    // set false to turn off the sleep mode
    alert('idletestfalse');
  }

  async getCurrentAudioName() {
    let sucess = await AudioManager.getCurrentAudioName(true);
    console.log('Current name: ' + sucess);
    alert('Current name: ' + sucess);
  }

  async addBLur() {
    console.log('Add blur');
  }

  async duration() {
    alert(await AudioManager.getDuration());
  }

  viewLoaded() {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        this.setState({ viewRef: findNodeHandle(this.refs.backgroundBlur) });
      }, 500);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <Button
              style={styles.button}
              onPress={() => this.loadAndPlay()}
              title="LOAD_PLAY"
              color="#841584"
            />

            <Button
              style={styles.button}
              onPress={() => this.getCurrentAudioName()}
              title="NAME"
              color="#841584"
            />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Button
              style={styles.button}
              onPress={this.pause}
              title="PAUSE"
              color="#841584"
            />

            <Button
              style={styles.button}
              onPress={this.resume}
              title="RESUME"
              color="#841584"
            />

            <Button
              style={styles.button}
              onPress={this.stop}
              title="STOP"
              color="#841584"
            />

            <Button
              style={styles.button}
              onPress={this.duration}
              title="DURATION"
              color="#841584"
            />
          </View>

          <View style={{ alignSelf: 'stretch' }}>
            <Text style={styles.text}>{String(this.state.time)}</Text>
            <Slider
              step={1}
              maximumValue={100}
              onValueChange={this.timeChange}
              value={this.state.time}
            />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Button
              style={styles.button}
              onPress={this.mute}
              title="MUTE"
              color="#841584"
            />

            <Button
              style={styles.button}
              onPress={this.addBLur}
              title="ADD BLUR"
              color="#841584"
            />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Button
              style={styles.button}
              onPress={this.toEarSpeaker}
              title="TO EAR"
              color="#841584"
            />

            <Button
              style={styles.button}
              onPress={this.toDefaultSpeaker}
              title="TO DEFAULT"
              color="#841584"
            />
          </View>
        </View>
      </View>
    );
  }

  renderBlurView() {
    const tintColor = ['#ffffff', '#000000'];
    if (this.state.blurType === 'xlight') tintColor.reverse();

    return (
      <View
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {this.state.viewRef && (
          <BlurView
            style={[styles.overlay]}
            blurRadius={9}
            blurType={'xlight'}
            viewRef={this.state.viewRef}
            downsampleFactor={5}
            overlayColor={'rgba(255, 255, 255, 0.1)'}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 100,
    zIndex: 1
  },
  overlay: {
    zIndex: 99,
    elevation: 99,
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    // opacity: 0.5,
    // backgroundColor: 'black',
    width: width,
    height: height
  }
});
