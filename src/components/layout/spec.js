import React from 'react';
import { mount } from 'enzyme';

import Layout from './';

describe('<Layout/>', () => {
	it('should render a <Layout/>', () => {
		const component = mount(
			<Layout>
				<p>Corpo</p>
			</Layout>
		);

		expect(component).toMatchSnapshot();
	});
});
