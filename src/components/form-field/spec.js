import React from 'react';
import { mount } from 'enzyme';

import FormField from './';

describe('<FormField/>', () => {
	it('should render a <FormField type="text">', () => {
		expect(
			mount(<FormField label="Nome" isLoading={true} />)
		).toMatchSnapshot();
	});

	it('should show search icon when pass isLoading attribute as true', () => {
		const component = mount(<FormField label="Nome" type="text" search />);

		expect(component.find('.formFieldSearch')).toHaveLength(1);
	});

	it('should render a <FormField type="select">', () => {
		expect(
			mount(
				<FormField type="select" label="opções">
					<option>Option 1</option>
					<option>Option 2</option>
				</FormField>
			)
		).toMatchSnapshot();
	});
});
