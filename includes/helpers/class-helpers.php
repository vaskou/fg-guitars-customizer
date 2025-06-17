<?php

namespace FG_Guitars_Customizer\Helpers;

use FG_Guitars_Customizer\Post_Types\Customizer_Field;
use FG_Guitars_Customizer\Post_Types\Customizer_Field_Option;
use FG_Guitars_Customizer\Post_Types\Customizer_Fields_Group;
use FG_Guitars_Customizer\Settings\Settings;
use FG_Guitars_Customizer\Taxonomies\Customizer_Section;

class Helpers {

	/**
	 * @param $post_id
	 *
	 * @return string
	 */
	public static function get_post_title( $post_id ) {
		if ( empty( $post_id ) ) {
			return '';
		}

		return get_post_field( 'post_title', $post_id );
	}

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

	public static function is_active_for_guitar_customizer( $guitar_id ) {
		$exclude = get_post_meta( $guitar_id, 'fggc_customizer_exclude', true );

		if ( ! empty( $exclude ) ) {
			return false;
		}

		$options = get_post_meta( $guitar_id, 'fggc_customizer_options', true );

		if ( empty( $options ) ) {
			return false;
		}

		$has_enabled_options = array_filter( $options, function ( $option ) {
			return ! empty( $option['enable'] );
		} );

		if ( ! $has_enabled_options ) {
			return false;
		}

		$include_even_is_draft = get_post_meta( $guitar_id, 'fggc_customizer_include', true );
		$guitar_status         = get_post_status( $guitar_id );

		if ( empty( $include_even_is_draft ) && 'draft' == $guitar_status ) {
			return false;
		}

		return true;
	}

	public static function show_new_single_page_customize() {
		if ( is_admin() && defined( 'DOING_AJAX' ) && ! DOING_AJAX ) {
			return false;
		}

		$selected_roles = Settings::get_new_single_page_customize_roles();

		if ( empty( $selected_roles ) ) {
			return false;
		}

		if ( in_array( 'all', $selected_roles ) ) {
			return true;
		}

		$user = wp_get_current_user();

		if ( empty( $user ) || empty( $user->ID ) ) {
			return false;
		}

		$user_roles = $user->roles;

		foreach ( $user_roles as $role ) {
			if ( in_array( $role, $selected_roles ) ) {
				return true;
			}
		}

		return false;
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
			$field_type  = Customizer_Field::get_field_type( $field_id );


			$option_data = self::_get_field_option_data( $field_id );

			$field_data[] = [
				'field_id'    => $field_id,
				'field_title' => $field_title,
				'field_type'  => $field_type,
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