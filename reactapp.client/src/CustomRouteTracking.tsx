import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Use useLocation instead of withRouter
import { trackCustomPageView } from './AppInsights';

interface CustomRouteTrackingProps { }

const CustomRouteTracking: React.FC<CustomRouteTrackingProps> = () => {

    const location = useLocation(); // Get the location object

    useEffect(() => {
        // Extract the page name from the URL (e.g., /apply/SR12345/enter-name)
        const pathParts = location.pathname.split('/');
        const serviceRequestId = pathParts[pathParts.length - 2]; // Assuming SR is always before the ID        
        const transactionId = pathParts[1];
        const pageName = location.pathname.split('/').slice(-1)[0];
        console.log(`Tracking page view: ${pageName} with transaction ID: ${transactionId} for service request ID: ${serviceRequestId}`);

        //trackCustomPageView(pageName,  transactionId, serviceRequestId);
        
    }, [location.pathname]);

    return null; // No need to render anything
};

export default CustomRouteTracking;






/*

pageViews 
| where customDimensions.serviceRequestId == 'SR12345' 
| summarize count() by name

//let serviceRequestId = "SR12345";
let serviceRequestId = "SR67890";
pageViews
| extend url = replace("/Apply/SR[0-9]+/stepthree", "/Apply/{serviceRequestId}/stepthree", url)
| summarize count() by name, serviceRequestId


pageViews
| extend serviceRequestId = extract("/Apply/(SR[0-9]+)/", 1, url)
| where serviceRequestId != "" and url != "/"
| summarize count() by serviceRequestId


*/