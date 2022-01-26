import { useLoaderData, ActionFunction, redirect, Form } from 'remix';
import { GraphQLClient, gql } from 'graphql-request';
import { colorSchemeCookie, getColorScheme } from '~/cookies';
import { Button } from '~/components/Button';
import { Heading } from '~/components/Heading';
import { Paragraph } from '~/components/Paragraph';

const GetHomePage = gql`
	query {
		landing {
			standfirst
			heading
		}
	}
`;

export const action: ActionFunction = async ({ request }) => {
	const currentColorScheme = await getColorScheme(request);
	const newColorScheme = currentColorScheme === 'light' ? 'dark' : 'light';

	return redirect(request.url, {
		headers: {
			'Set-Cookie': await colorSchemeCookie.serialize(newColorScheme),
		},
	});
};

export const loader = async () => {
	const graphql = new GraphQLClient('http://localhost:1337/graphql');
	let data = {};
	try {
		const resp = await graphql.request(GetHomePage);
		console.log(data);
		data = resp.landing;
	} catch (err) {
		console.log(err);
	}
	return data;
};

export type Landing = {
	heading: string;
	standfirst: string;
};

export default function Index() {
	const data = useLoaderData<Landing>();
	return (
		<>
			<Form method="post">
				<Button type="submit">Change Theme</Button>
			</Form>
			<Heading>{data.heading || 'Default Heading'}</Heading>
			<Paragraph>{data.standfirst || 'Static content'}</Paragraph>
		</>
	);
}
