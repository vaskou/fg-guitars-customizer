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
			new SettingField( 'fg_guitars_customizer_page_id', __( 'Customizer Page', 'fg-guitars-customizer' ), 'pages', $general->get_name() ),
			new SettingField( 'fg_guitars_customizer_create_guitar_bg_image_id', __( 'Guitar Single page "Create your guitar" block background image ID', 'fg-guitars-customizer' ), 'select', $general->get_name(), $this->_get_attachment_options() ),
			new SettingField( 'fg_guitars_customizer_new_single_page_customize_roles', __( 'Enable single page "Customize" for these roles', 'fg-guitars-customizer' ), 'multiselect', $general->get_name(), $this->_get_user_role_options() ),
		);

		foreach ( $settings as $setting ) {
			$this->add_setting_field( $setting );
		}

		parent::__construct();
	}

	public static function get_email() {
		return self::instance()->get_setting( 'fg_guitars_customizer_email' );
	}

	public static function get_customizer_page_id() {
		return self::instance()->get_setting( 'fg_guitars_customizer_page_id' );
	}

	public static function get_create_guitar_bg_image_id() {
		return self::instance()->get_setting( 'fg_guitars_customizer_create_guitar_bg_image_id' );
	}

	public static function get_new_single_page_customize_roles() {
		return self::instance()->get_setting( 'fg_guitars_customizer_new_single_page_customize_roles' );
	}

	private function _get_attachment_options() {
		$attachment_options = [
			'options' => [
				'' => __( 'None', 'fg-guitars-customizer' ),
			]
		];

		$attachments = get_posts( [
			'post_type'      => 'attachment',
			'posts_per_page' => - 1,
			'post_mime_type' => 'image',
			'orderby'        => 'name',
			'order'          => 'ASC',
		] );

		if ( empty( $attachments ) ) {
			return $attachment_options;
		}

		foreach ( $attachments as $attachment ) {
			$attachment_options['options'][ $attachment->ID ] = $attachment->post_title;
		}

		return $attachment_options;
	}

	private function _get_user_role_options() {
		$user_role_options = array(
			'options' => array(
				'all' => __( 'All', 'fg-guitars-customizer' ),
			)
		);

		$roles = wp_roles()->roles;
		foreach ( $roles as $key => $role ) {
			$name = translate_user_role( $role['name'] );

			$user_role_options['options'][ esc_attr( $key ) ] = $name;
		}

		return $user_role_options;
	}
}