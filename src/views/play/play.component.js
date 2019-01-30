import React, { Component } from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';

import PlayItem from '../../components/play-item/play-item.component';
import Controls from '../../components/controls/controls.component';

export default class PlayComponent extends Component {
  constructor(props) {
    super(props);
    this.prepareTrack = this.prepareTrack.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
  }

  async componentDidMount() {
    const { nav, setPodcast, setPlayerState } = this.props;
    const selectedPodcast = nav.routes[nav.index].params;
    const { podcast } = selectedPodcast;
    setPodcast(podcast);

    await this.prepareTrack(podcast);
    TrackPlayer.addEventListener('playback-state', ({ state }) => {
      console.log('state', state);
      setPlayerState(state);
    });
  }

  componentWillUnmount() {
    this.stop();
  }

  async prepareTrack(podcast) {
    const track = {
      id: podcast.title,
      url: podcast.playbackUrl,
      title: podcast.title,
      artist: 'deadmau5',
      artwork: podcast.lowResImage
    };
    await TrackPlayer.add([track]);
  }

  play() {
    TrackPlayer.play();
  }

  pause() {
    TrackPlayer.pause();
  }

  stop() {
    TrackPlayer.stop();
  }

  render() {
    const { podcast, playerState } = this.props;
    const isPaused = playerState === 'paused';
    const isLoading = playerState === 'loading';
    return (
      <View style={styles.container}>
        {podcast.title && <PlayItem podcast={podcast} isLoading={isLoading} />}
        <Controls
          paused={isPaused}
          onPressPause={this.pause}
          onPressPlay={this.play}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height
  }
});
