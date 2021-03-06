import React, { useReducer } from 'react';


import ClickComponent from './click-component';
import { reducer, click } from './click-reducer';


const ContainerComponent = () => {
  const [clicks, dispatch] = useReducer(reducer, reducer());
  return <ClickComponent
    clicks={ clicks }
    onClick={() => dispatch(click())}
  />
}

export default ContainerComponent
