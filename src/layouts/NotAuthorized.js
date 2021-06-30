import React from 'react'
import './NotAuthorized.css'
export default function NotAuthorized() {
    return (
      <div className="auth">
      <div className="root">
      <div className="scene">
        <div className="overlay"></div>
        <div className="overlay"></div>
        <div className="overlay"></div>
        <div className="overlay"></div>
        <span className="bg-403">403</span>
        <div className="text">
          <span className="hero-text"></span>
          <span className="msg">
            can't let you in.
          </span> 
        </div>
        <div className="lock"></div>
      </div> 
      </div>
      </div>
    );
}
