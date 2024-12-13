import React, { useEffect, useState } from "react";

const SplashScreen = ({ onComplete }) => {
  return (
    <div className=" splash-screen">
      <div className="flex flex-col items-center splash-content">
        <h1 className="splash-title">Welcome to Sales-ERP</h1>
        <p className="splash-tagline"> Sales data at your fingertips</p>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
