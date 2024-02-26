export interface ExternalCustomizerData {
    action: string;
    url: string;
    price_estimate_label: string;
    price_estimate_tax_text: string;
}

export declare global {
    let fggc_customizer_data: ExternalCustomizerData;
}