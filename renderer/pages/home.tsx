// This works
// const {ipcRenderer} = eval('require(\'electron\')');

// This does not
import {ipcRenderer} from 'electron';

import React, {useState, useEffect} from 'react';
import {NextPage} from 'next';
import Link from 'next/link';
import {Stack, Heading, Text} from '@chakra-ui/core';

const Home: NextPage<unknown> = () => {
	const [ping, setPing] = useState<string | undefined>(undefined);

	useEffect(() => {
		(async () => {
			setPing(await ipcRenderer.invoke('ping'));
		})();
	}, []);

	return (
		<Stack spacing={3}>
			<Heading>Hello, world!</Heading>
			{ping && <Text>Received ping: {ping}</Text>}
			<Link href="/next"><a>Next page</a></Link>
		</Stack>
	);
};

export default Home;
