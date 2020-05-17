const withFonts = require('next-fonts');

module.exports = withFonts({
	webpack: config => Object.assign(config, {target: 'electron-renderer'}),
	reactStrictMode: true,
	experimental: {
		modern: true
	}
});
