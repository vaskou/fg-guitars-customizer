<?php

namespace FG_Guitars_Customizer\Cmb2_Custom_Fields;

class Option {

	private $field_type;

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		$this->field_type = 'fggc_cmb2_field_option_field';
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

		$options = ! empty( $field->args['options'] ) ? $field->args['options'] : array();

		ob_start();
		?>
        <div class="fggc_cmb2_field_option_field">
			<?php foreach ( $options as $option_key => $option ): ?>
				<?php
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
}