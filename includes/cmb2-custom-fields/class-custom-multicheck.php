<?php

class FG_Guitars_Customizer_Custom_Multicheck extends \CMB2_Type_Multicheck {

	/**
	 * Generates html for concatenated items
	 *
	 * @param array $args Optional arguments
	 *
	 * @return string        Concatenated html items
	 * @since  1.1.0
	 */
	public function concat_items( $args = array() ) {
		$field = $this->field;

		$method = isset( $args['method'] ) ? $args['method'] : 'select_option';
		unset( $args['method'] );

		$value = null !== $field->escaped_value()
			? $field->escaped_value()
			: $field->get_default();

		$value = CMB2_Utils::normalize_if_numeric( $value );

		$concatenated_items = '';
		$i                  = 1;

		$options = array();
		if ( $option_none = $field->args( 'show_option_none' ) ) {
			$options[''] = $option_none;
		}
		$options = $options + (array) $field->options();
		foreach ( $options as $opt_value => $opt_label ) {

			// Clone args & modify for just this item
			$a = $args;

			$a['value'] = $opt_value;

			if ( ! is_array( $opt_label ) ) {
				$a['label'] = $opt_label;
			} else {
				$a = wp_parse_args( $opt_label, $a );
			}

			// Check if this option is the value of the input
			if ( $value === CMB2_Utils::normalize_if_numeric( $opt_value ) ) {
				$a['checked'] = 'checked';
			}

			$concatenated_items .= $this->$method( $a, $i ++ );
		}

		return $concatenated_items;
	}

}