import { runBrowserTests } from './tests.js';

const API_KEY = process.env.GLUON_API_KEY;

const capabilities = {
    'platformName': 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:deviceName': 'com.apple.CoreSimulator.SimDeviceType.iPhone-14',
    'appium:platformVersion': 'com.apple.CoreSimulator.SimRuntime.iOS-16-4',
    "appium:connectionRetryTimeout": 600000,
    'browserName': 'Safari',
    'gluon:gluonApiKey': API_KEY
};

const options = {
    hostname: 'api.gluontest.com',
    protocol: 'https',
    port: 443,
    logLevel: 'silent',
    capabilities,
    path: '/wd/hub',
    retries: 0
};

await runBrowserTests(options);
