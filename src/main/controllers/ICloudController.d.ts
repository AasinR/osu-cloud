export interface ICloudController {
    /**
     * Download save file from the cloud.
     */
    download(): Promise<boolean>;

    /**
     * Upload save file to the cloud.
     */
    upload(): Promise<boolean>;
}
