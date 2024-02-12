<?php

namespace FG_Guitars_Customizer\Shortcodes;

use FG_Guitars_Customizer\Ajax\Customizer as Customizer_Ajax;
use FG_Guitars_Customizer\Post_Types\Customizer_Field;
use FG_Guitars_Customizer\Post_Types\Customizer_Field_Option;
use FG_Guitars_Customizer\Post_Types\Customizer_Fields_Group;

class Customizer {

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		add_action( 'init', [ $this, 'register_shortcode' ] );
	}

	public function register_shortcode() {
		add_shortcode( 'fggc-customizer', [ $this, 'html' ] );
	}

	public function html() {
//		$fields = Customizer_Fields_Group::get_fields_array();
//        error_log( print_r( $fields, 1) );

		$query_args = [
			'post_type'      => 'fg_guitars',
			'posts_per_page' => - 1,
			'status'         => [ 'publish' ]
		];

		$query   = new \WP_Query( $query_args );
		$guitars = $query->get_posts();

		$selected_guitar = '';

		if ( $guitars ) {
			foreach ( $guitars as $guitar ) {
				if ( $guitar->ID == 104 ) {
					$selected_guitar = $guitar;
					break;
				}
			}
		}

		$customizer_options = get_post_meta( $selected_guitar->ID, 'fggc_customizer_options', true );

		$groups = $this->get_groups( $customizer_options );

		error_log( print_r( $groups, 1 ) );

		$section = [
			[
				'title'  => 'Make your choices',
				'groups' => $groups,
			]
		];
//
//		wp_localize_script( 'fgcc-scripts', 'fggc_customizer_data', $section );

		$data = [
			'action' => Customizer_Ajax::ACTION,
			'url'    => admin_url( 'admin-ajax.php' ),
		];
		wp_localize_script( 'fgcc-scripts', 'fggc_customizer_data', $data );

		ob_start();
		?>
        <script>
            window.sections = <?php echo json_encode( $section );?>
            // window.sections = [
            //     {
            //         title: "Choose your guitar",
            //         groups: [
            //             {
            //                 width: "uk-width-1-2@s",
            //                 fields: [
            //                     {
            //                         label: "Model",
            //                         fieldName: "model",
            //                         type: "select",
            //                         options: [
            //                             {
            //                                 name: 'Orpheus',
            //                                 value: 'orpheus'
            //                             },
            //                             {
            //                                 name: "Orpheus1",
            //                                 value: 'orpheus1'
            //                             },
            //                         ]
            //                     },
            //                     {
            //                         label: "Left or Right handed",
            //                         fieldName: "orientation",
            //                         type: "radio",
            //                         options: [
            //                             {
            //                                 name: 'Orpheus',
            //                                 value: 'orpheus'
            //                             },
            //                             {
            //                                 name: "Orpheus1",
            //                                 value: 'orpheus1'
            //                             },
            //                         ]
            //                     }
            //                 ]
            //             }
            //         ]
            //     },
            //     {
            //         title: "Make your choices",
            //         groups: [
            //             {
            //                 title: "Body",
            //                 width: "uk-width-1-3@s",
            //                 fields: [
            //                     {
            //                         label: "Body type",
            //                         fieldName: "body_type",
            //                         type: "radio",
            //                         options: [
            //                             {
            //                                 name: 'Orpheus',
            //                                 value: 'orpheus'
            //                             },
            //                             {
            //                                 name: "Orpheus1",
            //                                 value: 'orpheus1'
            //                             },
            //                         ]
            //                     },
            //                     {
            //                         label: "Body wood",
            //                         fieldName: "body_wood",
            //                         type: "radio",
            //                         options: [
            //                             {
            //                                 name: 'Orpheus',
            //                                 value: 'orpheus'
            //                             },
            //                             {
            //                                 name: "Orpheus1",
            //                                 value: 'orpheus1'
            //                             },
            //                         ]
            //                     }
            //                 ]
            //             }
            //         ]
            //     }
            // ];
        </script>
        <div id="app"></div>
		<?php
		return ob_get_clean();
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