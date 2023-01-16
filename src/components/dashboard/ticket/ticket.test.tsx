import React from 'react';
import { shallow } from 'enzyme';
import Ticket from './Ticket';

describe('<Ticket />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Ticket />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
