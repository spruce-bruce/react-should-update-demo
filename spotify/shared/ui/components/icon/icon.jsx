import React from 'react';

const Icon = React.createClass({

  displayName: 'Icon',

  propTypes: {
    icon: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOf([
      'x-small',
      'small',
      'large',
      'x-large',
      null,
    ]),
    rotate: React.PropTypes.oneOf([
      0,
      45,
      90,
      180,
      270,
    ]),
    colorTheme: React.PropTypes.oneOf([
      'black',
      'white',
      'primary',
      'secondary',
      'tertiary',
      'status--success',
      'status--warning',
      'status--error',
      null,
    ]),
    className: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      size: null,
      rotate: 0,
      colorTheme: null,
      className: null,
    };
  },

  render() {
    const IconComponent = require(`./icons/${this.props.icon}`).default;

    const sizeClass = this.props.size ?
      `icon--${this.props.size}` : null;

    const colorThemeClass = this.props.colorTheme ?
      `icon--${this.props.colorTheme}` : null;

    const rotationClass = `icon--rotate-${this.props.rotate}`;

    const classes = [
      'icon',
      sizeClass,
      colorThemeClass,
      rotationClass,
      this.props.className,
    ].join(' ').trim();

    return (
      <span className={classes}>
        <IconComponent />
      </span>
    );
  },

});

export default Icon;
