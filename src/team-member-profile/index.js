/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	...metadata,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
	transforms: {
		// Transform FROM group or columns TO team-member-profile
		from: [
			{
				type: 'block',
				blocks: ['core/group', 'core/columns'],
				transform: (attributes) => {
					return createBlock(metadata.name, {
						name: '',
						title: '',
						socialLinks: [],
						...attributes
					});
				}
			}
		],

		// Transform TO group and columns FROM team-member-profile
		to: [
			{
				type: 'block',
				blocks: ['core/group'],
				transform: (attributes) => {
					return createBlock('core/group', {
						layout: {
							type: 'constrained'
						}
					});
				}
			},
			{
				type: 'block',
				blocks: ['core/columns'],
				transform: (attributes) => {
					return createBlock('core/columns');
				}
			}
		]
	}
});
