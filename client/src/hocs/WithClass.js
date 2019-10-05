import React from 'react';

const WithClass = props =>  (
  <div className={props.class} style={props.style}>
    {props.children}
  </div>
);

export default WithClass;
