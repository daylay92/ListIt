import React from 'react';

const WithClass = props =>  (
  <div className={props.clasz} style={props.style}>
    {props.children}
  </div>
);

export default WithClass;
