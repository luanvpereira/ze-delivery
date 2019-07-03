jest.mock('react-apollo', () => ({
	withApollo: Component => Component
}));

jest.mock('../../actions/address');

jest.mock('../../lib/wait', () => jest.fn().mockImplementation(() => Promise.resolve(true)));

jest.mock('next/router', () => ({
	push: jest.fn().mockImplementation(() => Promise.resolve([]))
}));

jest.mock('../../actions/loader');

import React from 'react';
import Router from 'next/router';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import AddressContainer, { PureAddressContainer, mapDispatchToProps } from '../address-container';
import validAddressReponse from '../../../test-utils/mocked-store/address';
import wait from '../../lib/wait';

import * as loaderActions from '../../actions/loader';

import { initializeStore } from '../../reducer';

const defaultStoreValues = {};

const pocMethodSearch = {
	data: {
		pocSearch: [
			{
				id: Math.floor(Math.random() * 10)
			}
		]
	}
};

const invalidPocMethodSearch = {
	data: {
		pocSearch: []
	}
};

const clientPocMethodSearchSuccessResponse = {
	client: {
		query: jest.fn().mockImplementation(() => Promise.resolve(pocMethodSearch))
	}
};


const clientPocMethodSearchErrorResponse = {
	client: {
		query: jest.fn().mockImplementation(() => Promise.resolve(invalidPocMethodSearch))
	}
};

const getComponent = ({
	store = defaultStoreValues,
	props = {}
} = {}) => mount(
	<Provider store={initializeStore(store)}>
		<AddressContainer {...props} />
	</Provider>).find('AddressContainer');

describe('<AddressContainer/>', () => {
	describe('#handleChange', () => {
		it('should get addressess when pass a valid address', async () => {
			const component = getComponent();
			const instance = component.instance();

			const isTyping = jest.fn();

			Object.defineProperty(instance, 'isTyping', {
				set: value => {
					isTyping(value);
					return value;
				}
			});

			const event = {
				target: {
					value: 'rua cuiaba'
				}
			};

			await instance.handleChange(event);
			expect(wait).toHaveBeenCalledWith('TYPING', 600);
			expect(component.state().addressess).toEqual(validAddressReponse);
			expect(isTyping.mock.calls[0][0]).toBe(true);
			expect(isTyping.mock.calls[1][0]).toBe(false);
		});

		it('should reset address list when cannot get addresss', async () => {
			const resetAddress = jest.spyOn(PureAddressContainer.prototype, 'resetAddressess');
			const component = getComponent();

			const event = {
				target: {
					value: ''
				}
			};

			await component.instance().handleChange(event);

			expect(resetAddress).toHaveBeenCalled();
		});
	});

	describe('#goToProducts', () => {
		it('should get a first `method` and redirect to /products page', async () => {
			const component = getComponent({
				props: {
					...clientPocMethodSearchSuccessResponse
				}
			});

			const { id } = pocMethodSearch.data.pocSearch[0];

			await component.instance().goToProducts();

			expect(Router.push).toHaveBeenCalledWith(`/products/${id}`);
		});

		it('shoud call #showLoader when consult pocSearchMethod', async () => {
			const component = getComponent({
				props: {
					...clientPocMethodSearchSuccessResponse
				}
			});

			await component.instance().goToProducts();

			expect(loaderActions.showLoader).toHaveBeenCalled();
		});

		it('shoud call #hideLoader when pocSearchMethod does not return anything', async () => {
			const component = getComponent({
				props: {
					...clientPocMethodSearchErrorResponse
				}
			});

			await component.instance().goToProducts();

			expect(loaderActions.hideLoader).toHaveBeenCalled();
		});
	});

	describe('#handleClick', () => {
		it('should call #goToProducts with lat e long', async () => {
			const goToProductsSpy = jest
				.spyOn(PureAddressContainer.prototype, 'goToProducts')
				.mockImplementation(() => Promise.resolve([]));

			const component = getComponent();

			const index = 1;


			const selectedLocation = validAddressReponse[index];

			const {
				geometry: {
					location: { lat, lng }
				}
			} = selectedLocation;

			component.setState({
				addressess: validAddressReponse
			});

			await component.instance().handleClick(index)();

			expect(goToProductsSpy).toHaveBeenCalledWith(String(lat), String(lng));
		});
	});

	describe('listeners', () => {
		it('should call #handleChange when change input value', () => {
			const handleChangeSpy = jest.spyOn(PureAddressContainer.prototype, 'handleChange');
			const component = getComponent();

			component.find('input').simulate('change');

			expect(handleChangeSpy).toHaveBeenCalled();
		});

		it('should call #handleClick when click an addresss item', () => {
			const handleClickSpy = jest.spyOn(PureAddressContainer.prototype, 'handleClick');
			const props = mapDispatchToProps(() => { });
			const component = mount(<PureAddressContainer {...props} />);
			const index = 1;

			component.setState({
				addressess: validAddressReponse
			});

			component.find('li').at(index).simulate('click');

			expect(handleClickSpy).toHaveBeenCalledWith(index);
		});
	});

	describe('#render', () => {
		it('should render an <AddressContainer/>', () => {
			const props = mapDispatchToProps(() => { });
			const component = shallow(<PureAddressContainer {...props} />);

			component.setState({
				addressess: validAddressReponse
			});

			expect(component).toMatchSnapshot();
		});
	});
});
