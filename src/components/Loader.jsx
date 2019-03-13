import React from 'react';
import '../css/loader.css'

// This was a copy and paste for the markup with minor mods
const Loader = () => (
  <div className="profile-main-loader pt-20">
    <div className="loader">
      <svg className="circular-loader" viewBox="25 25 50 50" >
        <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#1089da" strokeWidth="2" />
      </svg>
      <div className="loading-text">Loading...</div>
    </div>
  </div>
)

export default Loader
