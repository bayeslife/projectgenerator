import React from 'react';
import { render} from 'react-dom';

import MyComponent from '../../src';

const App = () => (
    <MyComponent param="Sam"/>
);
render(<App />, document.getElementById("root"));