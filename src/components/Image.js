import React from 'react';
import './Image.scss';

const Image = ({ src, alt }) => (
  <div className="image-component">
    {src ? <img src={src} alt={alt} /> : <div className="placeholder"></div>}
  </div>
);

export default Image;