import { appInsights } from './AppInsights'

const StepThree = () => {

    document.title = "Step Three";  

    const handleButtonClick = () => {
        appInsights.trackEvent({
            name: 'Steps Complete', properties: {
                button: 'Page Three Finish Button',
                dimentions:'demo',
                trackingId: '1234',
                transactionId: '5678',                
                root: 'mypage',
                subProperties: {
                    button: 'Page Three Finish Button',
                    dimentions: 'demo',
                    trackingId: '1234',
                    transactionId: '5678',
                    yourName: 'dawid'
                }
            }
        });
    }

    return (
        <div>
            <h1>Page Three</h1>
            <p>Step 3 of 3. Process Complete!</p>
            <br />
            <button onClick={handleButtonClick} style={{ backgroundColor: 'blue', color: 'white' }}>  Finish  </button>
        </div>
    );
};

export default StepThree;