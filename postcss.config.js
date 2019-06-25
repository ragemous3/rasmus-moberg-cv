//Postcss är ett verktyg som tillåter att bygga ett system av plugins för att transformera
//css till JS och tebaka! The one css-loader bro.

module.exports = {
    plugins: [
        require('tailwindcss')('./tailwind.config.js'),
        // require('postcss-import'),
        require('autoprefixer'),
        require('postcss-preset-env')({
            autoprefixer: { grid: true },
            features: {
                'nesting-rules': true
            }
        }),
    ]
};
