/* eslint react/prop-types:0 */
import React from 'react';
import { Link } from 'react-router';

export default function (props) {
  return (
    <Link to = {`/album/${props.id}`}>
      <span>{props.name}</span>
      <img src={props.image} />
    </Link>
  );
}
