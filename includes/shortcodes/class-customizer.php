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
		$data = [
			'action' => Customizer_Ajax::ACTION,
			'url'    => admin_url( 'admin-ajax.php' ),
		];
		wp_localize_script( 'fgcc-scripts', 'fggc_customizer_data', $data );

		ob_start();
		?>
        <div id="app"></div>
		<?php
		return ob_get_clean();
	}
}