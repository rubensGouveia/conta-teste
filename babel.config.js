module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript"
    ],
    plugins: [
        ["module-resolver", {
            alias: {
                "@services": [".src/services"],
                "@config": [".src/config"],
                "@types": [".src/@types"],
                "@db": [".src/db"],
                "@utils": [".src/utils"],
                "@controller": [".src/controller"]
            }
        }
        ],
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
    ]
}