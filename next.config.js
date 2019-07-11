module.exports = {
    webpack: (config, { dev }) => {
        const eslintRule = {
            test: /\.js$/,
            enforce: 'pre',
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
                emitWarning: dev,
            },
        };

        const cssRule = {
            test: /\.css$/,
            use: {
                loader: 'css-loader',
                options: {
                    sourceMap: false,
                },
            },
        };

        config.node = {
            fs: 'empty'
        };

        config.module.rules.push(eslintRule);
        config.module.rules.push(cssRule);
        return config;
    },
    publicRuntimeConfig: { // Will be available on both server and client
        isProd: process.env.EPAAS_ENV ? process.env.EPAAS_ENV.includes('e3') : false,
        isE2: process.env.EPAAS_ENV ? process.env.EPAAS_ENV.includes('e2') : false
    }

};