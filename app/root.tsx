import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	LoaderFunction,
	useLoaderData,
	HeadersFunction,
} from 'remix';
import type { MetaFunction } from 'remix';
import { getColorScheme } from './cookies';

export const headers: HeadersFunction = () => ({
	'Accept-CH': 'Sec-CH-Prefers-Color-Scheme',
});

export const loader: LoaderFunction = async ({ request }) => ({
	colorScheme: await getColorScheme(request),
});

export const meta: MetaFunction = () => {
	return { title: 'New Remix App' };
};

export default function App() {
	const { colorScheme } = useLoaderData();

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body className={colorScheme}>
				<Outlet />
				{process.env.NODE_ENV === 'development' && <LiveReload />}
			</body>
		</html>
	);
}
