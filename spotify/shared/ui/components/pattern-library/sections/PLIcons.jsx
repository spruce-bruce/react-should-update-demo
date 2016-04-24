import map from 'lodash/map';
import React from 'react';
import Icon from '../../icon/icon';

const ICONS = [
  'Back',
  'Cancel',
  'Caret',
  'Group',
  'Heart',
  'Save',
  'Search',
  'Trash',
];

const PLIcons = React.createClass({

  displayName: 'PLIcons',

  renderIcons() {
    return map(ICONS, (icon, index) => (
      <span className="pl-icon small-4 medium-3" key={`icon-${index}`}>
        <Icon icon={icon} />
        <span className="pl-icon__name">
          <strong className="strong">Icon: </strong>
          {icon}
        </span>
      </span>
    ));
  },

  render() {
    return (
      <div className="pl-page">
        <h1 className="pl-h1">{"Icons"}</h1>
        <div className="pl-icons row">
          {this.renderIcons()}
        </div>
        <hr className="pl-hr" />
        <div className="row">
          <div className="medium-4">
            <h2 className="pl-h2">Icon sizes</h2>
            <Icon icon="Caret" size="x-small" /> Extra Small
            <br />
            <br />
            <Icon icon="Caret" size="small" /> Small
            <br />
            <br />
            <Icon icon="Caret" /> Default
            <br />
            <br />
            <Icon icon="Caret" size="large" /> Large
            <br />
            <br />
            <Icon icon="Caret" size="x-large" /> Extra Large
            <br />
            <br />
          </div>
          <div className="medium-4">
            <h2 className="pl-h2">Icon rotation</h2>
            <Icon icon="Caret" size="small" rotate={0} /> 0deg Rotation
            <br />
            <br />
            <Icon icon="Caret" size="small" rotate={45} /> 45deg Rotation
            <br />
            <br />
            <Icon icon="Caret" size="small" rotate={90} /> 90deg Rotation
            <br />
            <br />
            <Icon icon="Caret" size="small" rotate={180} /> 180deg Rotation
            <br />
            <br />
            <Icon icon="Caret" size="small" rotate={270} /> 270deg Rotation
            <br />
            <br />
          </div>
          <div className="medium-4">
            <h2 className="pl-h2">{"Icon colors"}</h2>
            <Icon icon="Caret" size="small" colorTheme="black" /> Black fill
            <br />
            <br />
            <Icon icon="Caret" size="small" colorTheme="white" /> White fill
            <br />
            <br />
            <Icon icon="Caret" size="small" colorTheme="primary" /> Primary fill
            <br />
            <br />
            <Icon icon="Caret" size="small" colorTheme="secondary" /> Secondary fill
            <br />
            <br />
            <Icon icon="Caret" size="small" colorTheme="tertiary" /> Tertiary fill
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  },

});

export default PLIcons;
