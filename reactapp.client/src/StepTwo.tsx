import { useNavigate } from 'react-router-dom';

const StepTwo = () => {

    document.title = "Step Two";
    
    const navigate = useNavigate();
    return (
        <div>
            <h1>Page Two</h1>
            <p>Step 2 of 3.</p>

            <b />
            <button onClick={() => navigate('/stepthree')}>Step Three</button>
        </div>
    );
};

export default StepTwo;