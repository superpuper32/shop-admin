// Karma configuration
// Generated on Fri Mar 13 2020 10:42:41 GMT+0300 (Moscow Standard Time)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine"],

    // list of files / patterns to load in the browser
    files: [
      {
        pattern: "components/range-picker/test.js",
        type: "module",
        included: true,
        served: true
      },
      { pattern: "**/*.js", type: "module", included: false, served: true },
      { pattern: "**/*.css", type: "css", included: true, served: true },
      { pattern: "**/*.svg", included: false, served: true }
    ],

    // list of files / patterns to exclude
    exclude: ["*module/*task/modules/**"],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["dots"], // progress

    jsonReporter: {
      stdout: true
      // outputFile: 'results/results.json' // defaults to none
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: false,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["Chrome"],
    // browsers: ['ChromeHeadless'],
    // browsers: ['ChromeHeadlessNoSandbox'],
    // customLaunchers: {
    //   ChromeHeadlessNoSandbox: {
    //     base: "ChromeHeadless",
    //     flags: [
    //       "--no-sandbox",
    //       "--user-data-dir=/tmp/chrome-test-profile",
    //       "--disable-web-security",
    //       "--lang=ru" // affects date.toLocaleString formatting for tests
    //     ]
    //   }
    // },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
