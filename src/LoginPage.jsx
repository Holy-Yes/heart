import React, { useState } from 'react';
import './LoginPage.css'; // Make sure to import the CSS
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const LoginPage = ({ onLogin }) => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <div className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social"><GoogleIcon /></a>
            <a href="#" className="social"><FacebookIcon /></a>
            <a href="#" className="social"><GitHubIcon /></a>
            <a href="#" className="social"><LinkedInIcon /></a>
          </div>
          <span>Register with E-mail</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Enter E-mail" />
          <input type="password" placeholder="Enter Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <h1>Sign In</h1>
          <div className="social-container">
            <a href="#" className="social"><GoogleIcon /></a>
            <a href="#" className="social"><FacebookIcon /></a>
            <a href="#" className="social"><GitHubIcon /></a>
            <a href="#" className="social"><LinkedInIcon /></a>
          </div>
          <span>Sign in With Email & Password</span>
          <input type="email" placeholder="Enter E-mail" />
          <input type="password" placeholder="Enter Password" />
          <a href="#" className="forgot-password">Forget Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome To Heart</h1>
            <p>Sign in With Email & Password</p>
            <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello World</h1>
            <p>Sign up now and enjoy our site</p>
            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
