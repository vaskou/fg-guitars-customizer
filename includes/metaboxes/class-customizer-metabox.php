<?php

namespace FG_Guitars_Customizer\Metaboxes;

use FG_Guitars_Customizer\Helpers\Helpers;
use FG_Guitars_Customizer\Post_Types\Customizer_Fields_Group;

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

		$groups = Helpers::get_group_field_option_tree();

		$metabox = new_cmb2_box( [
			'id'           => 'fg_guitars_customizer',
			'title'        => __( 'Customizer', 'fg-guitars-customizer' ),
			'object_types' => array( 'fg_guitars' ), // Post type
			'context'      => 'normal',
			'priority'     => 'high',
			'show_names'   => true, // Show field names on the left
		] );

		$metabox->add_field( [
			'id'         => 'fggc_guitar_orientation',
			'name'       => __( 'Guitar Orientation', 'fg-guitar-customizer' ),
			'type'       => 'fggc_cmb2_customizer_options_field',
			'options'    => $this->_get_guitar_orientation_options(),
			'show_names' => false,
		] );

		$metabox->add_field( [
			'id'         => 'fggc_customizer_options',
			'name'       => __( 'Customizer', 'fg-guitar-customizer' ),
			'type'       => 'fggc_cmb2_customizer_options_field',
			'options'    => $groups,
			'show_names' => false,
		] );

	}

	private function _get_guitar_orientation_options() {
		$group             = new \stdClass();
		$group->ID         = 'orientation';
		$group->post_title = __( 'Orientation', 'fg-guitar-customizer' );

		$field             = new \stdClass();
		$field->ID         = 'left_right_handed';
		$field->post_title = __( 'Left or Right-handed', 'fg-guitar-customizer' );

		$left             = new \stdClass();
		$left->ID         = 'left';
		$left->post_title = __( 'Left', 'fg-guitar-customizer' );

		$right             = new \stdClass();
		$right->ID         = 'right';
		$right->post_title = __( 'Right', 'fg-guitar-customizer' );

		$fields = [
			[
				'field'   => $field,
				'options' => [
					$left,
					$right
				]
			]
		];

		$result = [
			[
				'group'  => $group,
				'fields' => $fields,
			]
		];

		return $result;
	}
}