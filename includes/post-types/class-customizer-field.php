<?php

namespace FG_Guitars_Customizer\Post_Types;

class Customizer_Field {

	const POST_TYPE_NAME = 'fggc_field';
	const POST_TYPE_SLUG = 'customizer_field';
	const GROUP_META_KEY = 'group';
	const FIELD_TYPE_META_KEY = 'field_type';
	const FIELD_CONNECTED_TO_OPTION_META_KEY = 'field_connected_to_option';

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		add_action( 'init', [ $this, 'register_post_type' ] );
		add_action( 'cmb2_admin_init', [ $this, 'add_metaboxes' ] );

		// Filters
		add_action( 'restrict_manage_posts', [ $this, 'field_filter' ] );
		add_action( 'pre_get_posts', [ $this, 'filter_posts' ] );
	}

	/**
	 * Registers post type
	 */
	public function register_post_type() {
		$labels = array(
			'name'                  => _x( 'FG Guitar Customizer Fields', 'FG Guitar Customizer Fields General Name', 'fg-guitars-customizer' ),
			'singular_name'         => _x( 'FG Guitar Customizer Field', 'FG Guitar Customizer Field Singular Name', 'fg-guitars-customizer' ),
			'menu_name'             => __( 'FG Guitar Customizer Fields', 'fg-guitars-customizer' ),
			'name_admin_bar'        => __( 'FG Guitar Customizer Fields', 'fg-guitars-customizer' ),
			'archives'              => __( 'FG Guitar Customizer Field Archives', 'fg-guitars-customizer' ),
			'attributes'            => __( 'FG Guitar Customizer Field Attributes', 'fg-guitars-customizer' ),
			'parent_item_colon'     => __( 'Parent FG Guitar Customizer Field:', 'fg-guitars-customizer' ),
			'all_items'             => __( 'Fields', 'fg-guitars-customizer' ),
			'add_new_item'          => __( 'Add New FG Guitar Customizer Field', 'fg-guitars-customizer' ),
			'add_new'               => __( 'Add New', 'fg-guitars-customizer' ),
			'new_item'              => __( 'New FG Guitar Customizer Field', 'fg-guitars-customizer' ),
			'edit_item'             => __( 'Edit FG Guitar Customizer Field', 'fg-guitars-customizer' ),
			'update_item'           => __( 'Update FG Guitar Customizer Field', 'fg-guitars-customizer' ),
			'view_item'             => __( 'View FG Guitar Customizer Field', 'fg-guitars-customizer' ),
			'view_items'            => __( 'View FG Guitar Customizer Fields', 'fg-guitars-customizer' ),
			'search_items'          => __( 'Search FG Guitar Customizer Field', 'fg-guitars-customizer' ),
			'not_found'             => __( 'Not found', 'fg-guitars-customizer' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'fg-guitars-customizer' ),
			'featured_image'        => __( 'Featured Image', 'fg-guitars-customizer' ),
			'set_featured_image'    => __( 'Set Featured Image', 'fg-guitars-customizer' ),
			'remove_featured_image' => __( 'Remove Featured Image', 'fg-guitars-customizer' ),
			'use_featured_image'    => __( 'Use as Featured Image', 'fg-guitars-customizer' ),
			'insert_into_item'      => __( 'Insert into FG Guitar Customizer Field', 'fg-guitars-customizer' ),
			'uploaded_to_this_item' => __( 'Uploaded to this FG Guitar Customizer Field', 'fg-guitars-customizer' ),
			'items_list'            => __( 'FG Guitar Customizer Fields list', 'fg-guitars-customizer' ),
			'items_list_navigation' => __( 'FG Guitar Customizer Fields list navigation', 'fg-guitars-customizer' ),
			'filter_items_list'     => __( 'Filter FG Guitar Customizer Fields list', 'fg-guitars-customizer' ),
		);

		$rewrite = array(
			'slug'       => self::POST_TYPE_SLUG,
			'with_front' => true,
			'pages'      => true,
			'feeds'      => true,
		);

		$args = array(
			'label'         => __( 'FG Guitar Customizer Field', 'fg-guitars-customizer' ),
			'description'   => __( 'FG Guitar Customizer Field Description', 'fg-guitars-customizer' ),
			'labels'        => $labels,
			'supports'      => array( 'title', 'page-attributes' ),
			'taxonomies'    => array(),
			'hierarchical'  => false,
			'public'        => false,
			'show_ui'       => true,
			'show_in_menu'  => 'edit.php?post_type=' . Customizer_Fields_Group::POST_TYPE_NAME,
			'menu_icon'     => 'dashicons-admin-post',
			'menu_position' => 30,
			'can_export'    => true,
			'rewrite'       => $rewrite,
			'map_meta_cap'  => true,
			'show_in_rest'  => false,
		);
		register_post_type( self::POST_TYPE_NAME, $args );
	}

	public function add_metaboxes() {
		if ( ! function_exists( 'new_cmb2_box' ) ) {
			return;
		}

		$metabox = new_cmb2_box( array(
			'id'           => 'fggc_field_belongs_to_group_meta_box',
			'title'        => __( 'Group that belongs to', 'fg-guitars-customizer' ),
			'object_types' => array( self::POST_TYPE_NAME, ), // Post type
			'context'      => 'normal',
			'priority'     => 'high',
			'show_names'   => true,
		) );

		$metabox->add_field( array(
			'name'             => __( 'Group', 'fg-guitars-customizer' ),
			'id'               => self::GROUP_META_KEY,
			'type'             => 'select',
			'show_option_none' => true,
			'options_cb'       => [ $this, 'get_group_options' ],
			'column'           => [
				'position' => 2,
			]
		) );

		$metabox = new_cmb2_box( array(
			'id'           => 'fggc_field_settings_meta_box',
			'title'        => __( 'Field Settings', 'fg-guitars-customizer' ),
			'object_types' => array( self::POST_TYPE_NAME, ), // Post type
			'context'      => 'normal',
			'priority'     => 'high',
			'show_names'   => true,
		) );

		$metabox->add_field( array(
			'name'    => __( 'Field type', 'fg-guitars-customizer' ),
			'id'      => self::FIELD_TYPE_META_KEY,
			'type'    => 'select',
			'options' => [
				''         => __( 'None', 'fg-guitars-customizer' ),
				'radio'    => __( 'Checkboxes', 'fg-guitars-customizer' ),
				'select'   => __( 'Dropdown', 'fg-guitars-customizer' ),
				'email'    => __( 'Email', 'fg-guitars-customizer' ),
				'text'     => __( 'Text', 'fg-guitars-customizer' ),
				'textarea' => __( 'Textarea', 'fg-guitars-customizer' ),
			],
		) );

		$metabox->add_field( array(
			'name'         => __( 'Field connected to Option', 'fg-guitars-customizer' ),
			'id'           => self::FIELD_CONNECTED_TO_OPTION_META_KEY,
			'type'         => 'select',
			'options_cb'   => [ $this, 'get_option_items' ],
			'render_class' => 'FG_Guitars_Customizer_Custom_Select',
			'repeatable'   => true,
		) );
	}

	public function field_filter( $post_type ) {
		if ( $post_type != self::POST_TYPE_NAME ) {
			return;
		}

		$options = self::get_group_options();

		$selected = ! empty( $_GET[ self::GROUP_META_KEY ] ) ? $_GET[ self::GROUP_META_KEY ] : '';

		?>
        <select name="<?php echo self::GROUP_META_KEY; ?>">
            <option value=""><?php echo __( 'All Groups', 'fg-guitars-customizer' ); ?></option>
			<?php foreach ( $options as $option_value => $option_label ): ?>
                <option value="<?php echo esc_attr( $option_value ); ?>" <?php selected( $selected, $option_value ); ?>><?php echo esc_html( $option_label ); ?></option>
			<?php endforeach; ?>
        </select>
		<?php
	}

	/**
	 * @param \WP_Query $query
	 *
	 * @return void
	 */
	public function filter_posts( $query ) {

		if ( $query->get( 'post_type' ) == self::POST_TYPE_NAME ) {
			$meta_query = (array) $query->get( 'meta_query' );

			if ( ! empty( $_GET[ self::GROUP_META_KEY ] ) ) {
				$meta_query[] = [
					'key'   => self::GROUP_META_KEY,
					'value' => $_GET[ self::GROUP_META_KEY ],
				];
			}

			$meta_query = array_filter( $meta_query );

			$query->set( 'meta_query', $meta_query );
		}
	}

	/**
	 * @param $args
	 *
	 * @return \WP_Post[]
	 */
	public static function get_items( $args = [] ) {
		$default = array(
			'post_type'      => self::POST_TYPE_NAME,
			'post_status'    => 'publish',
			'posts_per_page' => - 1,
			'orderby'        => 'menu_order title',
			'order'          => 'ASC'
		);

		$args = wp_parse_args( $args, $default );

		$query = new \WP_Query( $args );

		return $query->get_posts();
	}

	public static function get_field_group( $field_id ) {
		return get_post_meta( $field_id, self::GROUP_META_KEY, true );
	}

	public static function get_field_type( $field_id ) {
		return get_post_meta( $field_id, self::FIELD_TYPE_META_KEY, true );
	}

	public static function get_connected_to_option( $field_id ) {
		return get_post_meta( $field_id, self::FIELD_CONNECTED_TO_OPTION_META_KEY, true );
	}

	public static function get_items_by_group_id( $group_id ) {
		if ( empty( $group_id ) ) {
			return [];
		}

		$args = [
			'meta_key'   => self::GROUP_META_KEY,
			'meta_value' => $group_id,
		];

		return self::get_items( $args );
	}


	/**
	 * @param \CMB2_Field $field
	 *
	 * @return array
	 */
	public function get_group_options( $field = '' ) {
		$options = [];

		$items = Customizer_Fields_Group::get_items( [
			'orderby' => 'title'
		] );

		foreach ( $items as $item ) {
			$options[ $item->ID ] = $item->post_title;
		}

		return $options;
	}

	/**
	 * @param \CMB2_Field $field
	 *
	 * @return array
	 */
	public function get_option_items( $field = '' ) {
		$options = [
			'' => __( 'None', 'fg-guitars-customizer' )
		];

		if ( empty( $_GET['post'] ) ) {
			return $options;
		}

		$field_id = $_GET['post'];

		$field_group = self::get_field_group( $field_id );

		$fields = Customizer_Field::get_items( [
			'meta_key'   => self::GROUP_META_KEY,
			'meta_value' => $field_group,
		] );

		$fields = array_filter( $fields, function ( $field ) use ( $field_id ) {
			return $field->ID != $field_id;
		} );

		foreach ( $fields as $field ) {
			$option_items = Customizer_Field_Option::get_items( [
				'orderby'    => 'title',
				'meta_key'   => Customizer_Field_Option::FIELD_META_KEY,
				'meta_value' => $field->ID,
			] );

			$items = [];
			foreach ( $option_items as $option_item ) {
				$items[ $option_item->ID ] = $option_item->post_title;
			}

			$options[ $field->ID ] = [
				'label' => $field->post_title,
				'items' => $items
			];
		}

		return $options;
	}

}