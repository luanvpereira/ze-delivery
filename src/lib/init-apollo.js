import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

const create = initialState => {
	const isBrowser = typeof window !== 'undefined';

	return new ApolloClient({
		connectToDevTools: isBrowser,
		ssrMode: !isBrowser,
		link: new HttpLink({
			uri: 'https://803votn6w7.execute-api.us-west-2.amazonaws.com/dev/public/graphql',
			credentials: 'omit',
			fetch: !isBrowser && fetch
		}),
		cache: new InMemoryCache().restore(initialState || {})
	});
};

export default function initApollo(initialState) {
	if (typeof window === 'undefined') {
		return create(initialState);
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = create(initialState);
	}

	return apolloClient;
}
