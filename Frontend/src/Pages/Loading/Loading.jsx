import React, { useEffect, useState } from 'react';
import './Loading.scss';
import LoginSignUpHeader from '../../components/LoginSignUpHeader/LoginSignUpHeader';
import Footer from '../../components/Footer/Footer';

const Loading = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay (e.g., fetching data from an API)
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, []);

    return (
        <div className="loading-container">
            <div className="loading"></div>
        </div>
    );
};

export default Loading;
