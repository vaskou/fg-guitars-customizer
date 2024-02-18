<?php

namespace FG_Guitars_Customizer\Post_Types;

use FG_Guitars_Customizer\Taxonomies\Customizer_Section;

class Customizer_Fields_Group {

	const POST_TYPE_NAME = 'fggc_fields_group';

	const POST_TYPE_SLUG = 'customizer_fields_group';

	const GUITAR_CUSTOMIZER_GROUP_FIELDS_META_KEY = 'fggc_group_fields';

	const GUITAR_CUSTOMIZER_GROUP_FIELD_OPTIONS_META_KEY = 'fggc_group_field_options';

	const SECTION_META_KEY = 'section';

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		add_action( 'init', [ $this, 'register_post_type' ] );
		add_action( 'cmb2_admin_init', [ $this, 'add_metaboxes' ] );
	}

	/**
	 * Registers post type
	 */
	public function register_post_type() {
		$labels = array(
			'name'                  => _x( 'FG Guitar Customizer Fields Groups', 'FG Guitar Customizer Fields Groups General Name', 'fg-guitars-customizer' ),
			'singular_name'         => _x( 'FG Guitar Customizer Fields Group', 'FG Guitar Customizer Fields Group Singular Name', 'fg-guitars-customizer' ),
			'menu_name'             => __( 'FG Guitar Customizer Fields Groups', 'fg-guitars-customizer' ),
			'name_admin_bar'        => __( 'FG Guitar Customizer Fields Groups', 'fg-guitars-customizer' ),
			'archives'              => __( 'FG Guitar Customizer Fields Group Archives', 'fg-guitars-customizer' ),
			'attributes'            => __( 'FG Guitar Customizer Fields Group Attributes', 'fg-guitars-customizer' ),
			'parent_item_colon'     => __( 'Parent FG Guitar Customizer Fields Group:', 'fg-guitars-customizer' ),
			'all_items'             => __( 'All FG Guitar Customizer Fields Groups', 'fg-guitars-customizer' ),
			'add_new_item'          => __( 'Add New FG Guitar Customizer Fields Group', 'fg-guitars-customizer' ),
			'add_new'               => __( 'Add New', 'fg-guitars-customizer' ),
			'new_item'              => __( 'New FG Guitar Customizer Fields Group', 'fg-guitars-customizer' ),
			'edit_item'             => __( 'Edit FG Guitar Customizer Fields Group', 'fg-guitars-customizer' ),
			'update_item'           => __( 'Update FG Guitar Customizer Fields Group', 'fg-guitars-customizer' ),
			'view_item'             => __( 'View FG Guitar Customizer Fields Group', 'fg-guitars-customizer' ),
			'view_items'            => __( 'View FG Guitar Customizer Fields Groups', 'fg-guitars-customizer' ),
			'search_items'          => __( 'Search FG Guitar Customizer Fields Group', 'fg-guitars-customizer' ),
			'not_found'             => __( 'Not found', 'fg-guitars-customizer' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'fg-guitars-customizer' ),
			'featured_image'        => __( 'Featured Image', 'fg-guitars-customizer' ),
			'set_featured_image'    => __( 'Set Featured Image', 'fg-guitars-customizer' ),
			'remove_featured_image' => __( 'Remove Featured Image', 'fg-guitars-customizer' ),
			'use_featured_image'    => __( 'Use as Featured Image', 'fg-guitars-customizer' ),
			'insert_into_item'      => __( 'Insert into FG Guitar Customizer Fields Group', 'fg-guitars-customizer' ),
			'uploaded_to_this_item' => __( 'Uploaded to this FG Guitar Customizer Fields Group', 'fg-guitars-customizer' ),
			'items_list'            => __( 'FG Guitar Customizer Fields Groups list', 'fg-guitars-customizer' ),
			'items_list_navigation' => __( 'FG Guitar Customizer Fields Groups list navigation', 'fg-guitars-customizer' ),
			'filter_items_list'     => __( 'Filter FG Guitar Customizer Fields Groups list', 'fg-guitars-customizer' ),
		);

		$rewrite = array(
			'slug'       => self::POST_TYPE_SLUG,
			'with_front' => true,
			'pages'      => true,
			'feeds'      => true,
		);

		$args = array(
			'label'         => __( 'FG Guitar Customizer Fields Group', 'fg-guitars-customizer' ),
			'description'   => __( 'FG Guitar Customizer Fields Group Description', 'fg-guitars-customizer' ),
			'labels'        => $labels,
			'supports'      => array( 'title', 'page-attributes' ),
			'taxonomies'    => array(),
			'hierarchical'  => false,
			'public'        => false,
			'show_ui'       => true,
			'show_in_menu'  => true,
			'menu_icon'     => 'dashicons-admin-post',
			'menu_position' => 30,
			'can_export'    => true,
			'rewrite'       => $rewrite,
			'map_meta_cap'  => true,
			'show_in_rest'  => false,
		);
		register_post_type( self::POST_TYPE_NAME, $args );
	}

	public function add_metaboxes() {
		if ( ! function_exists( 'new_cmb2_box' ) ) {
			return;
		}

//		$metabox = new_cmb2_box( array(
//			'id'           => 'fggc_fields_group_meta_box',
//			'title'        => __( 'FG Guitar Customizer Fields Group', 'fg-guitars-customizer' ),
//			'object_types' => array( self::POST_TYPE_NAME, ), // Post type
//			'context'      => 'normal',
//			'priority'     => 'high',
//			'show_names'   => true,
//		) );
//
//		$group_field_id = $metabox->add_field( array(
//			'name'              => __( 'Customizer Fields', 'fg-guitars-customizer' ),
//			'id'                => self::GUITAR_CUSTOMIZER_GROUP_FIELDS_META_KEY,
//			'type'              => 'multicheck',
//			'options_cb'        => [ $this, 'get_options' ],
//			'select_all_button' => false,
//			'multiple'          => true,
//			'render_class'      => 'FG_Guitars_Customizer_Custom_Multicheck'
//		) );

		$metabox = new_cmb2_box( array(
			'id'           => 'fggc_group_belongs_to_section_meta_box',
			'title'        => __( 'Section that belongs to', 'fg-guitars-customizer' ),
			'object_types' => array( self::POST_TYPE_NAME, ), // Post type
			'context'      => 'normal',
			'priority'     => 'high',
			'show_names'   => true,
		) );

		$metabox->add_field( array(
			'name'           => __( 'Section', 'fg-guitars-customizer' ),
			'id'             => self::SECTION_META_KEY,
			'taxonomy'       => Customizer_Section::TAXONOMY_NAME,
			'type'           => 'taxonomy_select',
			'remove_default' => true,
		) );
	}

	public static function get_items( $args = [] ) {
		$default = array(
			'post_type'      => self::POST_TYPE_NAME,
			'post_status'    => 'publish',
			'posts_per_page' => - 1,
			'orderby'        => 'menu_order',
			'order'          => 'ASC'
		);

		$args = wp_parse_args( $args, $default );

		$query = new \WP_Query( $args );

		return $query->get_posts();
	}

	public static function get_group_fields( $group_id ) {
		return get_post_meta( $group_id, self::GUITAR_CUSTOMIZER_GROUP_FIELDS_META_KEY );
	}

	/**
	 * @param \CMB2_Field $field
	 *
	 * @return array
	 */
	public function get_options( $field ) {
		$options = [];

		$items = Customizer_Field::get_items();

		$current_post_id = $field->object_id;

		foreach ( $items as $item ) {
			$item_id = $item->ID;

			$args = [
				'meta_key'   => self::GUITAR_CUSTOMIZER_GROUP_FIELDS_META_KEY,
				'meta_value' => $item_id
			];

			$fields = self::get_items( $args );

			$other = '';
			if ( ! empty( $fields[0] ) && $fields[0]->ID != $current_post_id ) {
				$options[ $item_id ]['disabled'] = 'disabled';

				$other = $fields[0]->post_title;
			}

			$options[ $item_id ]['label'] = $item->post_title . ( ! empty( $other ) ? " ({$other})" : '' );
		}

		uasort( $options, function ( $a, $b ) {
			return ! empty( $a['disabled'] ) ? 1 : - 1;
		} );

		return $options;
	}
}