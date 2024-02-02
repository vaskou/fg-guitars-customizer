<?php

namespace FG_Guitars_Customizer\Metaboxes;

use FG_Guitars_Customizer\Post_Types\Customizer_Fields_Group;

class Customizer_Metabox {

	private $fields = [];

	private static $_instance;

	/**
	 * @return string
	 */
	public function getPrefixMetaboxId() {
		return $this->prefix_metabox_id;
	}

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

		$this->fields = [
			'body' => [
				'name'       => __( 'Body', 'fg-guitars-customizer' ),
				'type'       => 'group',
				'repeatable' => false,
				'fields'     => [
					'type' => [
						'name'              => __( 'Type', 'fg-guitars-customizer' ),
						'type'              => 'multicheck',
						'options'           => [
							'check1' => 'Check One',
							'check2' => 'Check Two',
							'check3' => 'Check Three',
						],
						'select_all_button' => false,
					]
				]
			]
		];

		$fields = Customizer_Fields_Group::get_fields_array();

		$this->fields = $fields;

		$metabox = $this->_addMetabox( 'fg_guitars' );

		$this->_addMetaboxFields( $metabox );
	}

	protected function _addMetabox( $post_type, $context = 'normal', $priority = 'high' ) {
		return new_cmb2_box( array(
			'id'           => 'fg_guitars_customizer',
			'title'        => __( 'Customizer', 'fg-guitars-customizer' ),
			'object_types' => array( $post_type ), // Post type
			'context'      => $context,
			'priority'     => $priority,
			'show_names'   => true, // Show field names on the left
		) );
	}

	/**
	 * @param $metabox \CMB2
	 */
	protected function _addMetaboxFields( $metabox ) {
		if ( empty( $metabox ) ) {
			return;
		}

		foreach ( $this->fields as $id => $values ) {

			$defaults = array(
				'id' => 'fggc_' . $id,
			);

			$args = wp_parse_args( $values, $defaults );

			if ( 'group' == $values['type'] ) {
				$this->_addMetaboxGroupField( $metabox, $args );
			} else {
				$metabox->add_field( $args );
			}

		}
	}

	/**
	 * @param $metabox \CMB2
	 */
	private function _addMetaboxGroupField( $metabox, $args ) {
		if ( empty( $metabox ) ) {
			return;
		}

		$group_title = $args['name'];

		$group_id = $metabox->add_field( array(
			'id'         => $args['id'],
			'type'       => 'group',
			'options'    => array(
				'group_title'   => $group_title . ' {#}',
				'add_button'    => sprintf( __( 'Add Another %s', 'fg-guitars-customizer' ), $group_title ),
				'remove_button' => sprintf( __( 'Remove %s', 'fg-guitars-customizer' ), $group_title ),
				'sortable'      => true,
				// 'closed'         => true, // true to have the groups closed by default
				// 'remove_confirm' => esc_html__( 'Are you sure you want to remove?', 'cmb2' ), // Performs confirmation before removing group.
			),
			'repeatable' => isset( $args['repeatable'] ) ? $args['repeatable'] : true,
		) );

		$this->_addMetaboxGroupFields( $metabox, $group_id, $args );
	}

	/**
	 * @param $metabox \CMB2
	 * @param $group_id integer
	 */
	private function _addMetaboxGroupFields( $metabox, $group_id, $args ) {
		if ( empty( $metabox ) ) {
			return;
		}

		foreach ( $args['fields'] as $id => $values ) {

			$defaults = array(
				'id' => $id,
			);

			$args = wp_parse_args( $values, $defaults );

			$metabox->add_group_field( $group_id, $args );

		}

	}
}