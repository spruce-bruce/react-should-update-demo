import React from 'react';

let brandingImage = require('../../media/images/raster/branding.png');

function HomePage() {
  const style1 = {
    maxWidth: '400px',
    marginTop: '180px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  };

  const style2 = {
    textAlign: 'center',
    fontSize: '20px',
  };

  // There seems to be an issue resolving image urls correctly between the app and client
  if (!brandingImage.match(/^\//)) {
    brandingImage = `/${brandingImage}`;
  }

  return (
    <div className="typography">
      <img style={style1} src={brandingImage} alt="Synapse Logo" />
      <h2 style={style2}>{'Content'}</h2>
    </div>
  );
}

export default HomePage;
