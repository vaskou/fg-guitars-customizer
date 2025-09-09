<?php

namespace FG_Guitars_Customizer\Metaboxes;

use FG_Guitars_Customizer\Helpers\Helpers;

class Customizer_Metabox {

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		add_action( 'cmb2_admin_init', [ $this, 'add_metaboxes' ] );
	}

	public function add_metaboxes() {
		if ( ! function_exists( 'new_cmb2_box' ) ) {
			return;
		}

		$metabox = new_cmb2_box( [
			'id'           => 'fg_guitars_customizer',
			'title'        => __( 'Customizer', 'fg-guitars-customizer' ),
			'object_types' => array( 'fg_guitars' ), // Post type
			'context'      => 'normal',
			'priority'     => 'high',
			'show_names'   => true, // Show field names on the left
		] );

		$metabox->add_field( [
			'id'   => 'fggc_customizer_price',
			'name' => __( 'Base Price', 'fg-guitars-customizer' ),
			'type' => 'text_small',
		] );

		$metabox->add_field( [
			'id'   => 'fggc_customizer_exclude',
			'name' => __( 'Exclude', 'fg-guitars-customizer' ),
			'type' => 'checkbox',
		] );

		$metabox->add_field( [
			'id'   => 'fggc_customizer_include',
			'name' => __( 'Include even if has "Draft" status', 'fg-guitars-customizer' ),
			'type' => 'checkbox',
		] );

		$metabox->add_field( [
			'id'         => 'fggc_customizer_options',
			'name'       => __( 'Customizer', 'fg-guitars-customizer' ),
			'type'       => 'fggc_cmb2_customizer_options_field',
			'options_cb' => [ $this, 'get_group_field_option_tree' ],
			'show_names' => false,
		] );

	}

	public function get_group_field_option_tree() {
		return Helpers::get_group_field_option_tree();
	}
}