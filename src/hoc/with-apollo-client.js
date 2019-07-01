import React from 'react';
import PropTypes from 'prop-types';
import initApollo from '../lib/init-apollo';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';

export default App => {
	return class Apollo extends React.Component {
		static displayName = 'withApollo(App)';

		static propTypes = {
			apolloState: PropTypes.object
		};

		static async getInitialProps(ctx) {
			const { Component, router } = ctx;

			let appProps = {};
			if (App.getInitialProps) {
				appProps = await App.getInitialProps(ctx);
			}

			const apollo = initApollo();

			if (typeof window === 'undefined') {
				try {
					// Run all GraphQL queries
					await getDataFromTree(
						<App
							{...appProps}
							Component={Component}
							router={router}
							apolloClient={apollo}
						/>
					);
				} catch (error) {
					console.error('Error while running `getDataFromTree`', error);
				}

				Head.rewind();
			}

			// Extract query data from the Apollo store
			const apolloState = apollo.cache.extract();

			return {
				...appProps,
				apolloState
			};
		}

		constructor(props) {
			super(props);
			this.apolloClient = initApollo(props.apolloState);
		}

		render() {
			return <App {...this.props} apolloClient={this.apolloClient} />;
		}
	};
};
