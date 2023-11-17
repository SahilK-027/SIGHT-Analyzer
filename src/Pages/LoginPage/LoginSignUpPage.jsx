import React from 'react'
import "./LoginSignUpPage.scss"
import LoginSignUpHeader from '../../components/LoginSignUpHeader/LoginSignUpHeader'
import LoginSignUpBody from '../../components/LoginSignUpBody/LoginSignUpBody'
import Footer from '../../components/Footer/Footer'

const LoginSignUpPage = ({ onLogin }) => {
    return (
        <div className='Login-SignUp-Page-Container'>
            <LoginSignUpHeader />
            <LoginSignUpBody onLogin={onLogin} />
            <Footer />
        </div>
    )
}

export default LoginSignUpPage