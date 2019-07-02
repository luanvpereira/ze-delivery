import React from 'react';

import ProductsContainer from '../../components/products-container';
import { setCurrentMethod } from '../../actions/filter';

class Products extends React.PureComponent {
	static getInitialProps({ query: { id }, store: { dispatch } }) {
		dispatch(setCurrentMethod(id));
	}

	render() {
		return <ProductsContainer />;
	}
}

export default Products;
