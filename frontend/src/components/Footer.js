import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Student Feedback System</h3>
          <p>Helping improve education through valuable feedback</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#form">Submit Feedback</a></li>
            <li><a href="#list">View Feedback</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: mokhothu@gmail.com</p>
          <p>Phone: (+266) 51234567</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Mokhothu Feedback System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;