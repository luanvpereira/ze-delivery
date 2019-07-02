import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Router from 'next/router';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

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


import * as addressActions from '../../actions/address';
import wait from '../../lib/wait';
const MIN_LENGTH = 3;

class AddressContainer extends React.PureComponent {
	static propTypes = {
		getAddressess: PropTypes.func.isRequired,
		client: PropTypes.shape({
			query: PropTypes.func
		})
	};

	constructor(props) {
		super(props);

		this.state = {
			addressess: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.isTyping = false;
	}

	async handleChange({ target }) {
		if (target.value.length >= MIN_LENGTH && !this.isTyping) {
			await wait('TYPING', 600);
			this.isTyping = true;

			const addressess = await this.props.getAddressess(target.value);

			this.setState({
				addressess
			});

			this.isTyping = false;
		} else {
			this.resetAddressess();
		}
	}

	async goToProducts(lat, long) {
		const { data: { pocSearch: [ firstMethod ] } } = await this.props.client.query({
			query: pocSearchMethod,
			variables: {
				algorithm: 'NEAREST',
				lat,
				long,
				now: new Date()
			}
		});

		Router.push(`/products/${firstMethod.id}`);
	}

	handleClick(index) {
		return async () => {
			const currentAddress = this.state.addressess[index];
			const { lat, lng: long } = currentAddress.geometry.location;

			await this.goToProducts(String(lat), String(long));
		};
	}

	resetAddressess() {
		this.setState({
			addressess: []
		});
		this.isTyping = false;
	}

	render() {
		const { addressess } = this.state;

		return (
			<>
				<input type="text" onChange={this.handleChange} />
				<ul>
					{addressess.map(
						({ formatted_address: formattedAddress, place_id: placeId }, index) => (
							<li key={placeId} onClick={this.handleClick(index)}>
								{formattedAddress}
							</li>
						)
					)}
				</ul>
			</>
		);
	}
}

export { AddressContainer as PureAddressContainer };

export const mapDispatchToProps = dispatch => bindActionCreators({ ...addressActions }, dispatch);

export default compose(
	connect(
		undefined,
		mapDispatchToProps
	),
	withApollo
)(AddressContainer);
