/**
 * Retrieves the translation of text.
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 */
import {
    InspectorControls,
    PanelColorSettings,
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    RichText
} from '@wordpress/block-editor';

import {
    PanelBody,
    ToggleControl,
    RangeControl,
    Button,
    TextControl,
    __experimentalNumberControl as NumberControl
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 */
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const {
        name,
        title,
        imageUrl,
        imageAlt,
        socialLinks,
        showSocialLinks = true,
        borderRadius = 10,
        padding = 20,
        backgroundColor,
        textColor
    } = attributes;

    const blockProps = useBlockProps({
        style: {
            backgroundColor,
            color: textColor,
            borderRadius: `${borderRadius}px`,
            padding: `${padding}px`,
            textAlign: 'center'
        }
    });

    const onSelectImage = (media) => {
        setAttributes({
            imageUrl: media.url,
            imageAlt: media.alt
        });
    };

    const updateSocialLink = (index, field, value) => {
        const newLinks = [...socialLinks];
        newLinks[index][field] = value;
        setAttributes({ socialLinks: newLinks });
    };

    const addSocialLink = () => {
        setAttributes({
            socialLinks: [...socialLinks, { icon: '', url: '' }]
        });
    };

    const removeSocialLink = (index) => {
        const newLinks = [...socialLinks];
        newLinks.splice(index, 1);
        setAttributes({ socialLinks: newLinks });
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title="Social Links">
                    <Button isPrimary onClick={addSocialLink}>
                        Add Social Link
                    </Button>
                    {socialLinks.map((link, index) => (
                        <div key={index} style={{ marginTop: '10px' }}>
                            <TextControl
                                label="Icon Class (e.g. fab fa-facebook)"
                                value={link.icon}
                                onChange={(val) => updateSocialLink(index, 'icon', val)}
                            />
                            <TextControl
                                label="URL"
                                value={link.url}
                                onChange={(val) => updateSocialLink(index, 'url', val)}
                            />
                            <Button
                                isDestructive
                                onClick={() => removeSocialLink(index)}
                                style={{ marginTop: '5px' }}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </PanelBody>

                <PanelColorSettings
                    title="Color Settings"
                    colorSettings={[
                        {
                            value: backgroundColor,
                            onChange: (color) => setAttributes({ backgroundColor: color }),
                            label: 'Background Color',
                        },
                        {
                            value: textColor,
                            onChange: (color) => setAttributes({ textColor: color }),
                            label: 'Text Color',
                        },
                    ]}
                />
            </InspectorControls>

            <div {...blockProps} className={`team-member-block ${blockProps.className}`}>

                <div className="team-member-image">
                    {imageUrl ? (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                style={{ width: '160px', borderRadius: '4px', display: 'block' }}
                            />
                            <div className="team-edit-button" style={{ marginTop: '8px', textAlign: 'center' }}>
                                <MediaUpload
                                    onSelect={onSelectImage}
                                    type="image"
                                    render={({ open }) => (
                                        <Button onClick={open} variant="secondary" style={{ marginRight: '8px', boxShadow: 'none' }}>
                                            Edit
                                        </Button>
                                    )}
                                />
                                <Button
                                    isDestructive
                                    onClick={() => setAttributes({ imageUrl: '', imageAlt: '' })}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectImage}
                                type="image"
                                render={({ open }) => (
                                    <Button onClick={open} className="button team-profile-uploader">
                                        Upload Profile
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    )}
                </div>

                <div className="team-member-content">
                    <RichText
                        tagName="h3"
                        value={name}
                        onChange={(value) => setAttributes({ name: value })}
                        placeholder="Member Name"
                        className="team-member-name"
                    />

                    <RichText
                        tagName="p"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder="Title / Position"
                        className="team-member-title"
                    />

                    {showSocialLinks && (
                        <div className="team-member-socials">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ marginRight: '8px' }}
                                >
                                    <i className={link.icon}></i>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
}
