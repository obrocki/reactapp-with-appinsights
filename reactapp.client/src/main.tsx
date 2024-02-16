// reactapp.client\src\main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

import StepOne from './StepOne.tsx';
import StepTwo from './StepTwo.tsx';
import StepThree from './StepThree.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/stepone" element={<StepOne />} />
                <Route path="/steptwo" element={<StepTwo />} />
                <Route path="/stepthree" element={<StepThree />} />
            </Routes>
        </Router>
    </React.StrictMode>,
);