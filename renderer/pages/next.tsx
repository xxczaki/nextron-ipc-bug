import React from 'react';
import {NextPage} from 'next';
import Link from 'next/link';
import {Stack, Heading, Text} from '@chakra-ui/core';

const Home: NextPage<unknown> = () => (
		<Stack spacing={3}>
			<Heading>Hello, next!</Heading>
			<Text>This is the next page.</Text>
			<Link href="/home"><a>Go back</a></Link>
		</Stack>
);

export default Home;
