const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Ensure Metro can resolve `react-dom` imports that appear in some
// shared/web-oriented packages. We map them to a small native-friendly shim
// so bundling for Android/iOS doesn't fail when node_modules import web-only APIs.
config.resolver = config.resolver || {};
config.resolver.extraNodeModules = Object.assign({}, config.resolver.extraNodeModules || {}, {
	'react-dom': path.resolve(__dirname, 'shims', 'react-dom.js'),
	'react-dom/client': path.resolve(__dirname, 'shims', 'react-dom.js'),
});

module.exports = withNativeWind(config, { input: './global.css' });
