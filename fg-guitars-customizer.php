<?php

/**
 * @wordpress-plugin
 * Plugin Name:       FremeditiGuitars - Guitars Customizer
 * Description:       FremeditiGuitars - Guitars Customizer
 * Version:           1.0.0
 * Author:            Vasilis Koutsopoulos
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       fg-guitars-customizer
 * Domain Path:       /languages
 */

defined( 'ABSPATH' ) or die();

define( 'FG_GUITARS_CUSTOMIZER_VERSION', '1.0.0' );
define( 'FG_GUITARS_CUSTOMIZER_PLUGIN_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'FG_GUITARS_CUSTOMIZER_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
define( 'FG_GUITARS_CUSTOMIZER_PLUGIN_DIR_NAME', basename( FG_GUITARS_CUSTOMIZER_PLUGIN_DIR_PATH ) );
define( 'FG_GUITARS_CUSTOMIZER_PLUGIN_URL', plugins_url( FG_GUITARS_CUSTOMIZER_PLUGIN_DIR_NAME ) );

include 'vendor/autoload.php';

include 'includes/class-fg-guitars-customizer.php';

FG_Guitars_Customizer\FG_Guitars_Customizer::instance();