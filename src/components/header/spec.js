import React from 'react';
import { mount } from 'enzyme';

import Header from './';

describe('<Header/>', () => {
	it('should render a <Header/>', () => {
		const component = mount(<Header />);
		expect(component).toMatchSnapshot();
	});
});
