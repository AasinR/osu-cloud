import { app } from 'electron';

export const DATA_FOLDER = `${app.getAppPath()}\\data`;
export const SETTINGS_FILE = `${DATA_FOLDER}\\settings.json`;
export const SAVE_FILE = `${DATA_FOLDER}\\osu-save.json`;
export const CREDENTIALS_KEY = `${DATA_FOLDER}\\credentials-key.json`;
