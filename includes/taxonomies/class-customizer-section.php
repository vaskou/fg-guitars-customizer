<?php

namespace FG_Guitars_Customizer\Taxonomies;

use FG_Guitars_Customizer\Post_Types\Customizer_Fields_Group;

class Customizer_Section {

	const TAXONOMY_NAME = 'customizer_section';
	const TAXONOMY_SLUG = 'customizer-section';
	const ORDER_META_KEY = 'order';

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		add_action( 'init', [ $this, 'register_taxonomy' ] );
		add_action( 'cmb2_admin_init', [ $this, 'add_metaboxes' ] );
	}

	/**
	 * Registers taxonomy
	 */
	public function register_taxonomy() {

		$labels = array(
			'name'              => __( 'Customizer Sections', 'fg-guitars-customizer' ),
			'singular_name'     => __( 'Customizer Section', 'fg-guitars-customizer' ),
			'search_items'      => __( 'Search Customizer Sections', 'fg-guitars-customizer' ),
			'all_items'         => __( 'All Customizer Sections', 'fg-guitars-customizer' ),
			'parent_item'       => __( 'Parent Customizer Section', 'fg-guitars-customizer' ),
			'parent_item_colon' => __( 'Parent Customizer Section:', 'fg-guitars-customizer' ),
			'edit_item'         => __( 'Edit Customizer Section', 'fg-guitars-customizer' ),
			'update_item'       => __( 'Update Customizer Section', 'fg-guitars-customizer' ),
			'add_new_item'      => __( 'Add New Customizer Section', 'fg-guitars-customizer' ),
			'new_item_name'     => __( 'New Customizer Section Name', 'fg-guitars-customizer' ),
			'menu_name'         => __( 'Sections', 'fg-guitars-customizer' ),
		);

		$rewrite = array(
			'slug'       => self::TAXONOMY_SLUG,
			'with_front' => true,
			'pages'      => true,
			'feeds'      => true,
		);

		$args = array(
			'hierarchical'       => true, // make it hierarchical (like categories)
			'labels'             => $labels,
			'public'             => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'show_admin_column'  => true,
			'show_in_rest'       => true,
			'show_in_quick_edit' => true,
			'query_var'          => true,
			'rewrite'            => $rewrite,
		);

		register_taxonomy( self::TAXONOMY_NAME, array( Customizer_Fields_Group::POST_TYPE_NAME ), $args );
	}

	public function add_metaboxes() {
		if ( ! function_exists( 'new_cmb2_box' ) ) {
			return;
		}

		$metabox = new_cmb2_box( array(
			'id'               => 'fggc_customizer_section_meta_box',
			'title'            => __( 'Section options', 'fg-guitars-customizer' ),
			'object_types'     => [ 'term', ],
			'taxonomies'       => [ self::TAXONOMY_NAME, ],
			'new_term_section' => true,
		) );

//		$metabox->add_field( array(
//			'name'    => __( 'Order', 'fg-guitars-customizer' ),
//			'id'      => self::ORDER_META_KEY,
//			'type'    => 'text',
//			'default' => 0,
//			'column'  => [
//				'position' => 100,
//			]
//		) );
	}

	/**
	 * @param array $args
	 *
	 * @return int|\WP_Error|\WP_Term[]
	 */
	public static function get_items( $args = array() ) {

		$default = array(
			'taxonomy' => self::TAXONOMY_NAME,
//			'orderby'   => 'meta_value',
//			'order'     => 'ASC',
//			'meta_key'  => self::ORDER_META_KEY,
//			'meta_type' => 'NUMERIC',
		);

		$args = wp_parse_args( $args, $default );

		return get_terms( $args );
	}
}