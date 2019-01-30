import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import { setPodcast } from '../../actions/play.actions';
import PlayComponent from './play.component';

const mapStateToProps = state => ({
  nav: state.nav,
  podcast: state.play.podcast
});

const mapDispatchToProps = dispatch => ({
  setPodcast: podcast => dispatch(setPodcast(podcast))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayComponent);
