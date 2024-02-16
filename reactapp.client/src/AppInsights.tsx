import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin} from '@microsoft/applicationinsights-react-js';
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
        connectionString: "instrumentationKey=XXX",
        extensions: [reactPlugin, clickPlugin],
        enableAutoRouteTracking: false, /*  history: browserHistory aleady set */
        disableAjaxTracking: false,
        autoTrackPageVisitTime: true,

        disableCookiesUsage: true,

        enableCorsCorrelation: true,
        enableRequestHeaderTracking: true,
        enableResponseHeaderTracking: true,
        extensionConfig: {
            [reactPlugin.identifier]: { history: browserHistory },
            [clickPlugin.identifier]: clickPluginConfig
        }
    }
});

appInsights.loadAppInsights();

appInsights.trackPageView({
    name: location.pathname,
    properties: {
        queryParameter: window.location.pathname,
        documentTitle: document.title
    }
});

export { reactPlugin, appInsights };