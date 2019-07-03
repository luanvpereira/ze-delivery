import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Router from 'next/router';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import * as addressActions from '../../actions/address';
import * as loaderActions from '../../actions/loader';
import wait from '../../lib/wait';

import FormField from '../form-field';
import Container from '../container';

import style from './style.scss';

const MIN_LENGTH = 3;

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

class AddressContainer extends React.PureComponent {
	static propTypes = {
		getAddressess: PropTypes.func.isRequired,
		client: PropTypes.shape({
			query: PropTypes.func
		}),
		showLoader: PropTypes.func,
		hideLoader: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.state = {
			addressess: [],
			isLoading: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.isTyping = false;
	}

	async handleChange({ target }) {
		if (target.value.length >= MIN_LENGTH && !this.isTyping) {
			this.setState({
				isLoading: true
			});
			await wait('TYPING', 600);
			this.isTyping = true;

			const addressess = await this.props.getAddressess(target.value);

			this.setState({
				addressess,
				isLoading: false
			});

			this.isTyping = false;
		} else {
			this.resetAddressess();
		}
	}

	async goToProducts(lat, long) {
		this.props.showLoader();

		const { data: { pocSearch: [firstMethod] } } = await this.props.client.query({
			query: pocSearchMethod,
			variables: {
				algorithm: 'NEAREST',
				lat,
				long,
				now: new Date()
			}
		});

		/* istanbul ignore else */
		if (firstMethod) {
			await Router.push(`/products/${firstMethod.id}`);
		} else {
			this.props.hideLoader();
		}
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
			addressess: [],
			isLoading: false
		});
		this.isTyping = false;
	}

	render() {
		const { addressess, isLoading } = this.state;

		return (
			<Container>
				<div className={style.main}>
					<h2 className={style.mainTitle}>
						Bebida gelada, rápida a <br />
						preço baixo
					</h2>

					<FormField
						label="Endereço de entrega."
						onChange={this.handleChange}
						className={style.mainSearch}
						isLoading={isLoading}
					/>

					<ul className={style.addressList}>
						{addressess.map(
							({ formatted_address: formattedAddress, place_id: placeId }, index) => (
								<li
									key={placeId}
									onClick={this.handleClick(index)}
									className={style.addressListItem}>
									{formattedAddress}
								</li>
							)
						)}
					</ul>
				</div>
			</Container>
		);
	}
}

export { AddressContainer as PureAddressContainer };

export const mapDispatchToProps = dispatch =>
	bindActionCreators({
		...addressActions,
		...loaderActions
	}, dispatch);

export default compose(
	connect(
		undefined,
		mapDispatchToProps
	),
	withApollo
)(AddressContainer);
