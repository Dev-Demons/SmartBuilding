/**
 * @type {import('gatsby').GatsbyConfig}
 */
const conf = require("dotenv").config({
    path: `.env`,
})

module.exports = {
    siteMetadata: {
        title: `My Gatsby Site`,
        siteUrl: `https://www.yourdomain.tld`
    },
    plugins: [
        'gatsby-plugin-sass',
        'gatsby-plugin-image',
        'gatsby-plugin-sitemap', {
            resolve: 'gatsby-plugin-manifest',
            options: {
                'icon': 'src/images/favicon-32x32.png'
            }
        }, 'gatsby-plugin-sharp',
        'gatsby-transformer-sharp', {
            resolve: 'gatsby-source-filesystem',
            options: {
                'name': 'images',
                'path': './src/images/'
            },
            __key: 'images'
        }, {
            resolve: 'gatsby-source-filesystem',
            options: {
                'name': 'pages',
                'path': './src/pages/'
            },
            __key: 'pages'
        }, `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `./src/data/`,
            },

        },
        "gatsby-plugin-react-svg"
    ]
};
