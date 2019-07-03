import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';

import * as filterActions from '../../actions/filter';

import style from './style.scss';

import Container from '../container';
import FormField from '../form-field';
import Cardboard from '../cardboard';

export const ALL_CATEGORIES_QUERY = gql`
	query allCategoriesSearch {
  		allCategory{
    		title
    		id
  	}
}`;


export const POC_CATEGORY_SEARCH_QUERY = gql`
	query pocCategorySearch($id: ID!, $search: String!, $categoryId: Int!) {
		poc(id: $id) {
			products(categoryId: $categoryId, search: $search) {
				productVariants{
					title
					description
					imageUrl
					price
				}
			}
		}
	}
`;

class ProductsContainer extends React.PureComponent {
	static propTypes = {
		categories: PropTypes.object,
		filter: PropTypes.shape({
			id: PropTypes.string,
			categoryId: PropTypes.number,
			search: PropTypes.string
		}),
		changeCategory: PropTypes.func,
		changeFilterText: PropTypes.func
	}

	constructor(props) {
		super(props);

		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	handleCategoryChange(e) {
		this.props.changeCategory(e.target.value);
	}

	handleSearchChange(e) {
		this.props.changeFilterText(e.target.value);
	}

	render() {

		const {
			categories: { allCategory = [] },
			filter
		} = this.props;

		return (
			<Container>
				<div className={style.filter}>
					<FormField onChange={this.handleCategoryChange} type="select">
						<option value="0">Todos</option>
						{allCategory.map(({ title, id: optionId }) => (
							<option key={optionId} value={optionId}>{title}</option>
						))}
					</FormField>

					<FormField
						className={style.filterSearch}
						type="text"
						defaultValue={filter.search}
						search={true}
						onChange={this.handleSearchChange}
					/>
				</div>

				<Query query={POC_CATEGORY_SEARCH_QUERY} variables={filter}>
					{({ data: { poc: { products = [] } = {} } }) =>
						<>
							{products.length > 0 ?
								(<ul className={style.products}>
									{
										products
											.map(({ productVariants: [ detail ] }) => detail)
											.map(({ title, imageUrl, price }, index) => (
												<li key={index} className={style.productsItem}>
													<Cardboard>
														<h3 className={style.productsTitle}>
															{title}
														</h3>
														<img
															className={style.productsImage}
															src={imageUrl}
														/>
														<p className={style.productsPrice}>R$ {String(price).replace('.', ',')}</p>
													</Cardboard>
												</li>
											))
									}
								</ul>) :
								<p className={style.notFound}>Nada foi encontrado.</p>}
						</>
					}
				</Query>
			</Container>
		);
	}
}

export { ProductsContainer as PureProductContainer };

export const mapStateToProps = ({
	filter
}) => ({
	filter
});

export const mapDispatchToProps = dispatch => bindActionCreators({ ...filterActions }, dispatch);

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	graphql(ALL_CATEGORIES_QUERY, {
		name: 'categories'
	})
)(ProductsContainer);
