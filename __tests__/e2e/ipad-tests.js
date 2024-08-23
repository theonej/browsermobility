import { remote } from 'webdriverio';

const API_KEY = process.env.GLUON_API_KEY;

const capabilities = {
    'platformName': 'iOS',
    'appium:automationName': 'XCUITest',
    'appium:deviceName': 'com.apple.CoreSimulator.SimDeviceType.iPhone-15',
    'appium:platformVersion': 'com.apple.CoreSimulator.SimRuntime.iOS-17-4',
    "appium:connectionRetryTimeout": 600000,
    'browserName': 'Safari',
    'gluon:gluonApiKey': API_KEY
};

const options = {
    hostname: 'api.browsermobility.com',
    protocol: 'https',
    port: 443,
    logLevel: 'silent',
    capabilities,
    path: '/wd/hub',
    retries: 0
};


const loadSwaggerDocs = async (options) => {
    const browser = await remote(options);
    try {
        await browser.url("https://api.browsermobility.com/sessions/swagger/index.html")
        await browser.setTimeout({ 'pageLoad': 10000 });

        console.info('loaded page successfully');

        const element = await getElementWithTimeout(browser, '/*[local-name()=\"html\"][1]/*[local-name()=\"body\"][1]/*[local-name()=\"div\"][1]/*[local-name()=\"section\"][1]/*[local-name()=\"div\"][2]/*[local-name()=\"div\"][2]/*[local-name()=\"div\"][3]/*[local-name()=\"section\"][1]/*[local-name()=\"div\"][1]/*[local-name()=\"span\"][1]/*[local-name()=\"div\"][1]/*[local-name()=\"div\"][1]/*[local-name()=\"div\"][1]/*[local-name()=\"span\"][1]/*[local-name()=\"div\"][1]/*[local-name()=\"div\"][1]/*[local-name()=\"button\"][1]/*[local-name()=\"span\"][2]', 15000);
        
        await element.click();
        console.info('clicked elment successfully');

        return true;

    } catch (e) {   
        console.info(e);
        throw e;
    }
    finally{
        await browser.deleteSession();
    }
};
const navigateToDatadogDocs = async (options) => {
    const browser = await remote(options);
    try {

        await browser.activateApp('com.apple.mobilesafari');
        await browser.setTimeout({ 'pageLoad': 10000 });

        await sleep(5000);

        await browser.url("http://browsermobility.com/")
        await browser.setTimeout({ 'pageLoad': 10000 });

        console.info('loaded page successfully');

        let anchor = await getElementWithTimeout(browser, "aria/Docs", 1000);
        await anchor.click();
        await browser.url("http://browsermobility.com/docs")
        await browser.setTimeout({ 'pageLoad': 10000 });

        console.info('loaded page successfully');

        anchor = await getElementWithTimeout(browser, "aria/Datadog", 1000);
        await anchor.click();
        await browser.url("http://browsermobility.com/docs/integrations/datadog.html")
        await browser.setTimeout({ 'pageLoad': 10000 });

        console.info('loaded page successfully');

        return true;

    } catch (e) {
        console.info(e);
        throw e;
    }
    finally {
        await browser.deleteSession();
    }
};



const navigateToMacStadiumDocs = async (options) => {
    const browser = await remote(options);
    try {
        await browser.url("http://browsermobility.com/")
        await browser.setTimeout({ 'pageLoad': 10000 });

        let anchor = await getElementWithTimeout(browser, "aria/Docs", 1000);
        await anchor.click();

        anchor = await getElementWithTimeout(browser, "aria/MacStadium", 1000);
        await anchor.click();

    } catch (e) {
        console.info(e);
        throw e;
    }
    finally {
        await browser.deleteSession();
    }
};


const getElementWithTimeout = async(browser, elementName, timeout)=>{
    const elementExists = await browser.$(elementName).waitForExist({timeout:timeout, interval:100});

    if(elementExists){
        const element = await browser.$(elementName);
        
        console.info(`element ${elementName} was found`);

        return element;
    }else{
        throw Error(`element ${element} does not exist`);
    }
};
const runTests = async () => {

    const testPromises = [
        navigateToDatadogDocs(options),

        //navigateToMacStadiumDocs(options)
    ];

    await Promise.all(testPromises);

    return true;
};

const sleep = ms => new Promise(r => setTimeout(r, ms));const testStart = new Date();

await runTests();

const testEnd = new Date();
const testTotal = testEnd - testStart;
console.info(`total test time: ${testTotal / 1000}s`);
