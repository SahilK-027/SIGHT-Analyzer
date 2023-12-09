import React, { useEffect, useState } from 'react';
import './Footer.scss';
import footerLogo from "../../assets/logo-grey.webp"

const Footer = () => {
  const [year, setYear] = useState(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);

  return (
    <div className="footer-container">
      <div className="login-signup-footer">
        <img src={footerLogo} alt="logo" />
        <p>
          S.I.G.H.T. (System Identifying Geospatial Hazards and Threats) &copy;{' '}
          {year} - All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
