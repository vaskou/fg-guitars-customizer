<?php

namespace FG_Guitars_Customizer;

use Vaskou_Autoloader\Autoloader;

class FG_Guitars_Customizer {

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		$this->init_autoloader();

		$this->init_classes();

		add_action( 'cmb2_init', [ $this, 'include_custom_multicheck_class' ] );
	}

	public function init_autoloader() {
		$namespace  = __NAMESPACE__;
		$base_dir   = FG_GUITARS_CUSTOMIZER_PLUGIN_DIR_PATH . 'includes/';
		$autoloader = new Autoloader( $namespace, $base_dir );
		$autoloader->register();
	}

	public function init_classes() {
		Enqueue::instance(
			FG_GUITARS_CUSTOMIZER_PLUGIN_DIR_PATH,
			FG_GUITARS_CUSTOMIZER_PLUGIN_URL,
			FG_GUITARS_CUSTOMIZER_VERSION
		);

		// Ajax
		Ajax\Customizer::instance();
		Ajax\Form_Submit::instance();

		// CMB2 Custom Fields
		Cmb2_Custom_Fields\Customizer_Options::instance();

		// Metaboxes
		Metaboxes\Customizer_Metabox::instance();

		// Post Types
		Post_Types\Customizer_Field::instance();
		Post_Types\Customizer_Field_Option::instance();
		Post_Types\Customizer_Fields_Group::instance();

		// Settings
		Settings\Settings::instance();

		// Shortcodes
		Shortcodes\Customizer::instance();

		// Taxonomies
		Taxonomies\Customizer_Section::instance();
	}

	public function include_custom_multicheck_class() {
		include 'cmb2-custom-fields/class-custom-multicheck.php';
	}
}