jest.mock('../../actions/address');
jest.mock('../../lib/wait', () => jest.fn().mockImplementation(() => Promise.resolve(true)));

import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import AddressContainer, { PureAddressContainer, mapDispatchToProps } from '../address-container';
import * as addressActions from '../../actions/address';
import validAddressReponse from '../../../test-utils/mocked-store/address';
import wait from '../../lib/wait';

import { initializeStore } from '../../reducer';

const defaultStoreValues = {
	address: {
		currentAddress: null
	}
};

const getComponent = ({
	store = defaultStoreValues
} = {}) => mount(
	<Provider store={initializeStore(store)}>
		<AddressContainer />
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

	describe('#handleClick', () => {
		it('should select an address by index', () => {
			const component = getComponent();

			const index = 1;

			component.setState({
				addressess: validAddressReponse
			});

			component.instance().handleClick(index)();
			expect(addressActions.setCurrentAddress)
				.toHaveBeenCalledWith(validAddressReponse[index]);
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