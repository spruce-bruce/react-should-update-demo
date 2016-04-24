import React from 'react';
import PLSidebar from '../components/pattern-library/PLSidebar';

import TypographySection from '../components/pattern-library/sections/PLTypography';
import IconSection from '../components/pattern-library/sections/PLIcons';
import GridLayout from '../components/pattern-library/sections/PLGrid';
import Icon from '../components/icon/icon';

const PatternLibrary = React.createClass({

  displayName: 'PatternLibrary',

  propTypes: {
    params: React.PropTypes.any,
  },

  getInitialState() {
    return { navHidden: true };
  },

  componentDidMount() {
    require(['../scss/pattern-library']);
  },

  onTriggerClick() {
    this.setState({ navHidden: ! this.state.navHidden });
  },

  getComponentConstructors() {
    return [
      TypographySection,
      IconSection,
      GridLayout,
    ];
  },

  renderSections() {
    const section = this.props.params.section;

    return this.getComponentConstructors().map((Page, index) => {
      if (section === 'all' || section === Page.displayName) {
        return <Page key={index} />;
      }
      return undefined;
    });
  },

  render() {
    const triggerIcon = this.state.navHidden ? 'Hamburger' : 'Cancel';

    return (
      <div className="pl">
        <PLSidebar
          hidden = {this.state.navHidden}
          sections = {this.getComponentConstructors()}
          activeSection = {this.props.params.section}
        />
        <div className="pl-content">
          <div className="pl-content__header">
            <div className="pl-sidebar__trigger" onClick={this.onTriggerClick}>
              <Icon icon={triggerIcon} colorTheme="white" />
            </div>
            <h1 className="pl-content__title">
              Pattern Library
            </h1>
          </div>
          {this.renderSections()}
        </div>
      </div>
    );
  },

});

export default PatternLibrary;
