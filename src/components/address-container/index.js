import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as addressActions from '../../actions/address';
import wait from '../../lib/wait';
const MIN_LENGTH = 3;

class AddressContainer extends React.PureComponent {
	static propTypes = {
		setCurrentAddress: PropTypes.func.isRequired,
		getAddressess: PropTypes.func.isRequired,
		clearCurrentAddress: PropTypes.func.isRequired
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

	handleClick(index) {
		return () => {
			this.props.setCurrentAddress(this.state.addressess[index]);
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

export default connect(
	undefined,
	mapDispatchToProps
)(AddressContainer);
