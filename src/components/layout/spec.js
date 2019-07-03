import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { initializeStore } from '../../reducer';

import Layout from './';

describe('<Layout/>', () => {
	it('should render a <Layout/>', () => {
		const wrapper = mount(
			<Provider store={initializeStore({
				loader: true
			})}>
				<Layout>
					<p>Corpo</p>
				</Layout>
			</Provider>
		);

		expect(wrapper).toMatchSnapshot();
	});
});
