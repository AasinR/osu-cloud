import { GoogleAuth } from 'google-auth-library';
import { drive_v3 } from 'googleapis';
import { readFileSync, writeFileSync } from 'fs';
import { CREDENTIALS_KEY } from '../data/paths';

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
 * Copy the service account credentials file form the given path.
 */
export function saveCredentials(filePath: string) {
    const data = readFileSync(filePath);
    writeFileSync(CREDENTIALS_KEY, data);
}

/**
 * Returns the given credentials key's Private ID and Project ID.
 */
export function getCredentialsData(filePath: string): CredentialsData {
    const data = readFileSync(filePath).toString();
    const credentials = JSON.parse(data);
    return {
        project_id: credentials.project_id,
        private_key_id: credentials.private_key_id,
    };
}

/**
 * Locate the file with the given name in Google Drive.
 */
export async function findDriveFile(
    drive: drive_v3.Drive,
    name: string
): Promise<drive_v3.Schema$File> {
    const response = await drive.files.list({
        q: `name='${name}'`,
        fields: 'nextPageToken, files(id, name)',
    });
    const { files } = response.data;
    if (files === undefined || files.length === 0) {
        throw new Error('File does not exists');
    }
    return files[0];
}
