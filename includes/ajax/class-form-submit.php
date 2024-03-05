<?php

namespace FG_Guitars_Customizer\Ajax;

class Form_Submit {

	const ACTION = 'fggc_customizer_form_submit';

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		$action = self::ACTION;

		add_action( "wp_ajax_{$action}", [ $this, 'form_submit' ] );
		add_action( "wp_ajax_nopriv_{$action}", [ $this, 'form_submit' ] );
	}

	public function form_submit() {
		check_ajax_referer( self::ACTION, 'security' );

		$form_data = ! empty( $_POST['data'] ) ? wp_unslash( $_POST['data'] ) : '';

		$data = json_decode( $form_data, true );
		error_log( print_r( $data, 1 ) );

		wp_send_json( 'test' );
	}
}