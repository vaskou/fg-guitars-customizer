<?php

namespace FG_Guitars_Customizer\Settings;

use FG_Guitars_Customizer\Post_Types\Customizer_Fields_Group;
use WordpressCustomSettings\SettingField;
use WordpressCustomSettings\SettingSection;
use WordpressCustomSettings\SettingsSetup;

class Settings extends SettingsSetup {

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		$group_post_type = Customizer_Fields_Group::POST_TYPE_NAME;
		$this->set_submenu_parent_slug( 'edit.php?post_type=' . $group_post_type );

		$this->set_page_title( __( 'FG Guitars Customizer Settings', 'fg-guitars-customizer' ) );
		$this->set_menu_title( __( 'FG Guitars Customizer Settings', 'fg-guitars-customizer' ) );
		$this->set_menu_slug( 'fg-guitars-customizer-settings' );
		$this->add_settings_link( FG_GUITARS_CUSTOMIZER_PLUGIN_BASENAME );

		$general = new SettingSection( 'general', __( 'General', 'fg-guitars-customizer' ) );

		$this->add_section( $general );

		$settings = array(
			new SettingField( 'fg_guitars_customizer_email', __( 'Email To Address', 'fg-guitars-customizer' ), 'text', $general->get_name() ),
		);

		foreach ( $settings as $setting ) {
			$this->add_setting_field( $setting );
		}

		parent::__construct();
	}

	public static function get_email() {
		return self::instance()->get_setting( 'fg_guitars_customizer_email' );
	}
}