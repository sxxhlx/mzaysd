module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-plugin-px2viewport')({
            exclude: [
                /[\\/]node_modules[\\/]/
            ]
        })
    ]
};
