import React, { useState } from 'react';
import './LoginSignUpBody.scss';
import data from './TermsOfService';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import SERVER_LINk from '../../API';

const LoginSignUpBody = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isVisiblePolicy, setIsVisiblePolicy] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const toggleLoginRegister = () => {
    setIsLogin(!isLogin);
  };


  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${SERVER_LINk}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Login Successful!!!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
          });
          return response.json();
        }
        else{
          if(response.status === 401)
          {
            toast.error(`Invalid credentials`, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "dark",
            });
          }
          return;
        }
      })
      .then((data) => {
        onLogin(data.access_token);
        navigate("/home/analyze");
        return;
      })
      .catch((error) => {
        toast.error(`${error}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      });
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password and Confirmation Password does not match.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      const response = await fetch(`${SERVER_LINk}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });


      if (response.ok) {
        toast.success('Registration Successful!!!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsLogin(!isLogin);

      } else {
        const error = await response.json()
        toast.error(`${error.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
    } catch (error) {
      toast.error('500: Server Side Error.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  return (
    <div className="login-signup-body">
      {isLogin ? (
        <div className="login-section">
          <h2>Log in to SIGHT</h2>
          <form onSubmit={handleLogin}>
            <label>Email address</label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type='submit' className='primary-button sign-in-button'>Log-In with Email</button>
          </form>
          <p>
            Don't have an account? {' '}
            <span onClick={toggleLoginRegister}>Register</span>.
          </p>
        </div>
      ) : (
        <div className="register-section">
          {
            isVisiblePolicy &&
            (
              <div className='policy' >
                <div className="policy-content card">
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    background: 'var(--card-color)',
                    paddingTop: 20,
                    paddingBottom: 20,
                    borderBottom: "1px solid var(--border-color)"
                  }}>
                    <h4
                      style={{
                        margin: 0
                      }}
                    >Terms of Service and Privacy Policy</h4>
                    <div>
                      <i style={{
                        fontSize: 22,
                        cursor: 'pointer'
                      }} className="fa-solid fa-xmark"
                        onClick={() => setIsVisiblePolicy(!isVisiblePolicy)}
                      >
                      </i>
                    </div>
                  </div>
                  <p>
                    By using the SIGHT application, you agree to comply with and be bound by these Terms of Service. If you do not agree to these Terms, please do not use the application.
                  </p>
                  {
                    data.map((item, idx) => (
                      <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexDirection: 'column'
                      }} key={idx}>
                        <h6 style={{
                          color: 'var(--blue)',
                          margin: 0,
                          display: "flex",
                          alignItems: "center",
                          fontSize: 18,
                        }}>
                          <span
                            className='wrapper'
                            dangerouslySetInnerHTML={{ __html: item.icon }} />
                          &nbsp;
                          {item.title}:
                        </h6>
                        <p style={{
                          marginTop: 3,
                        }}>{item.info}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            )
          }

          <h2>Register to SIGHT</h2>
          <form onSubmit={handleRegister}>
            <label>Email address</label>
            <input
              type="email"
              placeholder="name@domain.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Create new password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter to confirm password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", marginTop: 10 }}>
              <input className='check-box' type='checkbox' required={true} />
              <label className='check-box-label'>
                By signing up, I agree to &nbsp;
                <span
                  style={{
                    textDecoration: 'underline',
                    color: 'var(--blue)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setIsVisiblePolicy(!isVisiblePolicy)}>Terms of Use and Privacy Policy.</span>
              </label>
            </div>
            <button type='submit' className='primary-button register-in-button'>Register with Email</button>
          </form>
          <p>
            Already have an account?{' '}
            <span onClick={toggleLoginRegister}>Log in</span>.
          </p>
        </div>
      )
      }

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div >
  );
};

export default LoginSignUpBody;
