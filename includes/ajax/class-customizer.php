<?php

namespace FG_Guitars_Customizer\Ajax;

use FG_Guitars_Customizer\Post_Types\Customizer_Field;
use FG_Guitars_Customizer\Post_Types\Customizer_Fields_Group;

class Customizer {

	const ACTION = 'fggc_customizer_get_data';

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		$action = self::ACTION;

		add_action( "wp_ajax_{$action}", [ $this, 'get_customizer_data' ] );
		add_action( "wp_ajax_nopriv_{$action}", [ $this, 'get_customizer_data' ] );
	}

	public function get_customizer_data() {

		$selected_guitar_id = ! empty( $_GET['guitar_id'] ) ? $_GET['guitar_id'] : '';

		$customizer_options = get_post_meta( $selected_guitar_id, 'fggc_customizer_options', true );

		$groups = $this->get_groups( $customizer_options );

		$sections = [
			[
				'title'  => 'Make your choices',
				'groups' => $groups,
			]
		];

		wp_send_json( [ 'sections' => $sections ] );
	}

	public function get_groups( $selected_options ) {
		$group_data = [];
		$groups     = Customizer_Fields_Group::get_items();

		foreach ( $groups as $group ) {
			$field_data = [];
			$group_id   = $group->ID;
			$fields     = Customizer_Fields_Group::get_group_fields( $group_id );

			if ( empty( $fields ) ) {
				continue;
			}

			foreach ( $fields as $field_id ) {

				$field_post = get_post( $field_id );

				if ( ! $field_post ) {
					continue;
				}

				$option_data = [];

				$options = Customizer_Field::get_field_options( $field_id );

				foreach ( $options as $option_id ) {
					if ( empty( $selected_options[ $option_id ]['enable'] ) ) {
						continue;
					}

					$option_post = get_post( $option_id );

					if ( empty( $option_post ) ) {
						continue;
					}

					$option_data[] = [
						'name'  => $option_post->post_title,
						'value' => $option_post->post_name,
					];

				}

				if ( empty( $option_data ) ) {
					continue;
				}

				$field_data[] = [
					'label'     => $field_post->post_title,
					'fieldName' => $field_post->post_name,
					'type'      => 'radio',
					'options'   => $option_data
				];
			}

			if ( empty( $field_data ) ) {
				continue;
			}

			$group_data[] = [
				'title'  => $group->post_title,
				'width'  => 'uk-width-1-3@s',
				'fields' => $field_data
			];
		}

		return $group_data;
	}
}