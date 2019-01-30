import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { setPodcast, setPlayerState } from '../../actions/play.actions';
import PlayComponent from './play.component';

const mapStateToProps = state => ({
  nav: state.nav,
  podcast: state.play.podcast,
  playerState: state.play.playerState
});

const mapDispatchToProps = dispatch => ({
  setPodcast: podcast => dispatch(setPodcast(podcast)),
  setPlayerState: state => dispatch(setPlayerState(state))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayComponent);
