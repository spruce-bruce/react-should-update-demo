import React from 'react';

function Site({ children }) {
  return (
    <div className="l--app-wrapper">
      {children}
    </div>
  );
}
Site.propTypes = {
  children: React.PropTypes.any,
};

export default Site;
