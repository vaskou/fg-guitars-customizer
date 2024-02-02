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

		$title_value = ! is_array( $escaped_value ) ? $escaped_value : ( ! empty( $escaped_value['title'] ) ? $escaped_value['title'] : '' );

		$title_args = [
			'type'  => 'text',
			'id'    => $field_type->_id( '_title' ),
			'name'  => $field_type->_name( '[title]' ),
			'value' => $title_value,
		];

		$price_value = ! is_array( $escaped_value ) ? $escaped_value : ( ! empty( $escaped_value['price'] ) ? $escaped_value['price'] : '' );

		$price_args = [
			'type'  => 'text',
			'id'    => $field_type->_id( '_price' ),
			'name'  => $field_type->_name( '[price]' ),
			'value' => $price_value,
		];

		$fields = [
			'title' => [
				'type'  => 'text',
				'title' => __( 'Title', 'fg-guitars-customizer' ),
			],
			'price' => [
				'type'  => 'text',
				'title' => __( 'Price', 'fg-guitars-customizer' ),
			],
		];

		ob_start();
		?>
        <div class="fggc_cmb2_field_option_field">
			<?php foreach ( $fields as $key => $args ): ?>
				<?php $type = $args['type']; ?>
				<?php $id = "_{$key}"; ?>
				<?php $name = "[{$key}]"; ?>
				<?php $value = ! is_array( $escaped_value ) ? $escaped_value : ( ! empty( $escaped_value[ $key ] ) ? $escaped_value[ $key ] : '' ); ?>

				<?php
				$field_params = [
					'type'  => $type,
					'id'    => $field_type->_id( $id ),
					'name'  => $field_type->_name( $name ),
					'value' => $value,
				];
				?>
                <div class="option-<?php echo $key; ?> cmb-row">
                    <div class="cmb-th">
                        <label><?php echo $args['title']; ?></label>
                    </div>
                    <div class="cmb-td">
						<?php echo $field_type->input( $field_params ); ?>
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

			$has_value = false;
			$sanitized = [];

			foreach ( $value as $k => $v ) {
				$v = ! empty( $v ) ? $v : '';

				$sanitized[ $k ] = sanitize_text_field( $v );

				if ( ! $has_value ) {
					$has_value = ! empty( $sanitized[ $k ] );
				}
			}

			if ( $has_value ) {
				$sanitized_val[ $key ] = $sanitized;
			}

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