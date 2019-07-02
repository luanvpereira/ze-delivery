import React from 'react';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import withApolloClient from '../hoc/with-apollo-client';
import { Provider } from 'react-redux';
import { ApolloProvider, compose } from 'react-apollo';

import { initializeStore } from '../reducer';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps, store, apolloClient } = this.props;

		return (
			<Container>
				<ApolloProvider client={apolloClient}>
					<Provider store={store}>
						<Component {...pageProps} />
					</Provider>
				</ApolloProvider>
			</Container>
		);
	}
}

export default compose(
	withApolloClient,
	withRedux(initializeStore),
)(MyApp);
