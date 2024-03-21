<?php

namespace FG_Guitars_Customizer\Ajax;

use FG_Guitars_Customizer\Helpers\Helpers;
use FG_Guitars_Customizer\Post_Types\Customizer_Field;
use FG_Guitars_Customizer\Post_Types\Customizer_Fields_Group;

class Form_Submit {

	const ACTION = 'fggc_customizer_form_submit';

	private static $_instance;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	private function __construct() {
		$action = self::ACTION;

		add_action( "wp_ajax_{$action}", [ $this, 'form_submit' ] );
		add_action( "wp_ajax_nopriv_{$action}", [ $this, 'form_submit' ] );
	}

	public function form_submit() {
		check_ajax_referer( self::ACTION, 'security' );

		$form_data = ! empty( $_POST['data'] ) ? wp_unslash( $_POST['data'] ) : '';

		$data = json_decode( $form_data, true );

		$body    = $this->get_mail_body( $data );
		$to      = 'vaskou@yesinternet.gr';
		$subject = 'Guitar customizer';
		$headers = [ 'Content-Type:text/html' ];

		$mail_sent = wp_mail( $to, $subject, $body, $headers );

		$response = [
			'success' => $mail_sent,
			'message' => $mail_sent ?
				__( 'Thank you for your submission', 'fg-guitar-customizer' ) :
				__( 'Something wrong happened. Please try later.', 'fg-guitars-customizer' ),
		];

		wp_send_json( $response );
	}

	public function get_mail_body( $data ) {
		if ( empty( $data ) ) {
			return '';
		}

		$guitar_selected_options = [];

		$tree = Helpers::get_group_field_option_tree();

		foreach ( $tree as $section ) {
			if ( empty( $section['groups'] ) ) {
				continue;
			}

			foreach ( $section['groups'] as $group ) {
				if ( empty( $group['group_id'] || empty( $group['fields'] ) ) ) {
					continue;
				}

				$group_has_guitar_selection_field = Customizer_Fields_Group::get_has_guitar_selection_field( $group['group_id'] );

				if ( $group_has_guitar_selection_field ) {
					if ( ! empty( $data['model'] ) ) {
						$label = __( 'Guitar', 'fg-guitar-customizer' );

						$value = Helpers::get_post_title( $data['model']['value'] );

						$guitar_selected_options[ $group['group_id'] ][] = [
							'type'  => 'text',
							'label' => $label,
							'value' => $value,
						];
					}
				}

				foreach ( $group['fields'] as $field ) {
					if ( empty( $field['field_id'] ) ) {
						continue;
					}

					$field_id = $field['field_id'];

					if ( empty( $data[ $field_id ] ) ) {
						continue;
					}
					$item = $data[ $field_id ];

					$field_group = $group['group_id'];
					$field_type  = Customizer_Field::get_field_type( $field_id );

					$label = Helpers::get_post_title( $field_id );

					if ( empty( $label ) ) {
						continue;
					}

					if ( in_array( $field_type, [ 'text', 'email', 'textarea' ] ) ) {
						$value = $item['value'];
					} else {
						$value = Helpers::get_post_title( $item['value'] );
					}

					$price = ! empty( $item['price'] ) ? $item['price'] : 0;

					$guitar_selected_options[ $field_group ][] = [
						'type'  => $field_type,
						'label' => $label,
						'value' => $value,
						'price' => $price,
					];
				}
			}

		}

		if ( ! empty( $data['price_estimate'] ) ) {
			$label = __( 'Price Estimate', 'fg-guitar-customizer' );

			$value = $data['price_estimate']['value'];

			$guitar_selected_options['price_estimate'][] = [
				'type'  => 'text',
				'label' => $label,
				'value' => $value,
			];
		}

		ob_start();
		?>

		<?php foreach ( $guitar_selected_options as $group_id => $group ): ?>

			<?php $group_title = Helpers::get_post_title( $group_id ); ?>

            <h3><?php echo $group_title; ?></h3>

			<?php foreach ( $group as $option ): ?>

				<?php if ( $option['type'] == 'textarea' ): ?>
                    <div>
                        <div><strong><?php echo $option['label']; ?></strong></div>
                        <div><?php echo wpautop( $option['value'] ); ?></div>
                    </div>
				<?php else: ?>
					<?php $price = ! empty( $option['price'] ) ? $option['price'] : ''; ?>
                    <div>
                        <span><strong><?php echo $option['label']; ?>:</strong></span> <span><?php echo $option['value']; ?></span>
						<?php if ( ! empty( $price ) ): ?>
                            <span><?php echo sprintf( __( '(+%s €)', 'fg-guitars-customizer' ), $price ) ?></span>
						<?php endif; ?>
                    </div>
				<?php endif; ?>

			<?php endforeach; ?>

		<?php endforeach; ?>

		<?php

		return ob_get_clean();
	}

	private function _get_fields_order() {
		$fields = Customizer_Field::get_items();

		if ( empty( $fields ) ) {
			return [];
		}

		$order = [];

		foreach ( $fields as $field ) {
			$order[] = $field->ID;
		}

		return $order;
	}
}