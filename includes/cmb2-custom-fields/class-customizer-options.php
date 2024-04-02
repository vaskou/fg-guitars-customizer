<?php

namespace FG_Guitars_Customizer\Cmb2_Custom_Fields;

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

		$sections = $field->options();

		ob_start();

		if ( is_array( $sections ) && ! empty( $sections ) ):
			?>
            <div class="fggc-customizer-options-field-wrapper">
				<?php echo $this->_get_sections_html( $sections, $field_type, $escaped_value ); ?>
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

			$price    = ! empty( $value['price'] ) ? $value['price'] : '';
			$enable   = ! empty( $value['enable'] ) ? $value['enable'] : '';
			$default  = ! empty( $value['default'] ) ? $value['default'] : '';
			$required = ! empty( $value['required'] ) ? $value['required'] : '';


			$sanitized_price = sanitize_text_field( $price );
			$sanitized_price = isset( $sanitized_price ) && '' != $sanitized_price ? floatval( $sanitized_price ) : '';

			$sanitized_val[ $key ]['price'] = is_float( $sanitized_price ) ? $sanitized_price : '';

			$sanitized_enable = sanitize_text_field( $enable );
			$sanitized_enable = isset( $sanitized_enable ) && 'on' == $sanitized_enable ? $sanitized_enable : '';

			$sanitized_val[ $key ]['enable'] = $sanitized_enable;

			$sanitized_default = sanitize_text_field( $default );
			$sanitized_default = isset( $sanitized_default ) && 'on' == $sanitized_default ? $sanitized_default : '';

			$sanitized_val[ $key ]['default'] = $sanitized_default;

			$sanitized_required = sanitize_text_field( $required );
			$sanitized_required = isset( $sanitized_required ) && 'on' == $sanitized_required ? $sanitized_required : '';

			$sanitized_val[ $key ]['required'] = $sanitized_required;

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

	/**
	 * @param array $sections
	 * @param \CMB2_Types $field_type
	 * @param mixed $escaped_value
	 *
	 * @return false|string
	 */
	private function _get_sections_html( $sections, $field_type, $escaped_value ) {
		ob_start();
		?>

		<?php foreach ( $sections as $section ): ?>
			<?php

			if ( empty( $section ) || empty( $section['section_id'] ) ) {
				continue;
			}

			$section_id    = $section['section_id'];
			$section_title = ! empty( $section['section_title'] ) ? $section['section_title'] : '';

			if ( empty( $section['groups'] ) ) {
				continue;
			}

			$groups = $section['groups'];

			?>
            <div class="section-<?php echo $section_id; ?> cmb-row">
                <div class="field" style="clear:both;">
                    <div class="cmb-th">
                        <label><?php echo $section_title; ?></label>
                    </div>
                    <div class="cmb-td">
						<?php echo $this->_get_groups_html( $groups, $field_type, $escaped_value ); ?>
                    </div>
                </div>
            </div>
		<?php endforeach; ?>

		<?php
		return ob_get_clean();
	}

	/**
	 * @param array $groups
	 * @param \CMB2_Types $field_type
	 * @param mixed $escaped_value
	 *
	 * @return false|string
	 */
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

			$closed_class = $this->_get_closed_class( 'fggc_id_' . esc_attr( $group_id ) );
			?>
            <div id="fggc_id_<?php echo esc_attr( $group_id ); ?>" class="fggc-group-wrapper group-<?php echo $group_id; ?>">
                <label class="fggc-group-label <?php echo $closed_class; ?>"><?php echo $group_title; ?><?php echo $this->_get_toggle_html(); ?></label>

				<?php echo $this->_get_fields_html( $fields, $field_type, $escaped_value ); ?>
            </div>
		<?php endforeach; ?>

		<?php
		return ob_get_clean();
	}

	/**
	 * @param array $fields
	 * @param \CMB2_Types $field_type
	 * @param mixed $escaped_value
	 *
	 * @return false|string
	 */
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
			$f_type      = ! empty( $field['field_type'] ) ? $field['field_type'] : '';

			if ( in_array( $f_type, [ 'radio', 'select' ] ) ) {
				if ( empty( $field['options'] ) ) {
					continue;
				}

				$field_options = $field['options'];

				$field_content = $this->_get_field_options_html( $field_options, $field_type, $escaped_value );
			} else {
				$field_content = $this->_get_field_html( $field_id, $field_title, $f_type, $field_type, $escaped_value );
			}

			$closed_class = $this->_get_closed_class( 'fggc_id_' . esc_attr( $field_id ) );
			?>
            <div class="fggc-group-content">
                <div id="fggc_id_<?php echo esc_attr( $field_id ); ?>" class="fggc-field-wrapper field-<?php echo $field_id; ?>">
                    <label class="fggc-field-label <?php echo $closed_class; ?>"><?php echo $field_title; ?><?php echo $this->_get_toggle_html(); ?></label>
                    <div class="fggc-field-content">
						<?php echo $this->_get_required_html( $field_id, $field_type, $escaped_value ); ?>
						<?php echo $field_content; ?>
                    </div>
                </div>
            </div>
		<?php endforeach; ?>

		<?php
		return ob_get_clean();
	}

	/**
	 * @param string $field_id
	 * @param \CMB2_Types $field_type
	 * @param mixed $escaped_value
	 *
	 * @return false|string
	 */
	private function _get_required_html( $field_id, $field_type, $escaped_value ) {
		ob_start();

		$is_enabled = ! empty( $escaped_value[ $field_id ]['required'] );
		$args       = [
			'id'   => $field_type->_id( '_option_enable_' . $field_id ),
			'name' => $field_type->_name( '[' . $field_id . '][required]' ),
		];
		?>
        <div class="field-<?php echo $field_id; ?> cmb-row">
            <div class="field" style="clear:both;">
                <div class="cmb-th">
                    <label><?php echo __( 'Required', 'fg-guitar-customizer' ); ?></label>
                </div>
                <div class="cmb-td">
					<?php echo $field_type->checkbox( $args, $is_enabled ); ?>
                </div>
            </div>
        </div>
		<?php
		return ob_get_clean();
	}

	/**
	 * @param string $field_id
	 * @param string $field_title
	 * @param string $f_type
	 * @param \CMB2_Types $field_type
	 * @param mixed $escaped_value
	 *
	 * @return false|string
	 */
	private function _get_field_html( $field_id, $field_title, $f_type, $field_type, $escaped_value ) {
		ob_start();

		$is_enabled = ! empty( $escaped_value[ $field_id ]['enable'] );
		$args       = [
			'id'   => $field_type->_id( '_option_enable_' . $field_id ),
			'name' => $field_type->_name( '[' . $field_id . '][enable]' ),
		];
		?>
        <div class="field-<?php echo $field_id; ?> cmb-row">
            <div class="field" style="clear:both;">
                <div class="cmb-th">
                    <label><?php echo __( 'Enable', 'fg-guitar-customizer' ); ?></label>
                </div>
                <div class="cmb-td">
					<?php echo $field_type->checkbox( $args, $is_enabled ); ?>
                </div>
            </div>
        </div>
		<?php
		return ob_get_clean();
	}

	/**
	 * @param array $options
	 * @param \CMB2_Types $field_type
	 * @param mixed $escaped_value
	 *
	 * @return false|string
	 */
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

				$is_default      = ! empty( $escaped_value[ $option_key ]['default'] );
				$is_default_args = [
					'id'   => $field_type->_id( '_option_default_' . $option_key ),
					'name' => $field_type->_name( '[' . $option_key . '][default]' ),
				];

				$closed_class = $this->_get_closed_class( 'fggc_id_' . esc_attr( $option_key ) );
				?>

                <div id="fggc_id_<?php echo esc_attr( $option_key ); ?>" class="fggc-option">
                    <label class="fggc-option-label <?php echo $closed_class; ?>"><?php echo $option; ?><?php echo $this->_get_toggle_html(); ?></label>
                    <div class="fggc-option-content option-<?php echo $option_args['id']; ?>">
                        <div class="cmb-row">
                            <div class="field" style="clear:both;">
                                <div class="cmb-th">
                                    <label><?php echo __( 'Enable', 'fg-guitar-customizer' ); ?></label>
                                </div>
                                <div class="cmb-td">
									<?php echo $field_type->checkbox( $option_args, $is_enabled ); ?>
                                </div>
                            </div>
                            <div class="field" style="clear:both;">
                                <div class="cmb-th">
                                    <label><?php echo __( 'Price', 'fg-guitar-customizer' ); ?></label>
                                </div>
                                <div class="cmb-td">
									<?php echo $field_type->input( $price_args ); ?>
                                </div>
                            </div>
                            <div class="field" style="clear:both;">
                                <div class="cmb-th">
                                    <label><?php echo __( 'Is selected by default', 'fg-guitar-customizer' ); ?></label>
                                </div>
                                <div class="cmb-td">
									<?php echo $field_type->checkbox( $is_default_args, $is_default ); ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

			<?php endforeach; ?>
        </div>
		<?php
		return ob_get_clean();
	}

	private function _get_toggle_html() {
		ob_start();
		?>
        <div class="fggc-toggle">
            <div class="fggc-close"><span class="dashicons dashicons-arrow-up"></span><?php echo __( 'Close', 'fg-guitars-customizer' ); ?></div>
            <div class="fggc-open"><span class="dashicons dashicons-arrow-down"></span><?php echo __( 'Open', 'fg-guitars-customizer' ); ?></div>
        </div>
		<?php
		return ob_get_clean();
	}

	private function _get_closed_class( $box_id ) {
		$screen = get_current_screen();
		$page   = $screen->id;

		return postbox_classes( $box_id, $page );
	}
}