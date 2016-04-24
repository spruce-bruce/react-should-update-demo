import React, {
  Component
} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Search extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    console.log(this.props.actions);
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <input type="text" />
        <button>Search</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const props = { spotify: state.spotify };
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = { spotify: require('../actions/spotify.js') };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
