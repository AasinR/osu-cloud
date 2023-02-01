import { BrowserWindow, Tray, Menu, app } from 'electron';
import { getAssetPath } from './utils/util';

export default class TrayBuilder extends Tray {
    private mainWindow: BrowserWindow;

    constructor(mainWindow: BrowserWindow) {
        super(getAssetPath('icon.png'));
        this.mainWindow = mainWindow;

        const template = [
            {
                label: 'Open',
                click: () => {
                    mainWindow.show();
                },
            },
            {
                label: 'Exit',
                click: () => {
                    app.quit();
                },
            },
        ];

        const menu = Menu.buildFromTemplate(template);
        this.setContextMenu(menu);
        this.setToolTip('osu!Cloud');

        this.on('double-click', () => {
            mainWindow.show();
        });
    }
}
