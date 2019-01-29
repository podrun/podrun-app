import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import PodcastItem from './podcast-item.component';

const mapStateToProps = state => ({
  nav: state.nav
});

const mapDispatchToProps = dispatch => ({
  navigateTo: (podcast, routeName) =>
    dispatch(
      NavigationActions.navigate({
        routeName: routeName,
        params: {
          podcast: podcast,
          showId: podcast.showId,
          title: podcast.title
        }
      })
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PodcastItem);
