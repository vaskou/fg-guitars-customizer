<?php

namespace FG_Guitars_Customizer\Shortcodes;

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

		$customizer_fields = get_post_meta( $selected_guitar->ID, 'fggc_1913', true );
        error_log( print_r( $customizer_fields, 1) );

		ob_start();
		?>
        <script>
            window.sections = [
                {
                    title: "Choose your guitar",
                    groups: [
                        {
                            width: "uk-width-1-2@s",
                            fields: [
                                {
                                    label: "Model",
                                    fieldName: "model",
                                    type: "select",
                                    options: [
                                        {
                                            name: 'Orpheus',
                                            value: 'orpheus'
                                        },
                                        {
                                            name: "Orpheus1",
                                            value: 'orpheus1'
                                        },
                                    ]
                                },
                                {
                                    label: "Left or Right handed",
                                    fieldName: "orientation",
                                    type: "radio",
                                    options: [
                                        {
                                            name: 'Orpheus',
                                            value: 'orpheus'
                                        },
                                        {
                                            name: "Orpheus1",
                                            value: 'orpheus1'
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    title: "Make your choices",
                    groups: [
                        {
                            title: "Body",
                            width: "uk-width-1-3@s",
                            fields: [
                                {
                                    label: "Body type",
                                    fieldName: "body_type",
                                    type: "radio",
                                    options: [
                                        {
                                            name: 'Orpheus',
                                            value: 'orpheus'
                                        },
                                        {
                                            name: "Orpheus1",
                                            value: 'orpheus1'
                                        },
                                    ]
                                },
                                {
                                    label: "Body wood",
                                    fieldName: "body_wood",
                                    type: "radio",
                                    options: [
                                        {
                                            name: 'Orpheus',
                                            value: 'orpheus'
                                        },
                                        {
                                            name: "Orpheus1",
                                            value: 'orpheus1'
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ];
        </script>
        <div id="app"></div>
		<?php
		return ob_get_clean();
	}
}