import {app, ipcMain} from 'electron';
import unhandled from 'electron-unhandled';
import serve from 'electron-serve';

import {createWindow} from './helpers';

const isProd = process.env.NODE_ENV === 'production';

unhandled();

if (isProd) {
	serve({directory: 'app'});
} else {
	app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
	await app.whenReady();

	const mainWindow = createWindow('main', {
		minWidth: 524,
		width: 524,
		minHeight: 524,
		height: 524
	});

	if (isProd) {
		await mainWindow.loadURL('app://./home.html');
	} else {
		const port = process.argv[2];
		await mainWindow.loadURL(`http://localhost:${port}/home`);
		mainWindow.webContents.openDevTools();
	}
})();

ipcMain.handle('ping', async () => {
	return 'ok';
});

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
	app.quit();
}

app.on('window-all-closed', () => {
	app.quit();
});
