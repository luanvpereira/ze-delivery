import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
						rel="stylesheet"
					/>
					<style jsx global>{`
						body {
							font-size: 10px;
							font-family: 'Roboto', sans-serif;
						}
					`}</style>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
