import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import { app } from 'electron';
import { createReadStream } from 'fs';

/**
 * Checks if the given file is a valid Google credentials file.
 */
export async function isValidCredentials(
    keyFilePath: string
): Promise<boolean> {
    try {
        const auth = new GoogleAuth({
            keyFile: keyFilePath,
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });
        const client = await auth.getClient();
        const url = 'https://www.googleapis.com/oauth2/v1/tokeninfo';
        const response = await client.request({ url });
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

/**
 * Returns the Google Drive auth.
 */
export function getDriveAuth() {
    const auth = new GoogleAuth({
        keyFile: `${app.getAppPath()}\\data\\credentials-key.json`,
        scopes: ['https://www.googleapis.com/auth/drive'],
    });
    return google.drive({
        version: 'v3',
        auth,
    });
}

export function uploadGoogleDriveData(savePath: string) {
    // TODO: upload file to google drive
    const fileMetadata = {
        name: 'osu-save.json',
    };
    const media = {
        mimeType: 'application/octet-stream',
        body: createReadStream(savePath),
    };
}

export function getGoogleDriveData() {
    // TODO: get data from google drive
}
