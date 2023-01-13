import { existsSync, mkdirSync } from 'fs';
import { ICloudController } from './ICloudController';
import { GoogleDriveController } from './GoogleDriveController';
import SettingsController from './SettingsController';
import SaveFileController from './SaveFileController';
import { osuExists } from '../utils/osuUtils';
import { DATA_FOLDER } from '../data/paths';

class StartController {
    private static instance: StartController;

    private cloudController: ICloudController | null = null;

    constructor() {
        // check for existing instance
        if (StartController.instance) {
            return StartController.instance;
        }
        StartController.instance = this;

        // create folder structure
        if (!existsSync(DATA_FOLDER)) {
            mkdirSync(DATA_FOLDER);
        }

        // initialize cloud controller
        this.selectCloudController();
    }

    public selectCloudController() {
        switch (SettingsController.settings.CloudServiceType) {
            case 'GoogleDrive':
                this.cloudController = new GoogleDriveController();
                break;
            default:
                this.cloudController = null;
        }
    }

    public async load() {
        if (
            !SettingsController.settings.GamePath ||
            !osuExists(SettingsController.settings.GamePath)
        ) {
            return;
        }
        if (this.cloudController === null) {
            // only local data
            await SaveFileController.load();
            await SaveFileController.update();
        } else {
            // fetch cloud data before local
            await this.cloudController.download();
            await SaveFileController.load();
            await SaveFileController.update();
            await this.cloudController.upload();
        }
    }
}

export default new StartController();
