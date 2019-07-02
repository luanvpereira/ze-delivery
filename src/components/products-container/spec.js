jest.mock('../../actions/filter');

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from '../../lib/wait';
import { initializeStore } from '../../reducer';
import * as filterActions from '../../actions/filter';

import ProductsContainer, {
	ALL_CATEGORIES_QUERY,
	POC_CATEGORY_SEARCH_QUERY
} from './';

const defaultStoreValues = {
	filter: {
		id: '243',
		search: '',
		categoryId: 0
	}
};

const mocks = [
	{
		request: {
			query: ALL_CATEGORIES_QUERY
		},
		result: {
			data: {
				allCategory: [
					{
						title: 'Balas & Doces',
						id: '1096'
					},
					{
						title: 'Cervejas',
						id: '1098'
					},
					{
						title: 'Cervejas Especiais & Importadas',
						id: '1099'
					},
					{
						title: 'Cervejas Retornáveis.',
						id: '1101'
					}
				]
			}
		}
	},
	{
		request: {
			query: POC_CATEGORY_SEARCH_QUERY,
			variables: {
				id: '243',
				search: '',
				categoryId: 0
			}
		},
		result: {
			data: {
				poc: {
					products: [
						{
							productVariants: [
								{
									title: 'Stella Artois 275ml - Unidade',
									description: null,
									imageUrl: 'https://s3-us-west-2.amazonaws.com/ze-delivery/upload/images/592de3ed8977d.jpg',
									price: 3.69
								}
							]
						},
						{
							productVariants: [
								{
									title: 'Dieguinho',
									description: 'teste',
									imageUrl: 'https://s3-us-west-2.amazonaws.com/courier-images-dev/product/00001545_22e9df99-9e2e-49a6-af9a-4dd187dde8f4.jpg',
									price: null
								}
							],
						},
						{
							productVariants: [
								{
									title: 'Dieguinho',
									description: 'Dieguinho',
									imageUrl: 'https://s3-us-west-2.amazonaws.com/courier-images-dev/product/00001546_6bd5491d-abcf-4245-9668-789e27964827.jpg',
									price: null
								}
							]
						},
						{
							productVariants: [
								{
									title: 'Chelsea',
									description: 'Chelsea',
									imageUrl: 'https://s3-us-west-2.amazonaws.com/courier-images-dev/product/00001549_668d4366-f34a-40c9-8ba0-62a3b5da56d8.jpg',
									price: null
								}
							]
						}
					]
				}
			}
		}
	}
];

const getWrapper = ({
	render = mount,
	props = {},
	store = defaultStoreValues
} = {}) => render(
	<MockedProvider mocks={mocks} addTypename={false}>
		<Provider store={initializeStore(store)}>
			<ProductsContainer {...props} />
		</Provider>
	</MockedProvider>
);

describe('<ProductContainer/>', () => {
	describe('#handleCategoryChange', () => {
		it('should call #changeCategory with value passed event parameter', () => {
			const wrapper = getWrapper();

			const event = {
				target: {
					value: 1
				}
			};

			wrapper.find('ProductsContainer').instance().handleCategoryChange(event);

			expect(filterActions.changeCategory).toHaveBeenCalledWith(event.target.value);
		});
	});

	describe('#handleSearchChange', () => {
		it('should call #changeFilterText with value passed event parameter', () => {
			const wrapper = getWrapper();

			const event = {
				target: {
					value: 'Breja'
				}
			};

			wrapper.find('ProductsContainer').instance().handleSearchChange(event);

			expect(filterActions.changeFilterText).toHaveBeenCalledWith(event.target.value);
		});
	});

	describe('#render', () => {
		it('should render a <ProductsContainer/>', async () => {
			const wrapper = getWrapper();

			await wait(0);

			wrapper.update();

			expect(wrapper.find('ProductsContainer')).toMatchSnapshot();
		});

		it('should render a <ProductsContainer/> without graphql states', () => {
			const wrapper = getWrapper();
			expect(wrapper.find('ProductsContainer')).toMatchSnapshot();
		});
	});
});
