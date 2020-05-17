import {
	screen,
	BrowserWindow,
	BrowserWindowConstructorOptions
} from 'electron';
import * as Store from 'electron-store';

interface WindowPosition {
	x: number;
	y: number;
	width: number;
	height: number;
}

export default (windowName: string, options: BrowserWindowConstructorOptions): BrowserWindow => {
	const key = 'window-state';
	const name = `window-state-${windowName}`;
	const store = new Store({name});
	const defaultSize = {
		width: options.width,
		height: options.height
	};
	let state = {};
	// eslint-disable-next-line prefer-const
	let win: any;

	const restore = (): number => store.get(key, defaultSize);

	const getCurrentPosition = (): WindowPosition => {
		const position = win.getPosition();
		const size = win.getSize();
		return {
			x: position[0],
			y: position[1],
			width: size[0],
			height: size[1]
		};
	};

	const windowWithinBounds = (windowState: WindowPosition, bounds: WindowPosition): any => {
		return (
			windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
		);
	};

	const resetToDefaults = (): any => {
		const bounds = screen.getPrimaryDisplay().bounds;
		return Object.assign({}, defaultSize, {
			x: (bounds.width - defaultSize.width) / 2,
			y: (bounds.height - defaultSize.height) / 2
		});
	};

	const ensureVisibleOnSomeDisplay = (windowState: any): any => {
		const visible = screen.getAllDisplays().some(display => {
			return windowWithinBounds(windowState, display.bounds);
		});
		if (!visible) {
			// Window is partially or fully not visible now.
			// Reset it to safe defaults.
			return resetToDefaults();
		}

		return windowState;
	};

	const saveState = (): any => {
		if (!win.isMinimized() && !win.isMaximized()) {
			Object.assign(state, getCurrentPosition());
		}

		store.set(key, state);
	};

	state = ensureVisibleOnSomeDisplay(restore());

	win = new BrowserWindow({
		...options,
		...state,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: false,
			...options.webPreferences
		}
	});

	win.on('close', saveState);

	return win;
};