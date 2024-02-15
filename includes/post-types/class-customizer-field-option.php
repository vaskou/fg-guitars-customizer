<?php

namespace FG_Guitars_Customizer\Post_Types;

class Customizer_Field_Option {

	const POST_TYPE_NAME = 'fggc_field_option';

	const POST_TYPE_SLUG = 'customizer_field_option';

	const PRICE_META_KEY = 'price';

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		add_action( 'init', [ $this, 'register_post_type' ] );
//		add_action( 'cmb2_admin_init', [ $this, 'add_metaboxes' ] );
	}

	/**
	 * Registers post type
	 */
	public function register_post_type() {
		$labels = array(
			'name'                  => _x( 'FG Guitar Customizer Field Options', 'FG Guitar Customizer Field Options General Name', 'fg-guitars-customizer' ),
			'singular_name'         => _x( 'FG Guitar Customizer Field Option', 'FG Guitar Customizer Field Option Singular Name', 'fg-guitars-customizer' ),
			'menu_name'             => __( 'FG Guitar Customizer Field Options', 'fg-guitars-customizer' ),
			'name_admin_bar'        => __( 'FG Guitar Customizer Field Options', 'fg-guitars-customizer' ),
			'archives'              => __( 'FG Guitar Customizer Field Option Archives', 'fg-guitars-customizer' ),
			'attributes'            => __( 'FG Guitar Customizer Field Option Attributes', 'fg-guitars-customizer' ),
			'parent_item_colon'     => __( 'Parent FG Guitar Customizer Field Option:', 'fg-guitars-customizer' ),
			'all_items'             => __( 'All FG Guitar Customizer Field Options', 'fg-guitars-customizer' ),
			'add_new_item'          => __( 'Add New FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'add_new'               => __( 'Add New', 'fg-guitars-customizer' ),
			'new_item'              => __( 'New FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'edit_item'             => __( 'Edit FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'update_item'           => __( 'Update FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'view_item'             => __( 'View FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'view_items'            => __( 'View FG Guitar Customizer Field Options', 'fg-guitars-customizer' ),
			'search_items'          => __( 'Search FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'not_found'             => __( 'Not found', 'fg-guitars-customizer' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'fg-guitars-customizer' ),
			'featured_image'        => __( 'Featured Image', 'fg-guitars-customizer' ),
			'set_featured_image'    => __( 'Set Featured Image', 'fg-guitars-customizer' ),
			'remove_featured_image' => __( 'Remove Featured Image', 'fg-guitars-customizer' ),
			'use_featured_image'    => __( 'Use as Featured Image', 'fg-guitars-customizer' ),
			'insert_into_item'      => __( 'Insert into FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'uploaded_to_this_item' => __( 'Uploaded to this FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'items_list'            => __( 'FG Guitar Customizer Field Options list', 'fg-guitars-customizer' ),
			'items_list_navigation' => __( 'FG Guitar Customizer Field Options list navigation', 'fg-guitars-customizer' ),
			'filter_items_list'     => __( 'Filter FG Guitar Customizer Field Options list', 'fg-guitars-customizer' ),
		);

		$rewrite = array(
			'slug'       => self::POST_TYPE_SLUG,
			'with_front' => true,
			'pages'      => true,
			'feeds'      => true,
		);

		$args = array(
			'label'         => __( 'FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'description'   => __( 'FG Guitar Customizer Field Option Description', 'fg-guitars-customizer' ),
			'labels'        => $labels,
			'supports'      => array( 'title', 'page-attributes' ),
			'taxonomies'    => array(),
			'hierarchical'  => false,
			'public'        => false,
			'show_ui'       => true,
			'show_in_menu'  => 'edit.php?post_type=' . Customizer_Fields_Group::POST_TYPE_NAME,
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

		$metabox = new_cmb2_box( array(
			'id'           => 'fggc_field_option_meta_box',
			'title'        => __( 'Options', 'fg-guitars-customizer' ),
			'object_types' => array( self::POST_TYPE_NAME, ), // Post type
			'context'      => 'normal',
			'priority'     => 'high',
			'show_names'   => true,
		) );

		$metabox->add_field( array(
			'name' => __( 'Price', 'fg-guitars-customizer' ),
			'id'   => self::PRICE_META_KEY,
			'type' => 'text_small',
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

	public static function get_item( $id ) {
		return get_post( $id );
	}

}