import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

class ProductsContainer extends React.PureComponent {
	static propTypes = {
		currentAddress: PropTypes.shape({
			lat: PropTypes.number,
			lng: PropTypes.number
		})
	};

	static defaultProps = {
		currentAddress: {}
	};

	render() {
		const { currentAddress: { lat, lng: long } } = this.props;

		const variables = {
			algorithm: 'NEAREST',
			lat: String(lat),
			long: String(long),
			now: new Date()
		};

		return lat ? (
			<Query query={pocSearchMethod} variables={variables}>
				{({ data: { pocSearch = [] } }) => {
					return pocSearch.map(({ status, id }) => (
						<div key={id}>{status}</div>
					));
				}}
			</Query>) : (<div>no produducts</div>);
	}
}

const pocSearchMethod = gql`
	query pocSearchMethod(
		$now: DateTime!,
		$algorithm: String!,
		$lat: String!,
		$long: String!
	) {
		pocSearch(now: $now, algorithm: $algorithm, lat: $lat, long: $long) {
			id,
			status
		}
	}
`;

export const mapStateToProps = ({ address: { currentAddress } }) => ({ currentAddress: currentAddress || undefined });

export default compose(
	connect(
		mapStateToProps
	)

)(ProductsContainer);
