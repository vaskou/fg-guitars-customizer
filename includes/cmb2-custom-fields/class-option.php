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
//		add_action( "cmb2_sanitize_{$this->field_type}", array( $this, 'sanitize' ), 10, 2 );
//		add_action( "cmb2_types_esc_{$this->field_type}", array( $this, 'escape_value' ), 10, 2 );
		// TODO: add sanitize and escape functions
	}

	/**
	 * @param $field         CMB2_Field
	 * @param $escaped_value mixed
	 * @param $object_id     int
	 * @param $object_type   string
	 * @param $field_type    CMB2_Types
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

		ob_start();
		?>
        <div class="fggc_cmb2_field_option_field">
            <div class="option-title cmb-row">
                <div class="cmb-th">
                    <label><?php echo __( 'Title', 'fg-guitars-customizer' ); ?></label>
                </div>
                <div class="cmb-td">
					<?php echo $field_type->input( $title_args ); ?>
                </div>
            </div>
            <div class="option-price cmb-row">
                <div class="cmb-th">
                    <label><?php echo __( 'Price', 'fg-guitars-customizer' ); ?></label>
                </div>
                <div class="cmb-td">
					<?php echo $field_type->input( $price_args ); ?>
                </div>
            </div>
        </div>
		<?php

		$html = ob_get_clean();

		echo $html;
	}
}