//Postcss är ett verktyg som tillåter att bygga ett system av plugins för att transformera
//css till JS och tebaka! The one css-loader bro.
const purgecss = require('@fullhuman/postcss-purgecss')
const path = require('path');

class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
    }
}

//Configure PurgeCSS
const configurePurgeCss = () => {
    return {
        //paths: arr, //purgecss tar flera paths
        exclude: '/node_modules/',
        content: [
          './src/**/*.js',
          './tw-plugins/gradients.js',
          './tailwind.js',
          './public/index.html'
        ],
        css: ['./src/tailwind.css'],
        extractors: [
            {
                extractor: TailwindExtractor,
                extensions: [
                              "html",
                              "css",
                              "js",
                            ]
            }
        ]
    };
};
console.log('Postcss doing magic');

module.exports = {
    plugins: [
        require('postcss-import')({
             plugins: [
                 require('stylelint') //Tool for understanding Different css-syntax and making that shit work
             ]
         }),
        require('tailwindcss')('./tailwind.config.js'),
        // purgecss(
        //   configurePurgeCss()
        // ),
        require('postcss-preset-env')({
            autoprefixer: { grid: true },
            features: {
                'nesting-rules': true
            }
        }),
        // require('postcss-assets')({
        //     loadPaths: ['**'],
        //   }),
    ]
};
