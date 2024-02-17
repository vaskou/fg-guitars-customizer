<?php

namespace FG_Guitars_Customizer\Cmb2_Custom_Fields;

use FG_Guitars_Customizer\Post_Types\Customizer_Field;
use FG_Guitars_Customizer\Post_Types\Customizer_Fields_Group;

class Customizer_Options {

	private $field_type;

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		$this->field_type = 'fggc_cmb2_customizer_options_field';
		add_action( "cmb2_render_{$this->field_type}", [ $this, 'render' ], 10, 5 );
		add_action( "cmb2_sanitize_{$this->field_type}", array( $this, 'sanitize' ), 10, 2 );
		add_action( "cmb2_types_esc_{$this->field_type}", array( $this, 'escape_value' ), 10, 2 );
	}

	/**
	 * @param $field         \CMB2_Field
	 * @param $escaped_value mixed
	 * @param $object_id     int
	 * @param $object_type   string
	 * @param $field_type    \CMB2_Types
	 */
	public function render( $field, $escaped_value, $object_id, $object_type, $field_type ) {

		$groups = $field->options();

		ob_start();

		if ( is_array( $groups ) && ! empty( $groups ) ):
			?>
            <div class="fggc-customizer-options-field-wrapper">
				<?php echo $this->_get_groups_html( $groups, $field_type, $escaped_value ); ?>
            </div>

		<?php
		endif;

		$html = ob_get_clean();

		echo $html;
	}

	public function sanitize( $sanitized_val, $val ) {

		if ( ! is_array( $val ) ) {
			return array();
		}

		foreach ( $val as $key => $value ) {

			$price  = ! empty( $value['price'] ) ? $value['price'] : '';
			$enable = ! empty( $value['enable'] ) ? $value['enable'] : '';


			$sanitized_price = sanitize_text_field( $price );
			$sanitized_price = isset( $sanitized_price ) && '' != $sanitized_price ? floatval( $sanitized_price ) : '';

			$sanitized_val[ $key ]['price'] = is_float( $sanitized_price ) ? $sanitized_price : '';

			$sanitized_enable = sanitize_text_field( $enable );
			$sanitized_enable = isset( $sanitized_enable ) && 'on' == $sanitized_enable ? $sanitized_enable : '';

			$sanitized_val[ $key ]['enable'] = $sanitized_enable;

		}

		return $sanitized_val;
	}

	public function escape_value( $escaped_value, $val ) {

		if ( ! is_array( $val ) ) {
			return array();
		}

		foreach ( $val as $key => $value ) {

			foreach ( $value as $k => $v ) {
				$v = ! empty( $v ) ? $v : '';

				$escaped_value[ $key ][ $k ] = esc_attr( $v );
			}

		}

		return $escaped_value;
	}

	private function _get_groups_html( $groups, $field_type, $escaped_value ) {
		ob_start();
		?>

		<?php foreach ( $groups as $group ): ?>
			<?php

			if ( empty( $group ) || empty( $group['group_id'] ) ) {
				continue;
			}

			$group_id    = $group['group_id'];
			$group_title = ! empty( $group['group_title'] ) ? $group['group_title'] : '';

			if ( empty( $group['fields'] ) ) {
				continue;
			}

			$fields = $group['fields'];

			?>
            <div class="fggc-group-wrapper group-<?php echo $group_id; ?>">
                <label class="fggc-group-label"><?php echo $group_title; ?></label>

				<?php echo $this->_get_fields_html( $fields, $field_type, $escaped_value ); ?>
            </div>
		<?php endforeach; ?>

		<?php
		return ob_get_clean();
	}

	private function _get_fields_html( $fields, $field_type, $escaped_value ) {
		ob_start();
		?>

		<?php foreach ( $fields as $field ): ?>
			<?php
			if ( empty( $field ) || empty( $field['field_id'] ) ) {
				continue;
			}
			$field_id    = $field['field_id'];
			$field_title = ! empty( $field['field_title'] ) ? $field['field_title'] : '';

			if ( empty( $field['options'] ) ) {
				continue;
			}

			$field_options = $field['options'];

			?>
            <div class="fggc-group-content">
                <div class="fggc-field-wrapper field-<?php echo $field_id; ?>">
                    <label class="fggc-field-label"><?php echo $field_title; ?></label>
                    <div class="fggc-field-content">
						<?php echo $this->_get_field_options_html( $field_options, $field_type, $escaped_value ); ?>
                    </div>
                </div>
            </div>
		<?php endforeach; ?>

		<?php
		return ob_get_clean();
	}

	private function _get_field_options_html( $options, $field_type, $escaped_value ) {
		ob_start();
		?>
        <div class="fggc-options-wrapper">
			<?php foreach ( $options as $option ): ?>
				<?php

				if ( empty( $option['option_id'] ) || empty( $option['option_title'] ) ) {
					continue;
				}

				$option_key = $option['option_id'];
				$option     = $option['option_title'];

				$is_enabled  = ! empty( $escaped_value[ $option_key ]['enable'] );
				$option_args = [
					'id'   => $field_type->_id( '_option_enable_' . $option_key ),
					'name' => $field_type->_name( '[' . $option_key . '][enable]' ),
				];

				$price_value = isset( $escaped_value[ $option_key ]['price'] ) ? $escaped_value[ $option_key ]['price'] : '';
				$price_args  = [
					'id'    => $field_type->_id( '_option_price_' . $option_key ),
					'name'  => $field_type->_name( '[' . $option_key . '][price]' ),
					'type'  => 'text',
					'value' => $price_value,
					'class' => 'cmb2-text-small'
				];
				?>
                <div class="option-<?php echo $option_args['id']; ?> cmb-row">
                    <div class="field" style="clear:both;">
                        <div class="cmb-th">
                            <label><?php echo $option; ?></label>
                        </div>
                        <div class="cmb-td">
							<?php echo $field_type->checkbox( $option_args, $is_enabled ); ?>
                        </div>
                    </div>
                    <div class="field" style="clear:both;">
                        <div class="cmb-th">
                            <label><?php echo __( 'Price' ); ?></label>
                        </div>
                        <div class="cmb-td">
							<?php echo $field_type->input( $price_args ); ?>
                        </div>
                    </div>
                </div>

			<?php endforeach; ?>
        </div>
		<?php
		return ob_get_clean();
	}
}