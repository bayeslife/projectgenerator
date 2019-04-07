import { describe } from 'riteway';
import render from 'riteway/render-component';
import React from 'react';

import MyComponent from '../src';

describe('MyComponent should render properly', async (assert) => {
  const param = 'Spiderman';
  const $ = render(<MyComponent param={param} />);
  assert({
    given: 'a param',
    should: 'Render a greeting to the correct param.',
    actual: $('h1')
      .html()
      .trim(),
    expected: `Hello ${param}`
  });
});
