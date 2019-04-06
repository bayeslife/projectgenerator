import React from 'react';
import { render} from 'react-dom';
import MyComponent from '../../src';
const App = () => (
    <MyComponent />
);
render(<App />, document.getElementById("root"));

render(<App />, document.getElementById("root2"));