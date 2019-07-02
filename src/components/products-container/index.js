import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import * as filterActions from '../../actions/filter';

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
			<div>
				<select onChange={this.handleCategoryChange}>
					<option value="0">Todos</option>
					{allCategory.map(({ title, id: optionId }) => (
						<option key={optionId} value={optionId}>{title}</option>
					))}
				</select>

				<input
					type="text"
					defaultValue={filter.search}
					onChange={this.handleSearchChange}
				/>

				<Query query={POC_CATEGORY_SEARCH_QUERY} variables={filter}>
					{({ data: { poc: { products = [] } = {} } }) => (
						<ul>
							{
								products
									.map(({ productVariants: [ detail ] }) => detail)
									.map(({ title, imageUrl, price }, index) => (
										<li key={index}>
											<strong>{title}</strong> <br />
											<img src={imageUrl} /><br />
											<strong>{price}</strong><br />
										</li>
									))
							}
						</ul>
					)}
				</Query>
			</div>
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
