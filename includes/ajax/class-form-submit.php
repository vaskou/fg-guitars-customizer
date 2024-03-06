<?php

namespace FG_Guitars_Customizer\Ajax;

use FG_Guitars_Customizer\Helpers\Helpers;
use FG_Guitars_Customizer\Post_Types\Customizer_Field;

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
		error_log( print_r( $data, 1 ) );
		$body    = $this->get_mail_body( $data );
		$to      = 'vaskou@yesinternet.gr';
		$subject = 'Guitar customizer';
		$headers = [ 'Content-Type:text/html' ];
		error_log( print_r( $body, 1 ) );
//		wp_mail( $to, $subject, $body, $headers );

		wp_send_json( 'test' );
	}

	public function get_mail_body( $data ) {
		if ( empty( $data ) ) {
			return '';
		}

		$guitar_selected_options = [];

		if ( ! empty( $data['model'] ) ) {
			$label = __( 'Guitar', 'fg-guitar-customizer' );

			$value = Helpers::get_post_title( $data['model'] );

			$guitar_selected_options[][] = [
				'type'  => 'text',
				'label' => $label,
				'value' => $value,
			];
		}

		foreach ( $data as $field_id => $option_id ) {
			$field_group = Customizer_Field::get_field_group( $field_id );
			$field_type  = Customizer_Field::get_field_type( $field_id );

			$label = Helpers::get_post_title( $field_id );

			if ( empty( $label ) ) {
				continue;
			}

			if ( in_array( $field_type, [ 'text', 'email', 'textarea' ] ) ) {
				$value = $option_id;
			} else {
				$value = Helpers::get_post_title( $option_id );
			}

			$group = Helpers::get_post_title( $field_group );

			$guitar_selected_options[ $field_group ][] = [
				'group' => $group,
				'type'  => $field_type,
				'label' => $label,
				'value' => $value,
			];
		}

		ob_start();
		?>

		<?php foreach ( $guitar_selected_options as $groups ):
            ?>

			<?php foreach ( $groups as $option ): ?>

				<?php if ( $option['type'] == 'textarea' ): ?>
                    <div>
                        <div><strong><?php echo $option['label']; ?></strong></div>
                        <div><?php echo wpautop( $option['value'] ); ?></div>
                    </div>
				<?php else: ?>
                    <div>
                        <span><strong><?php echo $option['label']; ?>:</strong></span> <span><?php echo $option['value']; ?></span>
                    </div>
				<?php endif; ?>

			<?php endforeach; ?>

		<?php endforeach; ?>

		<?php

		return ob_get_clean();
	}
}