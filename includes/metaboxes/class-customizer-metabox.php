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

//		$metabox->add_field( [
//			'id'         => 'fggc_guitar_orientation',
//			'name'       => __( 'Guitar Orientation', 'fg-guitar-customizer' ),
//			'type'       => 'fggc_cmb2_customizer_options_field',
//			'options_cb' => [ $this, 'get_guitar_orientation_options' ],
//			'show_names' => false,
//		] );

		$metabox->add_field( [
			'id'         => 'fggc_customizer_options',
			'name'       => __( 'Customizer', 'fg-guitar-customizer' ),
			'type'       => 'fggc_cmb2_customizer_options_field',
			'options_cb' => [ $this, 'get_group_field_option_tree' ],
			'show_names' => false,
		] );

	}

	public function get_group_field_option_tree() {
		return Helpers::get_group_field_option_tree();
	}

	public function get_guitar_orientation_options() {

		$left = [
			'option_id'    => 'left',
			'option_title' => __( 'Left', 'fg-guitar-customizer' ),
		];

		$right = [
			'option_id'    => 'right',
			'option_title' => __( 'Right', 'fg-guitar-customizer' ),
		];

		$fields = [
			[
				'field_id'    => 'left_right_handed',
				'field_title' => __( 'Left or Right-handed', 'fg-guitar-customizer' ),
				'options'     => [
					$left,
					$right
				]
			]
		];

		return [
			[
				'group_id'    => 'orientation',
				'group_title' => __( 'Orientation', 'fg-guitar-customizer' ),
				'fields'      => $fields,
			]
		];
	}
}