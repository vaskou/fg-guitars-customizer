export interface ExternalCustomizerData {
    action: string;
    security: string;
    form_submit_action: string;
    url: string;
    price_estimate_label: string;
    price_estimate_tax_text: string;
    error_message: string;
    option_validation_message: string;
    text_validation_message: string;
}

export declare global {
    let fggc_customizer_data: ExternalCustomizerData;
}