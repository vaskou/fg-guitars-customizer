<?php

namespace FG_Guitars_Customizer\Hooks;

use FG_Guitars_Customizer\Helpers\Helpers;
use FG_Guitars_Customizer\Settings\Settings;

class Fg_Theme {

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		add_action( 'fremediti_guitars_single_fg_guitars_available_guitars_after', [ $this, 'show_single_guitar_available_guitars_customize_block' ] );
		add_action( 'fremediti_guitars_single_fg_guitars_related_guitars_before', [ $this, 'show_single_guitar_related_guitars_before_customize_block' ] );
	}

	public function show_single_guitar_available_guitars_customize_block( $guitar_id ) {
		if ( ! Helpers::show_new_single_page_customize() ) {
			return;
		}

		if ( ! Helpers::is_active_for_guitar_customizer( $guitar_id ) ) {
			return;
		}

		$customizer_page_id = Settings::get_customizer_page_id();
		$customizer_page    = get_post( $customizer_page_id );

		if ( ! $customizer_page ) {
			return;
		}

		$url = add_query_arg( [
			'model' => $guitar_id,
		], get_permalink( $customizer_page ) );

		?>
        <div class="uk-flex uk-flex-right uk-flex-middle uk-margin-large-top">
            <span class="uk-margin-right"><?php echo __( 'You can customize this model here', 'fg-guitar-customizer' ); ?></span>
            <a href="<?php echo esc_url( $url ); ?>" class="uk-button uk-button-primary"><?php echo __( 'Customize', 'fg-guitar-customizer' ); ?></a>
        </div>
		<?php
	}

	public function show_single_guitar_related_guitars_before_customize_block( $guitar_id ) {
		if ( ! Helpers::show_new_single_page_customize() ) {
			return;
		}

		if ( ! Helpers::is_active_for_guitar_customizer( $guitar_id ) ) {
			return;
		}

		$customizer_page_id = Settings::get_customizer_page_id();
		$customizer_page    = get_post( $customizer_page_id );

		if ( ! $customizer_page ) {
			return;
		}

		$url = add_query_arg( [
			'model' => $guitar_id,
		], get_permalink( $customizer_page ) );

		$bg_image_id = Settings::get_create_guitar_bg_image_id();
		$bg_image    = get_post( $bg_image_id );

		if ( empty( $bg_image_id ) || ! $bg_image ) {
			return;
		}
		?>
        <div class="fggc-create-guitar-block uk-container uk-margin-large-top uk-margin-large-bottom">
            <div class="uk-inline fggc-create-guitar-block__wrapper">
				<?php echo wp_get_attachment_image( $bg_image_id, 'full', false, [ 'class' => 'fggc-create-guitar-block__image' ] ); ?>
                <div class="uk-flex uk-flex-middle uk-overlay uk-position-center-left fggc-create-guitar-block__text-wrapper">
                    <span class="uk-text-large uk-margin-large-right fggc-create-guitar-block__text"><?php echo __( 'Create your own unique Fremediti guitar', 'fg-guitar-customizer' ); ?></span>
                    <a href="<?php echo esc_url( $url ); ?>" class="uk-button uk-button-primary fggc-create-guitar-block__button"><?php echo __( 'Customize', 'fg-guitar-customizer' ); ?></a>
                </div>
            </div>
        </div>
		<?php
	}
}