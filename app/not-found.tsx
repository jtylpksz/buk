import { Container, Flex } from '@mantine/core';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: '404 - Page not found',
	description: 'Page not found',
	robots: {
		index: false,
		follow: false,
	},
};

const NotFound = () => {
	return (
		<Container size="xs">
			<Flex justify="center" align="center" direction="column">
				<h1>Error 404</h1>
				<h2>Page not found.</h2>
				<Link href="/">Go back to homepage</Link>
			</Flex>
		</Container>
	);
};

export default NotFound;
