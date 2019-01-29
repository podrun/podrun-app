import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import PlayComponent from './play.component';

const mapStateToProps = state => ({
  nav: state.nav
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  {}
)(PlayComponent);
