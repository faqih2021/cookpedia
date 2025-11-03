module.exports = function (api) {
  api.cache(true);

  return {
    presets: [['babel-preset-expo'], 'nativewind/babel'],

    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],

          alias: {
            '@': './',
            // shim react-dom to a native-friendly noop so packages that import
            // react-dom (web-only utilities) don't break Metro bundling for Android/iOS.
            'react-dom': './shims/react-dom.js',
            'react-dom/client': './shims/react-dom.js',
            'tailwind.config': './tailwind.config.js',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
