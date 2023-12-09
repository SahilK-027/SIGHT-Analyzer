import React from 'react'
import "./LoginSignUpHeader.scss"
import logo from "../../assets/logo.webp"

const LoginSignUpHeader = () => {
  return (
    <div className='Login-SignUp-Header'>
      <img src={logo} alt="logo" />
      <h1>SIGHT™️</h1>
    </div>
  )
}

export default LoginSignUpHeader