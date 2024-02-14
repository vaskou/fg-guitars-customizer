export interface ExternalCustomizerData {
    action: string;
    url: string;
}

export declare global {
    let fggc_customizer_data: ExternalCustomizerData;
}