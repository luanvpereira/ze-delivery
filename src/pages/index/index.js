import React from 'react';
import Head from 'next/head';

import AddressContainer from '../../components/address-container';

class Home extends React.PureComponent {
    render() {
        return (
            <>
                <Head>
                    <title>Home</title>
                </Head>
                <AddressContainer />
            </>
        );
    }
}

export default Home;
