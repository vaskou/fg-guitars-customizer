<?php

class FG_Guitars_Customizer_Custom_Select extends \CMB2_Type_Select {

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
		error_log( print_r( $options, 1 ) );
		foreach ( $options as $opt_value => $opt_label ) {

			if ( ! is_array( $opt_label ) ) {
				// Clone args & modify for just this item
				$a = $args;

				$a['value'] = $opt_value;
				$a['label'] = $opt_label;

				// Check if this option is the value of the input
				if ( $value === CMB2_Utils::normalize_if_numeric( $opt_value ) ) {
					$a['checked'] = 'checked';
				}

				$concatenated_items .= $this->$method( $a, $i ++ );
			} else {
				$field_options = $opt_label;

				$label = $field_options['label'];
				$items = $field_options['items'];

				if ( empty( $items ) ) {
					continue;
				}

				$concatenated_items .= '<optgroup label="' . $label . '">';
				foreach ( $items as $item_value => $item_label ) {
					$a = $args;

					$a['value'] = $item_value;
					$a['label'] = $item_label;

					// Check if this option is the value of the input
					if ( $value === CMB2_Utils::normalize_if_numeric( $item_value ) ) {
						$a['checked'] = 'checked';
					}

					$concatenated_items .= $this->$method( $a, $i ++ );
				}
				$concatenated_items .= '</optgroup>';
			}
		}

		return $concatenated_items;
	}

	public function render() {
		$a = $this->parse_args( 'select', array(
			'class'   => 'cmb2_select',
			'name'    => $this->_name(),
			'id'      => $this->_id(),
			'desc'    => $this->_desc( true ),
			'options' => $this->concat_items(),
		) );

		$attrs = $this->concat_attrs( $a, array( 'desc', 'options' ) );

		return $this->rendered(
			sprintf( '<select%s>%s</select>%s', $attrs, $a['options'], $a['desc'] )
		);
	}

}