/* eslint react/prop-types:0 */
import React from 'react';
import { Link } from 'react-router';

const styles = {
  linkStyles: {
    display: 'block',
    float: 'left',
    marginRight: 10,
    marginBottom: 10,
  },
  imgStyles: {
    display: 'block',
    width: 300,
  },
  textStyles: {
    display: 'block',
  },
};

export default function (props) {
  return (
    <Link to = {`/album/${props.id}`} style={styles.linkStyles}>
      <img src={props.image} style={styles.imgStyles} />
      <span style={styles.textStyles}>{props.name}</span>
    </Link>
  );
}
