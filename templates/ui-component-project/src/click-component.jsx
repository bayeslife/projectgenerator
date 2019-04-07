import React, { Fragment } from 'react';

const ClickComponent =  ({ clicks, onClick }) =>
  <Fragment>
    <span className="clicks-count">{ clicks }</span>
    <button className="click-button" onClick={onClick}>Click</button>
  </Fragment>

export default ClickComponent

