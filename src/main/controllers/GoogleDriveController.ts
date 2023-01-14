import { GoogleAuth } from 'google-auth-library';
import { drive_v3, google } from 'googleapis';
import { createReadStream, createWriteStream } from 'fs';
import { CREDENTIALS_KEY, SAVE_FILE } from '../data/paths';
import { ICloudController } from './ICloudController';
import { findDriveFile } from '../utils/cloudUtils';

export class GoogleDriveController implements ICloudController {
    public drive: drive_v3.Drive;

    constructor() {
        const auth = new GoogleAuth({
            keyFile: CREDENTIALS_KEY,
            scopes: ['https://www.googleapis.com/auth/drive'],
        });
        this.drive = google.drive({
            version: 'v3',
            auth,
        });
    }

    async download(): Promise<boolean> {
        try {
            const file = await findDriveFile(this.drive, 'osu-save');
            const dataStream = await this.drive.files.get(
                {
                    fileId: file.id as string,
                    alt: 'media',
                },
                {
                    responseType: 'stream',
                }
            );
            const destination = createWriteStream(SAVE_FILE);
            const fileCreation = new Promise((resolve, reject) => {
                destination.on('finish', resolve);
                destination.on('error', reject);
            });
            dataStream.data.pipe(destination);
            await fileCreation;
            return true;
        } catch (error) {
            return false;
        }
    }

    async upload(): Promise<boolean> {
        const fileMetadata = {
            name: 'osu-save',
        };
        const media = {
            mimeType: 'application/json',
            body: createReadStream(SAVE_FILE),
        };

        let file: drive_v3.Schema$File | null;
        try {
            file = await findDriveFile(this.drive, 'osu-save');
        } catch (error) {
            file = null;
        }

        try {
            if (file) {
                // update file
                await this.drive.files.update({
                    fileId: file.id as string,
                    requestBody: fileMetadata,
                    media,
                    fields: 'id',
                });
            } else {
                await this.drive.files.create({
                    requestBody: fileMetadata,
                    media,
                    fields: 'id',
                });
            }
            return true;
        } catch (error) {
            return false;
        }
    }
}
