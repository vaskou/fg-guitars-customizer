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

		$guitars = $this->get_guitars();

		$selected_guitar_id = ! empty( $_GET['model'] ) ? $_GET['model'] : ( ! empty( $guitars ) ? array_key_first( $guitars ) : '' );

		$guitar_orientation_field = $this->get_guitar_orientation_field( $selected_guitar_id );

		$customizer_options = get_post_meta( $selected_guitar_id, 'fggc_customizer_options', true );

		$groups = $this->get_groups( $customizer_options );

		$sections = [
			[
				'type'   => 'guitars',
				'title'  => __( 'Choose your guitar', 'fg-guitars-customizer' ),
				'groups' => [
					[
						'width'  => 'uk-width-1-2@s',
						'fields' => [
							$guitar_orientation_field,
						]
					]
				],
			],
			[
				'type'   => 'fields',
				'title'  => __( 'Make your choices', 'fg-guitars-customizer' ),
				'groups' => $groups,
			],
		];

		wp_send_json( [
			'guitars'  => $guitars,
			'sections' => $sections,
		] );
	}

	public function get_guitars() {
		$guitars = [];

		$args = [
			'post_type'        => 'fg_guitars',
			'post_status'      => [ 'publish' ],
			'posts_per_page'   => - 1,
			'orderby'          => 'title',
			'order'            => 'ASC',
			'suppress_filters' => false,
		];

		$posts = get_posts( $args );

		if ( empty( $posts ) ) {
			return $guitars;
		}


		foreach ( $posts as $post ) {
			$guitars[] = [
				'value' => $post->ID,
				'name'  => $post->post_title,
			];
		}

		return $guitars;
	}

	public function get_guitar_orientation_field( $selected_guitar_id ) {
		$result = [];

		if ( empty( $selected_guitar_id ) ) {
			return $result;
		}

		$guitar_orientation = get_post_meta( $selected_guitar_id, 'fggc_guitar_orientation', true );

		$options = [];

		if ( ! empty( $guitar_orientation['right']['enable'] ) ) {
			$options[] = [
				'name'  => __( 'Right', 'fg-guitars-customizer' ),
				'value' => 'right',
			];
		}

		if ( ! empty( $guitar_orientation['left']['enable'] ) ) {
			$options[] = [
				'name'  => __( 'Left', 'fg-guitars-customizer' ),
				'value' => 'left',
			];
		}

		if ( empty( $options ) ) {
			return $result;
		}

		return [
			'label'     => __( 'Left or Right-handed', 'fg-guitars-customizer' ),
			'fieldName' => 'orientation',
			'type'      => 'radio',
			'options'   => $options,
		];
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