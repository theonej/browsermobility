import { remote } from 'webdriverio';

export const runBrowserTests = async (options) => {

    await runTests(options);

    const testEnd = new Date();
    const testTotal = testEnd - testStart;
    console.info(`total test time: ${testTotal / 1000}s`);
};


const runTests = async (options) => {

    const testPromises = [
        navigateToDatadogDocs(options),
        loadSwaggerDocs,
        navigateToMacStadiumDocs(options)
    ];

    await Promise.all(testPromises);

    return true;
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
    finally {
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

        await sleep(5000);

        let anchor = await getElementWithTimeout(browser, "aria/Docs", 1000);
        await anchor.click();
        await browser.url("http://browsermobility.com/docs")
        await browser.setTimeout({ 'pageLoad': 10000 });

        console.info('loaded page successfully');

        await sleep(5000);

        anchor = await getElementWithTimeout(browser, "aria/Datadog", 1000);
        await anchor.click();
        await browser.url("http://browsermobility.com/docs/integrations/datadog.html")
        await browser.setTimeout({ 'pageLoad': 10000 });

        console.info('loaded page successfully');

        await sleep(5000);

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
        await browser.activateApp('com.apple.mobilesafari');
        await browser.setTimeout({ 'pageLoad': 10000 });

        await sleep(5000);

        await browser.url("http://browsermobility.com/")
        await browser.setTimeout({ 'pageLoad': 10000 });

        console.info('loaded page successfully');

        await sleep(5000);

        let anchor = await getElementWithTimeout(browser, "aria/Docs", 1000);
        await anchor.click();
        await browser.url("http://browsermobility.com/docs")
        await browser.setTimeout({ 'pageLoad': 10000 });

        console.info('loaded page successfully');

        await sleep(5000);

        anchor = await getElementWithTimeout(browser, "aria/MacStadium", 1000);
        await anchor.click();
        await browser.url("http://browsermobility.com/docs/integrations/macstadium.html")
        await browser.setTimeout({ 'pageLoad': 10000 });

        console.info('loaded page successfully');

        await sleep(5000);

        return true;

    } catch (e) {
        console.info(e);
        throw e;
    }
    finally {
        await browser.deleteSession();
    }
};


const getElementWithTimeout = async (browser, elementName, timeout) => {
    const elementExists = await browser.$(elementName).waitForExist({ timeout: timeout, interval: 100 });

    if (elementExists) {
        const element = await browser.$(elementName);

        console.info(`element ${elementName} was found`);

        return element;
    } else {
        throw Error(`element ${element} does not exist`);
    }
};

const sleep = ms => new Promise(r => setTimeout(r, ms)); const testStart = new Date();
