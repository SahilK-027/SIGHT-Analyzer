import React from 'react'
import logo from "../../assets/logo.webp"
import { Link, NavLink } from 'react-router-dom';
import "./NotFoundPage.scss"
import Footer from '../../components/Footer/Footer';
import LoginSignUpHeader from '../../components/LoginSignUpHeader/LoginSignUpHeader';

const NotFoundPage = ({ user }) => {
    return (
        <>
            <LoginSignUpHeader />
            <div className='notfound-page'>
                <div className='f404'>
                    <h1 className='four'>4</h1>
                    <img src={logo} alt="img" />
                    <h1 className='four'>4</h1>
                </div>
                <p>
                    <span style={{ color: "var(--red)" }}>Error (404):</span> Oops! It seems like you've fallen into a digital black hole!
                    <br />
                    The page you were looking for does not exist. You may have
                    mistyped the address or the page may have moved.
                </p>
                <NavLink to={"/"} className='primary-button home-btn'>Back to Home</NavLink>
            </div>
            <Footer />
        </>
    )
}

export default NotFoundPage