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

		$selected_model = ! empty( $_GET['model'] ) ? $_GET['model'] : 0;

		$selected_guitar_id = ! empty( $guitars[ $selected_model ] ) ? $guitars[ $selected_model ]['id'] : array_key_first( $guitars );

		$guitars = array_map( function ( $guitar ) use ( $selected_guitar_id ) {
			if ( ! empty( $guitar['id'] ) && $guitar['id'] == $selected_guitar_id ) {
				$guitar['default'] = true;
			}

			return $guitar;
		}, $guitars );

		$this->customizer_options = get_post_meta( $selected_guitar_id, 'fggc_customizer_options', true );

		$sections = $this->get_sections();

		wp_send_json( [
			'guitars'  => array_values( $guitars ),
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

			$groupIDs = [];
			foreach ( $section_groups as $group ) {
				$groupIDs[] = $group['id'];
			}

			$section_data[] = [
				'id'       => $section_id,
				'type'     => $section_type,
				'title'    => $section_title,
				'groups'   => $section_groups,
				'groupIDs' => $groupIDs,
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
//			$exclude = get_post_meta( $post->ID, 'fggc_customizer_exclude', true );
//
//			if ( ! empty( $exclude ) ) {
//				continue;
//			}
//
//			$options = get_post_meta( $post->ID, 'fggc_customizer_options', true );
//
//			if ( empty( $options ) ) {
//				continue;
//			}
//
//			$has_enabled_options = array_filter( $options, function ( $option ) {
//				return ! empty( $option['enable'] );
//			} );
//
//			if ( ! $has_enabled_options ) {
//				continue;
//			}

			if ( ! Helpers::is_active_for_guitar_customizer( $post->ID ) ) {
				continue;
			}

			$guitars[ $post->ID ] = [
				'id'        => $post->ID,
				'value'     => $post->ID,
				'label'     => $post->post_title,
				'basePrice' => get_post_meta( $post->ID, 'fggc_customizer_price', true ),
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
			$group_id         = $group_post->ID;
			$group_title      = $group_post->post_title;
			$group_width      = Customizer_Fields_Group::get_group_width( $group_id );
			$group_hide_title = ! empty( Customizer_Fields_Group::get_hide_title( $group_id ) );

			$group_has_guitar_selection_field = Customizer_Fields_Group::get_has_guitar_selection_field( $group_id );

			$field_data = $this->_get_group_fields_data( $group_id );

			if ( empty( $field_data ) ) {
				continue;
			}

			$fieldIDs = [];
			foreach ( $field_data as $field ) {
				$fieldIDs[] = $field['id'];
			}

			$group_data[] = [
				'id'                      => $group_id,
				'title'                   => $group_title,
				'width'                   => ! empty( $group_width ) ? $group_width : 'uk-width-1-3@s',
				'hasGuitarSelectionField' => $group_has_guitar_selection_field,
				'hideTitle'               => $group_hide_title,
				'fields'                  => $field_data,
				'fieldIDs'                => $fieldIDs,
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

			$connected_to_option = Customizer_Field::get_connected_to_option( $field_id );

			$option_data = [];
			$optionIDs   = [];

			if ( in_array( $field_type, [ 'radio', 'select' ] ) ) {
				$option_data = $this->_get_field_option_data( $field_id );

				if ( empty( $option_data ) ) {
					continue;
				}

				foreach ( $option_data as $option ) {
					$optionIDs[] = $option['id'];
				}
			} else {
				if ( empty( $this->customizer_options[ $field_id ]['enable'] ) ) {
					continue;
				}
			}

			$field_data[] = [
				'id'                => $field_id,
				'label'             => $field_title,
				'fieldName'         => $field_id,//$field_name,
				'type'              => $field_type,
				'isRequired'        => ! empty( $this->customizer_options[ $field_id ]['required'] ),
				'options'           => $option_data,
				'optionIDs'         => $optionIDs,
				'connectedToOption' => $connected_to_option,
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
				'id'      => $option_id,
				'label'   => $option_post->post_title,
				'value'   => $option_id,//$option_post->post_name,
				'price'   => $this->customizer_options[ $option_id ]['price'],
				'default' => ! empty( $this->customizer_options[ $option_id ]['default'] ),
			];
		}

		return $option_data;
	}
}