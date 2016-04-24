import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { search } from '../../redux/actions/spotify';

class Search extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.queryChange = this.queryChange.bind(this);

    this.state = {
      query: '',
    };
  }

  submit(e) {
    e.preventDefault();
    this.props.dispatch(search(this.state.query));
  }

  queryChange(e) {
    this.setState({
      query: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <input type="text" value={this.state.query} onChange={this.queryChange} />
        <button>Search</button>
        <img src="/static-media/ajax-loader.gif" />
      </form>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({ search: state.search });
export default connect(mapStateToProps)(Search);
