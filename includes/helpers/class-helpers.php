<?php

namespace FG_Guitars_Customizer\Helpers;

use FG_Guitars_Customizer\Post_Types\Customizer_Field;
use FG_Guitars_Customizer\Post_Types\Customizer_Fields_Group;

class Helpers {

	/**
	 * @param $field_id
	 *
	 * @return \WP_Post[]
	 */
	public static function get_field_options( $field_id ) {
		$result = [];

		$field_post = get_post( $field_id );

		if ( ! $field_post ) {
			return $result;
		}

		$options = Customizer_Field::get_field_options( $field_id );

		if ( empty( $options ) ) {
			return $result;
		}

		foreach ( $options as $option_id ) {
			$option_post = get_post( $option_id );

			if ( empty( $option_post ) ) {
				continue;
			}

			$result[] = $option_post;
		}

		return $result;
	}


	/**
	 * @param $group_id
	 *
	 * @return \WP_Post[]
	 */
	public static function get_group_fields( $group_id ) {
		$result = [];

		$group_post = get_post( $group_id );

		if ( ! $group_post ) {
			return $result;
		}

		$fields = Customizer_Fields_Group::get_group_fields( $group_id );

		if ( empty( $fields ) ) {
			return $result;
		}

		foreach ( $fields as $field_id ) {
			$field_post = get_post( $field_id );

			if ( empty( $field_post ) ) {
				continue;
			}

			$result[] = $field_post;
		}

		return $result;
	}

	public static function get_group_field_option_tree() {
		$result = [];

		$groups = Customizer_Fields_Group::get_items();

		if ( empty( $groups ) ) {
			return $result;
		}

		foreach ( $groups as $group_post ) {
			$field_data  = [];
			$group_id    = $group_post->ID;
			$group_title = $group_post->post_title;

			$fields = self::get_group_fields( $group_id );

			foreach ( $fields as $field_post ) {
				$field_id    = $field_post->ID;
				$field_title = $field_post->post_title;

				$options = self::get_field_options( $field_id );

				$option_data = [];
				foreach ( $options as $option_post ) {
					$option_data[] = [
						'option_id'    => $option_post->ID,
						'option_title' => $option_post->post_title,
					];
				}

				$field_data[] = [
					'field_id'    => $field_id,
					'field_title' => $field_title,
					'options'     => $option_data,
				];
			}

			$result[] = [
				'group_id'    => $group_id,
				'group_title' => $group_title,
				'fields'      => $field_data,
			];
		}


		return $result;

	}
}