<?php

namespace FG_Guitars_Customizer;

use WordpressEnqueue\Enqueue as AEnqueue;

class Enqueue extends AEnqueue {

	private $wp_script_dependencies;

	private static $_instance;

	public static function instance( $dir, $url, $version ) {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self( $dir, $url, $version );
		}

		return self::$_instance;
	}

	private function __construct( $dir, $url, $version ) {
		parent::__construct( $dir, $url, $version );

		$app_assets = include FG_GUITARS_CUSTOMIZER_PLUGIN_DIR_PATH . 'build/index.asset.php';

		$this->wp_script_dependencies = ! empty( $app_assets['dependencies'] ) ? $app_assets['dependencies'] : [];

		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_styles' ) );

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ) );

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	public function admin_enqueue_styles() {
		$styles = array(
			array(
				'handle'        => 'fggc-admin-styles',
				'relative_path' => '/assets/admin_styles.css',
			),
		);

		foreach ( $styles as $style ) {
			$this->_enqueue_style( $style );
		}
	}

	public function enqueue_styles() {
		$prefix = $this->_get_assets_prefix();

		$styles = array(
			array(
				'handle'        => 'fggc-styles',
				'relative_path' => '/build/index.css',
			),
		);

		foreach ( $styles as $style ) {
			$this->_enqueue_style( $style );
		}
	}

	public function enqueue_scripts() {
		$prefix = $this->_get_assets_prefix();

		$scripts = array(
			array(
				'handle'        => 'fgcc-scripts',
				'relative_path' => '/build/index.js',
				'deps'          => $this->wp_script_dependencies
			),
		);

		foreach ( $scripts as $script ) {
			$this->_enqueue_script( $script );
		}
	}
}