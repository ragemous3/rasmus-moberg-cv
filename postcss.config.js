
// const tailwindcss = require('tailwindcss');
//Postcss är ett verktyg för att transformera
//css till JS och tebaka! The one css-loader bro.
module.exports = {

    plugins: [
        // require('postcss-import')({
        //     plugins: [
        //         require('stylelint')
        //     ]
        // }),
        require('tailwindcss')('./tailwind.config.js'),
        // require('postcss-import'),
        require('postcss-preset-env')({
            autoprefixer: { grid: true },
            features: {
                'nesting-rules': true
            }
        })
    ]
};
