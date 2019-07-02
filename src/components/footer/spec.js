import React from 'react';
import { mount } from 'enzyme';

import Layout from './';

describe('<Layout/>', () => {
	it('shoudl render a <Layout/>', () => {
		const component = mount(<Layout />);

		expect(component).toMatchSnapshot();
	});
});
