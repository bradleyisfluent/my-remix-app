import { styled, darkTheme } from '../../stitches.config';

export const Heading = styled('h1', {
	padding: '20px',
	color: '$text',
	fontFamily: 'arial',
	[`${darkTheme}`]: {},
});
