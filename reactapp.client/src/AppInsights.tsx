import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from "history";
import { ClickAnalyticsPlugin } from '@microsoft/applicationinsights-clickanalytics-js';

const browserHistory = createBrowserHistory({ window: window });

const reactPlugin = new ReactPlugin();

const clickPlugin = new ClickAnalyticsPlugin();


const clickPluginConfig = {
    autoCapture: true,
    dataTags: {
        useDefaultContentNameOrId: true
    }
};


const appInsights = new ApplicationInsights({
    config: {
        connectionString: "instrumentationKey=",
        extensions: [reactPlugin, clickPlugin],
        enableAutoRouteTracking: true, /*  history: browserHistory aleady set */
        disableAjaxTracking: false,
        autoTrackPageVisitTime: true,
        disableCookiesUsage: true,
        autoExceptionInstrumented: true,
        enableCorsCorrelation: true,
        enableRequestHeaderTracking: true,
        enableResponseHeaderTracking: true,
        extensionConfig: {
            [reactPlugin.identifier]: { history: browserHistory },
            [clickPlugin.identifier]: clickPluginConfig,
        },
    }
});

var telemetryInitializer = (envelope : any) => {
    if (typeof location.pathname === 'string') {
        const pathParts = location.pathname.split('/');
        if (pathParts.length >= 3) {
            const serviceRequestId = pathParts[pathParts.length - 2];
            const transactionId = pathParts[1];
            if (typeof envelope.data === 'object' && envelope.data !== null) {
                envelope.data.transactionId = transactionId;
                envelope.data.serviceRequestId = serviceRequestId;
                envelope.data.properties = [
                    { key: 'transactionId', value: transactionId },
                    { key: 'serviceRequestId', value: serviceRequestId }
                ]
            }
        }
    }
    return true
};

appInsights.addTelemetryInitializer(telemetryInitializer);

appInsights.loadAppInsights();

//export function trackCustomPageView(pageName: string, transactionId: string, serviceRequestId: string) {
//    appInsights.trackPageView({
//        name: pageName,
//        uri: window.location.pathname,
//        properties: { transactionId, serviceRequestId } // Include the service request ID
//    });
//}

export { reactPlugin, appInsights };