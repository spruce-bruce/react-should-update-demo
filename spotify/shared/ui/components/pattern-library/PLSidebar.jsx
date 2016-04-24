import React from 'react';
import classNames from 'classnames';
import PLNavItem from './PLNavItem';

const PLSidebar = React.createClass({

  displayName: 'PLSidebar',

  propTypes: {
    activeSection: React.PropTypes.string,
    sections: React.PropTypes.arrayOf(React.PropTypes.func),
    hidden: React.PropTypes.bool,
  },

  renderNavItems() {
    const activeSection = this.props.activeSection;

    return this.props.sections.map((Page, index) => (
        <PLNavItem
          displayName = {Page.displayName}
          key = {index}
          active = {activeSection === Page.displayName}
        />
    ));
  },

  render() {
    const classes = classNames({
      'pl-sidebar': true,
      'pl-sidebar--hidden': this.props.hidden,
    });

    return (
      <div className={classes}>
        <nav className="pl-nav">
          <menu className="pl-nav__menu">
            <PLNavItem
              active = {this.props.activeSection === 'all'}
              displayName = "all"
            >
                Kitchen Sink
              </PLNavItem>
            {this.renderNavItems()}
          </menu>
        </nav>
      </div>
    );
  },

});

export default PLSidebar;
