import { connect } from 'react-redux';
import SettingsComponent from './settings.component';

import { updateSettings } from '../../actions/settings.actions'

const mapStateToProps = state => ({
  settings: state.settings,
  nav: state.nav
});

const mapDispatchToProps = dispatch => ({
  updateSettings: settings => dispatch(updateSettings(settings))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsComponent);
