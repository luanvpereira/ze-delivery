import React from 'react';
import { mount } from 'enzyme';

import Container from './';

describe('<Container/>', () => {
	it('should render a <Container/>', () => {
		const component = mount(
			<Container className="CustomClass">
				<p>Corpo</p>
			</Container>
		);

		expect(component).toMatchSnapshot();
	});
});
