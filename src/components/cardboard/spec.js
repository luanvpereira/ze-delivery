import React from 'react';
import { mount } from 'enzyme';

import Cardboard from './';

describe('<Cardboard/>', () => {
	it('should render a <Cardboard/>', () => {
		const component = mount(
			<Cardboard className="customClass">
				<p>Corpou</p>
			</Cardboard>
		);

		expect(component).toMatchSnapshot();
	});
});
