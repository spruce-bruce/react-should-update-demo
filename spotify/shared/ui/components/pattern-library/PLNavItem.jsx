import React from 'react';
import classNames from 'classnames';

export default React.createClass({

  displayName: 'PLNavItem',

  propTypes: {
    active: React.PropTypes.bool,
    displayName: React.PropTypes.string,
    children: React.PropTypes.any,
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      active: false,
      displayName: '',
    };
  },

  onClick() {
    if (this.props.displayName) {
      this.context.router.push(`/pattern-library/${this.props.displayName}`);
    } else {
      this.context.router.push('/pattern-library');
    }
  },

  render() {
    let display;

    const linkClasses = classNames({
      'pl-nav__menu-link': true,
      'pl-nav__menu-link--is-current': this.props.active,
    });

    if (this.props.children) {
      display = this.props.children;
    } else {
      display = this.props.displayName;
    }
    return (
      <li className="pl-nav__menu-item">
        <a className={linkClasses} onClick={this.onClick}>
          {display}
        </a>
      </li>
    );
  },

});
