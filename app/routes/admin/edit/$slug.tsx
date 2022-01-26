import {
	ActionFunction,
	Form,
	redirect,
	useActionData,
	useLoaderData,
	useTransition,
} from 'remix';
import type { LoaderFunction } from 'remix';
import { editPost, getPost, PostError } from '~/post';
import type { Post } from '~/post';
import invariant from 'tiny-invariant';

export const loader: LoaderFunction = async ({ params }) => {
	invariant(params.slug, 'expected params.slug');
	return getPost(params.slug);
};

export const action: ActionFunction = async ({ request }) => {
	await new Promise(res => setTimeout(res, 1000));

	const formData = await request.formData();
	const markdown = formData.get('markdown');
	const slug = formData.get('slug');

	const errors: { markdown?: boolean } = {};
	if (!markdown) errors.markdown = true;

	if (Object.keys(errors).length) {
		return errors;
	}

	invariant(typeof markdown === 'string');
	invariant(typeof slug === 'string');

	await editPost(slug, markdown);

	return redirect('/admin');
};

export default function EditPost() {
	const errors = useActionData();
	const transition = useTransition();
	const post = useLoaderData<Post>();

	return (
		<Form method="post">
			<p>Post Title: {post.title}</p>
			<p>Post Slug: {post.slug}</p>
			<input type="hidden" name="slug" value={post.slug} />
			<p>
				<label htmlFor="markdown">Markdown:</label>{' '}
				{errors?.markdown ? <em>Markdown is required</em> : null}
				<br />
				<textarea
					rows={20}
					name="markdown"
					defaultValue={post.markdown}
				/>
			</p>
			<p>
				<button type="submit">
					{transition.submission ? 'Saving...' : 'Save Changes'}
				</button>
			</p>
		</Form>
	);
}
