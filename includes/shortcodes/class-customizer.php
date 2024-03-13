<?php

namespace FG_Guitars_Customizer\Shortcodes;

use FG_Guitars_Customizer\Ajax\Customizer as Customizer_Ajax;
use FG_Guitars_Customizer\Ajax\Form_Submit;

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
		$data = [
			'action'                    => Customizer_Ajax::ACTION,
			'security'                  => wp_create_nonce( Form_Submit::ACTION ),
			'form_submit_action'        => Form_Submit::ACTION,
			'url'                       => admin_url( 'admin-ajax.php' ),
			'price_estimate_label'      => __( 'Price estimate', 'fg-guitars-customizer' ),
			'price_estimate_tax_text'   => __( 'excludes regional taxes', 'fg-guitars-customizer' ),
			'error_message'             => __( 'Something wrong happened. Please try later.', 'fg-guitars-customizer' ),
			'option_validation_message' => __( 'Please select an option', 'fg-guitars-customizer' ),
			'text_validation_message'   => __( 'Please fill this field', 'fg-guitars-customizer' ),
		];
		wp_localize_script( 'fgcc-scripts', 'fggc_customizer_data', $data );

		ob_start();
		?>
        <div id="app"></div>
		<?php
		return ob_get_clean();
	}
}