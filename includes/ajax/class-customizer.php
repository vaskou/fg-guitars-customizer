<?php

namespace FG_Guitars_Customizer\Ajax;

use FG_Guitars_Customizer\Helpers\Helpers;
use FG_Guitars_Customizer\Post_Types\Customizer_Field;
use FG_Guitars_Customizer\Post_Types\Customizer_Fields_Group;
use FG_Guitars_Customizer\Taxonomies\Customizer_Section;

class Customizer {

	const ACTION = 'fggc_customizer_get_data';

	private $customizer_options = [];

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

		$this->customizer_options = get_post_meta( $selected_guitar_id, 'fggc_customizer_options', true );

		$sections = $this->get_sections();

		wp_send_json( [
			'guitars'  => $guitars,
			'sections' => $sections,
		] );
	}

	public function get_sections() {
		$section_data = [];

		$sections = Customizer_Section::get_items();

		if ( is_wp_error( $sections ) ) {
			return $section_data;
		}

		foreach ( $sections as $section_term ) {
			$section_id     = $section_term->term_id;
			$section_title  = $section_term->name;
			$section_groups = self::_get_section_groups_data( $section_id );
			$section_type   = 'fields';

			$has_guitar_selection_field = array_filter( $section_groups, function ( $group ) {
				return ! empty( $group['hasGuitarSelectionField'] );
			} );

			$has_group_fields = array_filter( $section_groups, function ( $group ) {
				return ! empty( $group['fields'] );
			} );

			if ( ! empty( $has_guitar_selection_field ) ) {
				$section_type = 'guitars';
			}

			if ( ! $has_group_fields && ! $has_guitar_selection_field ) {
				continue;
			}

			$section_data[] = [
				'id'     => $section_id,
				'type'   => $section_type,
				'title'  => $section_title,
				'groups' => $section_groups,
			];
		}

		return $section_data;
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

	private function _get_section_groups_data( $section_id ) {
		$group_data = [];

		$groups = Helpers::get_section_groups( $section_id );

		if ( empty( $groups ) ) {
			return $group_data;
		}

		foreach ( $groups as $group_post ) {
			$group_id    = $group_post->ID;
			$group_title = $group_post->post_title;
			$group_width = Customizer_Fields_Group::get_group_width( $group_id );

			$group_has_guitar_selection_field = Customizer_Fields_Group::get_has_guitar_selection_field( $group_id );

			$field_data = $this->_get_group_fields_data( $group_id );

			$group_data[] = [
				'id'                      => $group_id,
				'title'                   => $group_title,
				'width'                   => ! empty( $group_width ) ? $group_width : 'uk-width-1-3@s',
				'hasGuitarSelectionField' => $group_has_guitar_selection_field,
				'fields'                  => $field_data,
			];
		}

		return $group_data;
	}

	private function _get_group_fields_data( $group_id ) {
		$field_data = [];

		$fields = Helpers::get_group_fields( $group_id );

		foreach ( $fields as $field_post ) {
			$field_id    = $field_post->ID;
			$field_title = $field_post->post_title;
			$field_name  = $field_post->post_name;
			$field_type  = Customizer_Field::get_field_type( $field_id );

			$option_data = [];

			if ( in_array( $field_type, [ 'radio', 'select' ] ) ) {
				$option_data = $this->_get_field_option_data( $field_id );

				if ( empty( $option_data ) ) {
					continue;
				}
			} else {
				if ( empty( $this->customizer_options[ $field_id ]['enable'] ) ) {
					continue;
				}
			}

			$field_data[] = [
				'id'        => $field_id,
				'label'     => $field_title,
				'fieldName' => $field_name,
				'type'      => $field_type,
				'isRequired'  => ! empty( $this->customizer_options[ $field_id ]['required'] ),
				'options'   => $option_data,
			];
		}

		return $field_data;
	}

	private function _get_field_option_data( $field_id ) {
		$options = Helpers::get_field_options( $field_id );

		$option_data = [];

		foreach ( $options as $option_post ) {
			$option_id = $option_post->ID;

			if ( empty( $this->customizer_options[ $option_id ]['enable'] ) ) {
				continue;
			}

			$option_data[] = [
				'name'    => $option_post->post_title,
				'value'   => $option_post->post_name,
				'price'   => $this->customizer_options[ $option_id ]['price'],
				'default' => ! empty( $this->customizer_options[ $option_id ]['default'] ),
			];
		}

		return $option_data;
	}
}