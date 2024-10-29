const withPlugins = require('next-compose-plugins'),
    images = require('next-images'),
    graphql = require('next-plugin-graphql');

module.exports = withPlugins([
    [images],
    [graphql],
    {
        i18n: {
            locales: ['en', 'es'],
            defaultLocale: 'es',
        },
    }
]);
