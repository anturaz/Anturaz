// Configuration for your app

module.exports = function(ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      "axios",
      "dbCon",
      "session",
      "prettyDate",
      "prettyMoney",
      "dataSet",
      "generatingReport",
      "loginScripts",
      "sanitize",
      "wordsCount",
      "addressDataSet"
    ],

    css: ["app.styl"],

    extras: [
      "roboto-font",
      "material-icons", // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      "fontawesome-v5"
      // 'eva-icons'
    ],

    framework: {
      all: true, // --- includes everything; for dev only!

      components: [
        "QLayout",
        "QHeader",
        "QDrawer",
        "QPageContainer",
        "QPage",
        "QToolbar",
        "QToolbarTitle",
        "QBtn",
        "QIcon",
        "QList",
        "QItem",
        "QItemSection",
        "QItemLabel"
      ],

      directives: ["Ripple"],

      // Quasar plugins
      plugins: ["Notify"]

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: true,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {}
    },

    devServer: {
      https: false,
      // port: 8080,
      open: true // opens browser window automatically
    },

    animations: "all", // --- includes all animations
    // animations: [],

    ssr: {
      pwa: true
    },

    pwa: {
      // workboxPluginMode: "InjectManifest",
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        name: "Anturaz.io",
        short_name: "Anturaz.io",
        description: "The first one-stop-shop event marketplace!",
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#d8a957",
        icons: [
          {
            src: "https://anturaz.io/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "https://anturaz.io/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "https://anturaz.io/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "https://anturaz.io/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "https://anturaz.io/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        screenshots: [
          {
            src: "https://anturaz.io/icons/anturaz.io_desktop.png",
            sizes: "1920x1080",
            type: "image/png",
            form_factor: "wide"
          },
          {
            src: "https://anturaz.io/icons/anturaz.io_mobile.png",
            sizes: "375x667",
            type: "image/png"
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      }
    }
  };
};
