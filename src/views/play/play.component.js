import React, { Component } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

import PlayItem from '../../components/play-item/play-item.component';
import Controls from '../../components/controls/controls.component';

const MESSAGE_PREFIX = 'react-native-webview';

export default class PlayComponent extends Component {
  constructor(props) {
    super(props);
    this.webview = null;
    this.prepareTrack = this.prepareTrack.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onWebViewLoaded = this.onWebViewLoaded.bind(this);
    this.showLoadingIndicator = this.showLoadingIndicator.bind(this);
    this.onError = this.onError.bind(this);

    this.state = {
      webViewNotLoaded: true
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Icon.Button
        name="gear"
        color="#faf6bc"
        backgroundColor="none"
        onPress={() => navigation.navigate('Settings')}
      />
    )
  });

  async componentDidMount() {
    const { nav, setPodcast, setPlayerState, settings } = this.props;
    const selectedPodcast = nav.routes[nav.index].params;
    const { podcast } = selectedPodcast;
    const { gain, tempo, isActivated } = settings;
    setPodcast(podcast);

    await this.prepareTrack(podcast);
    TrackPlayer.addEventListener('playback-state', ({ state }) => {
      console.log('state', state);
      setPlayerState(state);
      if (state === 'playing' && isActivated) {
        this.sendMessage('CHANGE_SETTINGS', {
          isPlaying: true,
          tempo: tempo,
          gain: gain
        });
      } else {
        this.sendMessage('CHANGE_SETTINGS', {
          isPlaying: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.stop();
  }

  componentWillReceiveProps(nextProps) {
    const { settings } = this.props;
    if (!_.isEqual(settings, nextProps.settings)) {
      this.sendMessage('CHANGE_SETTINGS', {
        isPlaying: nextProps.isActivated,
        tempo: nextProps.tempo,
        gain: nextProps.gain
      });
    }
  }

  async prepareTrack(podcast) {
    const { isActivated } = this.props.settings;
    const track = {
      id: podcast.title,
      url: podcast.playbackUrl,
      title: podcast.title,
      artist: 'deadmau5',
      artwork: podcast.lowResImage
    };
    await TrackPlayer.reset();
    await TrackPlayer.add([track]);
    if (isActivated) {
      this.pause();
    }
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

  onWebViewLoaded() {
    this.setState(
      {
        webViewNotLoaded: false
      },
      () => {
        // let the parent know the webview is ready
        if (this.props.hasOwnProperty('onWebViewReady')) {
          this.props.onWebViewReady();
        }
        this.play();
      }
    );
  }

  /* handleMessage(event) {
    let msgData;
    console.log(`ReactWebView: handleMessage called: `, event);

    try {
      msgData = JSON.parse(event.nativeEvent.data);
      if (
        msgData.hasOwnProperty('prefix') &&
        msgData.prefix === MESSAGE_PREFIX
      ) {
        console.log(`ReactWebView: received message ${msgData.type}`);
        this.sendMessage('MESSAGE_ACKNOWLEDGED');

        switch (msgData.type) {
          case 'CONSOLE_LOG':
            console.log('From Webview: ', msgData.payload.msg);
            break;
          default:
            console.warn(
              `ReactWebView Error: Unhandled message type received "${
                msgData.type
              }"`
            );
        }
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  } */

  sendMessage(type, payload) {
    // only send message when webview is loaded
    if (!this.state.webViewNotLoaded) {
      console.log(
        `WebView: sending message ${type}, ${JSON.stringify(payload)}`
      );
      this.webview.postMessage(
        JSON.stringify({
          prefix: MESSAGE_PREFIX,
          type,
          payload
        }),
        '*'
      );
    }
  }

  showLoadingIndicator() {
    return (
      <ActivityIndicator
        size="large"
        animating={this.state.webViewNotLoaded}
        color="blue"
      />
    );
  }

  onError(error) {
    Alert.alert('WebView onError', error, [
      { text: 'OK', onPress: () => console.log('OK Pressed') }
    ]);
    console.log('WebView onError: ', error);
  }

  render() {
    const { podcast, playerState, settings } = this.props;
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
        {settings.isActivated && (
          <WebView
            style={{ display: 'none' }}
            ref={webview => (this.webview = webview)}
            source={{ uri: 'http://reflective-copper.surge.sh/' }}
            onLoadEnd={this.onWebViewLoaded}
            startInLoadingState={true}
            renderLoading={this.showLoadingIndicator}
            renderError={this.onError}
            javaScriptEnabled={true}
            onError={this.onError}
            mixedContentMode={'always'}
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
    alignItems: 'center',
    height: Dimensions.get('window').height
  }
});
