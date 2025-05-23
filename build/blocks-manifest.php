<?php
// This file is generated. Do not modify it manually.
return array(
	'team-member-profile' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/team-member-profile',
		'version' => '0.1.0',
		'title' => 'Team Member Profile',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'color' => array(
				'text' => true,
				'background' => true
			)
		),
		'textdomain' => 'team-member-profile',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'name' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.team-member-name'
			),
			'title' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.team-member-title'
			),
			'imageUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageAlt' => array(
				'type' => 'string',
				'default' => ''
			),
			'socialLinks' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'styles' => array(
			array(
				'name' => 'card',
				'label' => 'Card',
				'isDefault' => true
			),
			array(
				'name' => 'list',
				'label' => 'List'
			),
			array(
				'name' => 'minimal',
				'label' => 'Minimal'
			)
		)
	)
);
