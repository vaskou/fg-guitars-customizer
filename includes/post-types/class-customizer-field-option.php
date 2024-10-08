<?php

namespace FG_Guitars_Customizer\Post_Types;

class Customizer_Field_Option {

	const POST_TYPE_NAME = 'fggc_field_option';
	const POST_TYPE_SLUG = 'customizer_field_option';
	const FIELD_META_KEY = 'field';

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
			'name'                  => _x( 'FG Guitar Customizer Field Options', 'FG Guitar Customizer Field Options General Name', 'fg-guitars-customizer' ),
			'singular_name'         => _x( 'FG Guitar Customizer Field Option', 'FG Guitar Customizer Field Option Singular Name', 'fg-guitars-customizer' ),
			'menu_name'             => __( 'FG Guitar Customizer Field Options', 'fg-guitars-customizer' ),
			'name_admin_bar'        => __( 'FG Guitar Customizer Field Options', 'fg-guitars-customizer' ),
			'archives'              => __( 'FG Guitar Customizer Field Option Archives', 'fg-guitars-customizer' ),
			'attributes'            => __( 'FG Guitar Customizer Field Option Attributes', 'fg-guitars-customizer' ),
			'parent_item_colon'     => __( 'Parent FG Guitar Customizer Field Option:', 'fg-guitars-customizer' ),
			'all_items'             => __( 'Options', 'fg-guitars-customizer' ),
			'add_new_item'          => __( 'Add New FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'add_new'               => __( 'Add New', 'fg-guitars-customizer' ),
			'new_item'              => __( 'New FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'edit_item'             => __( 'Edit FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'update_item'           => __( 'Update FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'view_item'             => __( 'View FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'view_items'            => __( 'View FG Guitar Customizer Field Options', 'fg-guitars-customizer' ),
			'search_items'          => __( 'Search FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'not_found'             => __( 'Not found', 'fg-guitars-customizer' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'fg-guitars-customizer' ),
			'featured_image'        => __( 'Featured Image', 'fg-guitars-customizer' ),
			'set_featured_image'    => __( 'Set Featured Image', 'fg-guitars-customizer' ),
			'remove_featured_image' => __( 'Remove Featured Image', 'fg-guitars-customizer' ),
			'use_featured_image'    => __( 'Use as Featured Image', 'fg-guitars-customizer' ),
			'insert_into_item'      => __( 'Insert into FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'uploaded_to_this_item' => __( 'Uploaded to this FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'items_list'            => __( 'FG Guitar Customizer Field Options list', 'fg-guitars-customizer' ),
			'items_list_navigation' => __( 'FG Guitar Customizer Field Options list navigation', 'fg-guitars-customizer' ),
			'filter_items_list'     => __( 'Filter FG Guitar Customizer Field Options list', 'fg-guitars-customizer' ),
		);

		$rewrite = array(
			'slug'       => self::POST_TYPE_SLUG,
			'with_front' => true,
			'pages'      => true,
			'feeds'      => true,
		);

		$args = array(
			'label'         => __( 'FG Guitar Customizer Field Option', 'fg-guitars-customizer' ),
			'description'   => __( 'FG Guitar Customizer Field Option Description', 'fg-guitars-customizer' ),
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
			'id'           => 'fggc_option_belongs_to_field_meta_box',
			'title'        => __( 'Field that belongs to', 'fg-guitars-customizer' ),
			'object_types' => array( self::POST_TYPE_NAME, ), // Post type
			'context'      => 'normal',
			'priority'     => 'high',
			'show_names'   => true,
		) );

		$metabox->add_field( array(
			'name'             => __( 'Field', 'fg-guitars-customizer' ),
			'id'               => self::FIELD_META_KEY,
			'type'             => 'select',
			'show_option_none' => true,
			'options_cb'       => [ $this, 'get_options' ],
			'render_class'     => 'FG_Guitars_Customizer_Custom_Select',
			'display_cb'       => [ $this, 'column_display' ],
			'column'           => [
				'position' => 2,
			]
		) );
	}

	public function field_filter( $post_type ) {
		if ( $post_type != self::POST_TYPE_NAME ) {
			return;
		}

		$options = self::get_options();

		$selected = ! empty( $_GET[ self::FIELD_META_KEY ] ) ? $_GET[ self::FIELD_META_KEY ] : '';

		?>
        <select name="<?php echo self::FIELD_META_KEY; ?>">
            <option value=""><?php echo __( 'All Fields', 'fg-guitars-customizer' ); ?></option>
			<?php foreach ( $options as $option_value => $option_data ): ?>
				<?php
				$label = $option_data['label'];
				$items = $option_data['items'];

				if ( empty( $items ) ) {
					continue;
				}
				?>
                <optgroup label="<?php echo $label; ?>">
					<?php foreach ( $items as $item_value => $item_label ) : ?>
                        <option value="<?php echo esc_attr( $item_value ); ?>" <?php selected( $selected, $item_value ); ?>><?php echo esc_html( $item_label ); ?></option>
					<?php endforeach; ?>
                </optgroup>
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

			if ( ! empty( $_GET[ self::FIELD_META_KEY ] ) ) {
				$meta_query[] = [
					'key'   => self::FIELD_META_KEY,
					'value' => $_GET[ self::FIELD_META_KEY ],
				];
			}

			$meta_query = array_filter( $meta_query );

			$query->set( 'meta_query', $meta_query );
		}
	}

	/**
	 * @param \CMB2_Field $field
	 *
	 * @return array
	 */
	public function get_options( $field = '' ) {
		$options = [];


		$groups = Customizer_Fields_Group::get_items( [
			'orderby' => 'title',
		] );

		foreach ( $groups as $group ) {
			$option_items = Customizer_Field::get_items( [
				'orderby'    => 'title',
				'meta_key'   => Customizer_Field::GROUP_META_KEY,
				'meta_value' => $group->ID,
			] );

			$items = [];
			foreach ( $option_items as $option_item ) {
				$items[ $option_item->ID ] = $option_item->post_title;
			}

			$options[ $group->ID ] = [
				'label' => $group->post_title,
				'items' => $items
			];
		}

		return $options;
	}

	/**
	 * @param array $field_args Array of field arguments.
	 * @param \CMB2_Field $field The field object
	 */
	public function column_display( $field_args, $field ) {
		$field_id = $field->escaped_value();

		$post = get_post( $field_id );

		if ( ! $post ) {
			echo $field_id;
		} else {
			echo $post->post_title;
		}

	}

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

	public static function get_item( $id ) {
		return get_post( $id );
	}

	public static function get_items_by_field_id( $field_id ) {
		if ( empty( $field_id ) ) {
			return [];
		}

		$args = [
			'meta_key'   => self::FIELD_META_KEY,
			'meta_value' => $field_id,
		];

		return self::get_items( $args );
	}

}