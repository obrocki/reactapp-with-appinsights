import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { AppInsightsContext } from '@microsoft/applicationinsights-react-js';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin, appInsights } from './AppInsights';
import CookieConsent, { Cookies } from "react-cookie-consent";

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>();

    const navigate = useNavigate();

    document.title = "App Insights JS";

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <AppInsightsContext.Provider value={reactPlugin}>
            <div className="App">
                <header className="App-header">
                    <p>
                        Home
                    </p>

                    <CookieConsent
                        onAccept={(acceptedByScrolling) => {
                            if (acceptedByScrolling) {

                                Cookies.set('CookieConsent', 'true', { path: '/' });

                                appInsights.config.disableCookiesUsage = false;
                                appInsights.getCookieMgr().setEnabled(true);

                                appInsights.loadAppInsights();
                                appInsights.trackPageView();

                                alert("Accept was triggered by user scrolling");
                            } else {
                                appInsights.config.disableCookiesUsage = true;
                                appInsights.getCookieMgr().setEnabled(false);
                                alert("Accept was triggered by clicking the Accept button");
                            }
                        }}
                    >This website requires cookies</CookieConsent>
                </header>

                <h1> App Insights JS </h1>

                <h2 id="tabelLabel">Weather forecast</h2>

                <p>This component demonstrates fetching data from the server.</p>
                {contents}

                <br />
                <br />

                <button id="btnHomePage"
                    onClick={() => {
                        alert("Button  DEMO BUTTON (no event tracking)  was pressed");
                    }}>DEMO BUTTON (no event tracking)</button>

                <br />
                <br />

                <button onClick={() => {
                    appInsights.trackEvent({
                        name: 'Start Steps Wizzard', properties: {
                            button: 'Start Wizzard Button'
                        }
                    });
                    navigate('/Apply/SR12345/stepone')
                }}>Start Here</button>

                <br />

            </div>
        </AppInsightsContext.Provider>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }
}

export default withAITracking(reactPlugin, App);