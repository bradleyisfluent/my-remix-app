import { styled, darkTheme } from '../../stitches.config';

export const Paragraph = styled('p', {
	color: '$text',
	fontFamily: 'arial',
	[`${darkTheme}`]: {},
});
