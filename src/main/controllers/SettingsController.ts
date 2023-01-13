import { existsSync, readFileSync, writeFileSync } from 'fs';
import { SETTINGS_PATH } from '../data/paths';

class SettingsController {
    private static instance: SettingsController;

    public settings: SettingsData = {
        GamePath: '',
        CloudServiceType: '',
    };

    constructor() {
        // check for existing instance
        if (SettingsController.instance) {
            return SettingsController.instance;
        }
        SettingsController.instance = this;

        // load settings data
        if (!existsSync(SETTINGS_PATH)) {
            // create a new settings file
            const dataString = JSON.stringify(this.settings);
            writeFileSync(SETTINGS_PATH, dataString);
        } else {
            // load data from settings file
            const data = readFileSync(SETTINGS_PATH).toString();
            this.settings = JSON.parse(data);
        }
    }

    /**
     * Write settings data into file.
     */
    save() {
        const data = JSON.stringify(this.settings);
        writeFileSync(SETTINGS_PATH, data);
    }
}

export default new SettingsController();
