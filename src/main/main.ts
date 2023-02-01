/* eslint global-require: off, no-console: off, promise/always-return: off */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { getAssetPath, resolveHtmlPath } from './utils/util';
import { channel } from './ipc/channels';
import * as events from './ipc/eventHandler';
import StartController from './controllers/StartController';
import TrayBuilder from './tray';

class AppUpdater {
    constructor() {
        log.transports.file.level = 'info';
        autoUpdater.logger = log;
        autoUpdater.checkForUpdatesAndNotify();
    }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

const isDebug =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
    require('electron-debug')();
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return installer
        .default(
            extensions.map((name) => installer[name]),
            forceDownload
        )
        .catch(console.log);
};

const createWindow = async () => {
    if (isDebug) {
        await installExtensions();
    }

    // initialize app data
    await StartController.load();

    mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        minWidth: 1024,
        minHeight: 728,
        frame: false,
        icon: getAssetPath('icon.png'),
        webPreferences: {
            preload: app.isPackaged
                ? path.join(__dirname, 'preload.js')
                : path.join(__dirname, '../../.erb/dll/preload.js'),
        },
    });

    // control events
    ipcMain.on(channel.closeApp, () => {
        mainWindow?.hide();
    });
    ipcMain.on(channel.maximizeApp, () => {
        if (mainWindow?.isMaximized()) mainWindow?.restore();
        else mainWindow?.maximize();
    });
    ipcMain.on(channel.minimizeApp, () => {
        mainWindow?.minimize();
    });

    mainWindow.loadURL(resolveHtmlPath('index.html'));

    mainWindow.on('ready-to-show', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // eslint-disable-next-line no-new
    new TrayBuilder(mainWindow);

    // Open urls in the user's browser
    mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
    });

    // Remove this if your app does not use auto updates
    // eslint-disable-next-line
    new AppUpdater();
};

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady()
    .then(() => {
        // load ipc events
        ipcMain.handle(channel.openExternal, events.openExternal);
        ipcMain.handle(channel.showDialog, events.showDialog);
        ipcMain.handle(channel.getDevice, events.getDevice);
        ipcMain.handle(channel.getSaveData, events.getSaveData);
        ipcMain.handle(channel.checkGameFolder, events.checkGameFolder);
        ipcMain.handle(channel.getSettings, events.requestSettings);
        ipcMain.handle(channel.setSettings, events.setSettings);
        ipcMain.handle(channel.selectGoogleDrive, events.selectGoogleDrive);

        createWindow();
        app.on('activate', () => {
            // On macOS, it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (mainWindow === null) createWindow();
        });
    })
    .catch(console.log);
