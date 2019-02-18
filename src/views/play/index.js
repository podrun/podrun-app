import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { setPodcast, setPlayerState } from '../../actions/play.actions';
import PlayComponent from './play.component';

const mapStateToProps = state => ({
  nav: state.nav,
  settings: state.settings,
  podcast: state.play.podcast,
  playerState: state.play.playerState
});

const mapDispatchToProps = dispatch => ({
  setPodcast: podcast => dispatch(setPodcast(podcast)),
  setPlayerState: state => dispatch(setPlayerState(state)),
  goToSettings: () =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'Settings'
      })
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayComponent);
