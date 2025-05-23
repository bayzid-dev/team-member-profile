/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {

    const {
        name,
        title,
        imageUrl,
        imageAlt,
        socialLinks,
        backgroundColor,
        textColor
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'team-member-profile',
        style: {
            backgroundColor,
            color: textColor,
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center'
        }
    });

    return (
        <div {...blockProps}>

            <div className="team-member-image">

                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={imageAlt}
                    />
                )}

            </div>
            <div className="team-member-content">

            <RichText.Content
                tagName="h3"
                className="team-member-name"
                value={name}
            />

            <RichText.Content
                tagName="p"
                className="team-member-title"
                value={title}
            />

            {socialLinks.length > 0 && (
                <div className="team-member-socials">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className={link.icon}></i>
                        </a>
                    ))}
                </div>
            )}


        </div>
        </div>
    );
}
