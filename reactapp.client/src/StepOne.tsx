import { useNavigate } from 'react-router-dom';

const StepOne = () => {

    document.title = "Step One";
    
    const navigate = useNavigate();


    return (
        <div>
            <h1>Page One</h1>
            <p>Step 1 of 3</p>
            <b />

            <button onClick={() => navigate('/steptwo')}>Step Two</button>            
        </div>
    );
};

export default StepOne;