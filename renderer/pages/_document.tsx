import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
	render(): JSX.Element {
		return (
			<html lang="pl">
				<Head>
					<meta charSet="utf-8"/>
					<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</html>
		);
	}
}
