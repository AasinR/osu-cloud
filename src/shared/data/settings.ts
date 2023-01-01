let settings: SettingsData;

/**
 * Initialize the settings variable with the given data.
 */
export function initSettings(data: SettingsData) {
    settings = data;
}

/**
 * Get the settings variable.
 */
export function getSettings(): SettingsData {
    if (settings === undefined) {
        throw new Error('Settings variable is undefined');
    }
    return settings;
}
