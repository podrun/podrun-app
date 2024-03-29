import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import TrackPlayer from 'react-native-track-player';

TrackPlayer.setupPlayer().then(() => {
  TrackPlayer.registerPlaybackService(() => require('./service.js'));
});

TrackPlayer.updateOptions({
  stopWithApp: false
});

AppRegistry.registerComponent(appName, () => App);
