import React, { useEffect, useState } from 'react'
import "./Navbar.scss"
import logo from "../../assets/logo.webp"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Dropdown, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useLocation } from 'react-router-dom';
import Cookies from "universal-cookie";

const cookies = new Cookies();

const userAvatars = [
    `<i class="fa-solid fa-star"></i>`,
    `<i class="fa-solid fa-star-of-david"></i>`,
    `<i class="fa-solid fa-face-grin-stars"></i>`,
    `<i class="fa-solid fa-sun"></i>`,
    `<i class="fa-solid fa-stroopwafel"></i>`,
    `<i class="fa-solid fa-chess-knight"></i>`,
    `<i class="fa-solid fa-chess-king"></i>`,
    `<i class="fa-solid fa-chess-queen"></i>`,
    `<i class="fa-solid fa-bullseye"></i>`,
    `<i class="fa-solid fa-heart"></i>`,
    `<i class="fa-solid fa-bomb"></i>`,
    `<i class="fa-solid fa-fire"></i>`,
    `<i class="fa-solid fa-feather"></i>`,
    `<i class="fa-solid fa-shield"></i>`,
    `<i class="fa-solid fa-leaf"></i>`,
    `<i class="fa-solid fa-robot"></i>`,
    `<i class="fa-solid fa-virus"></i>`,
    `<i class="fa-solid fa-mask"></i>`,
    `<i class="fa-solid fa-dragon"></i>`,
    `<i class="fa-solid fa-lightbulb"></i>`,
    `<i class="fa-solid fa-yin-yang"></i>`,
    `<i class="fa-solid fa-volleyball"></i>`,
    `<i class="fa-solid fa-spider"></i>`,
    `<i class="fa-solid fa-apple-whole"></i>`,
    `<i class="fa-brands fa-phoenix-framework"></i>`,
    `<i class="fa-solid fa-dove"></i>`,
    `<i class="fa-solid fa-cat"></i>`,
    `<i class="fa-solid fa-mug-hot"></i>`,
    `<i class="fa-solid fa-atom"></i>`,
    `<i class="fa-brands fa-octopus-deploy"></i>`,
    `<i class="fa-brands fa-first-order"></i>`
]

const Navbar = ({ user }) => {
    const [route, setRoute] = useState("/");
    const location = useLocation();

    const handleLogout = () => {
        // Remove the JWT token cookie
        cookies.remove('access_token', { path: '/' });

        // Optionally, you can redirect to a logout page or the home page
        window.location.href = '/'; // Redirect to the home page
    };

    // Function to check if the current URL starts with "/home"
    useEffect(() => {
        const isActive = () => {
            setRoute(location.pathname);
        };
        isActive();
    }, [])
    const selectedAvatar = userAvatars[user.avatar_id];
    return (
        <div className='my-navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="logo" />
                <h2>SIGHT™️</h2>
            </div>
            <div className='nav-utils'>
                <Tippy content={<span>Home</span>} delay={300}>
                    <NavLink id='home-btn' to="/home/overview" className={route.startsWith('/home') ? "active" : ""}>
                        <i className="fa-solid fa-house outer-fa"></i>
                    </NavLink>
                </Tippy>
                <Dropdown>
                    <Dropdown.Toggle style={{ display: "flex", alignItems: "center", justifyItems: "center", margin: 6, background: "transparent", paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2 }} variant="dark">
                        <div style={{
                            background: user.avatar_bg,
                            color: user.avatar_color,
                            fontSize: 20
                        }} className="user-avatar" dangerouslySetInnerHTML={{ __html: selectedAvatar }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ textAlign: 'left' }} variant='dark' align="right">
                        <Dropdown.Header style={{ fontWeight: 600, fontSize: 15, color: "white" }}>My Profile</Dropdown.Header>
                        <Dropdown.Item style={{ fontWeight: 500, fontSize: 14, color: "var(--grey)", pointerEvents: "none" }}>{user.email}</Dropdown.Item>
                        <Dropdown.Divider style={{ borderTopColor: "var(--border-color)" }} />
                        <Dropdown.Item onClick={handleLogout}>
                            <p>Log Out</p>
                            <span><i className="fa-solid fa-arrow-right-from-bracket inner-fa"></i></span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default Navbar
