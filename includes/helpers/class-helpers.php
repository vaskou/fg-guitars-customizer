<?php

namespace FG_Guitars_Customizer\Helpers;

use FG_Guitars_Customizer\Post_Types\Customizer_Field;
use FG_Guitars_Customizer\Post_Types\Customizer_Field_Option;
use FG_Guitars_Customizer\Post_Types\Customizer_Fields_Group;
use FG_Guitars_Customizer\Taxonomies\Customizer_Section;

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

		return Customizer_Field_Option::get_items_by_field_id( $field_id );

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

		return Customizer_Field::get_items_by_group_id( $group_id );

	}

	/**
	 * @param $section_id
	 *
	 * @return \WP_Post[]
	 */
	public static function get_section_groups( $section_id ) {
		$args = [
			'tax_query' => [
				[
					'taxonomy' => Customizer_Section::TAXONOMY_NAME,
					'terms'    => $section_id,
				]
			]
		];

		return Customizer_Fields_Group::get_items( $args );
	}

	public static function get_group_field_option_tree() {
		$section_data = [];

		$sections = Customizer_Section::get_items();

		if ( is_wp_error( $sections ) ) {
			return $section_data;
		}

		foreach ( $sections as $section_term ) {
			$section_id     = $section_term->term_id;
			$section_title  = $section_term->name;
			$section_data[] = [
				'section_id'    => $section_id,
				'section_title' => $section_title,
				'groups'        => self::_get_section_groups_data( $section_id ),
			];
		}

		return $section_data;

	}

	private static function _get_section_groups_data( $section_id ) {
		$group_data = [];

		$groups = self::get_section_groups( $section_id );

		if ( empty( $groups ) ) {
			return $group_data;
		}

		foreach ( $groups as $group_post ) {
			$group_id    = $group_post->ID;
			$group_title = $group_post->post_title;

			$field_data = self::_get_group_fields_data( $group_id );

			$group_data[] = [
				'group_id'    => $group_id,
				'group_title' => $group_title,
				'fields'      => $field_data,
			];
		}

		return $group_data;
	}

	private static function _get_group_fields_data( $group_id ) {
		$field_data = [];

		$fields = self::get_group_fields( $group_id );

		foreach ( $fields as $field_post ) {
			$field_id    = $field_post->ID;
			$field_title = $field_post->post_title;

			$option_data = self::_get_field_option_data( $field_id );

			$field_data[] = [
				'field_id'    => $field_id,
				'field_title' => $field_title,
				'options'     => $option_data,
			];
		}

		return $field_data;
	}

	private static function _get_field_option_data( $field_id ) {
		$options = self::get_field_options( $field_id );

		$option_data = [];

		foreach ( $options as $option_post ) {
			$option_data[] = [
				'option_id'    => $option_post->ID,
				'option_title' => $option_post->post_title,
			];
		}

		return $option_data;
	}
}