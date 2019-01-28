import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  DeviceEventEmitter
} from 'react-native';
import Player from 'react-native-audio-streaming-player';

import { Standing1 } from 'humaaans-native';
import posed from 'react-native-pose';

const PODCAST_URL = 'https://audio.simplecast.com/140d99e4.mp3';

const MovingHuman = posed.View({
  left: {
    x: '-100vw',
    transition: {
      duration: 0
    }
  },
  right: {
    x: '100vw',
    transition: {
      duration: 1000
    }
  }
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isInside: 'left',
      status: null
    };
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);

    this.onPlaybackActionChanged = this.onPlaybackActionChanged.bind(this);
    this.onPlaybackStateChanged = this.onPlaybackStateChanged.bind(this);
    this.animateHuman = this.animateHuman.bind(this);
    this.animated = null;
  }

  animateHuman() {
    this.animated = setInterval(() => {
      this.setState({ isInside: 'right' });
      setTimeout(() => {
        this.setState({ isInside: 'left' });
      }, 900);
    }, 3000);
  }

  async componentDidMount() {
    DeviceEventEmitter.addListener(
      'onPlaybackStateChanged',
      this.onPlaybackStateChanged
    );
    DeviceEventEmitter.addListener(
      'onPlaybackActionChanged',
      this.onPlaybackActionChanged
    );
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners();
  }

  onPlaybackActionChanged(event) {
    console.log('Current Action: ' + event.action);
  }

  onPlaybackStateChanged(event) {
    console.log('PlaybackState: ' + event.state);
    this.setState({ status: event.state });
    if (event.state === 'PLAYING') {
      this.animateHuman();
    }
  }

  onPlay() {
    Player.play(PODCAST_URL, {
      title: 'Testitle',
      artist: 'Testartist',
      album_art_uri: 'https://unsplash.it/300/300'
    });
  }

  onPause() {
    const { status } = this.state;
    const isPaused = status === 'PAUSED';
    if (isPaused) {
      Player.resume();
    } else {
      Player.pause();
      clearInterval(this.animated);
    }
  }

  render() {
    const { isInside, status } = this.state;
    const isPlaying = status === 'PLAYING';
    const isPaused = status === 'PAUSED';
    return (
      <View style={styles.container}>
        {!isPlaying && (
          <Button
            title="Play"
            style={styles.welcome}
            onPress={() => this.onPlay()}
            color="red"
          />
        )}
        {(isPlaying || isPaused) && (
          <React.Fragment>
            <Button
              title={isPaused ? 'Resume' : 'Pause'}
              style={styles.welcome}
              onPress={() => this.onPause()}
              color="red"
            />
            <MovingHuman pose={isInside}>
              <Standing1 />
            </MovingHuman>
          </React.Fragment>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  video: {
    height: 500,
    width: 300
  }
});
