import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import EpisodesComponent from './episodes.component';

import { getEpisodes } from '../../actions/podcasts.actions';

const mapStateToProps = state => ({
  isLoading: state.episodes.isEpisodesLoading,
  isError: state.episodes.isEpisodesError,
  isEmpty:
    !(state.episodes.isEpisodesError || state.episodes.isEpisodesLoading) &&
    state.episodes.episodes.length === 0,
  episodes: state.episodes.episodes,
  nav: state.nav
});

const mapDispatchToProps = dispatch => ({
  getEpisodes: podcastId => dispatch(getEpisodes(podcastId)),
  playEpisode: podcast =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'Play',
        params: {
          podcast: podcast
        }
      })
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodesComponent);
