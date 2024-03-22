// reactapp.client\src\main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import CustomRouteTracking from './CustomRouteTracking.tsx'; // Corrected import

import StepOne from './StepOne.tsx';
import StepTwo from './StepTwo.tsx';
import StepThree from './StepThree.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<><CustomRouteTracking /><App /></>} />
                <Route path="/Apply/:serviceRequestId/stepone" element={<><CustomRouteTracking /><StepOne /></>} />
                <Route path="/Apply/:serviceRequestId/steptwo" element={<><CustomRouteTracking /><StepTwo /></>} />
                <Route path="/Apply/:serviceRequestId/stepthree" element={<><CustomRouteTracking /><StepThree /></>} />
            </Routes>
        </Router>
    </React.StrictMode>,
);