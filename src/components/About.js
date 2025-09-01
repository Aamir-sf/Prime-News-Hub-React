import React, { useEffect } from "react";

const About = ({ setProgress }) => {
  useEffect(() => {
    
    setProgress(30);
    setTimeout(() => setProgress(70), 500);
    setTimeout(() => setProgress(100), 1000);

    
    document.title = "About - Prime News Hub";
  }, [setProgress]);

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        color: "#212529",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingTop: "80px",
      }}
    >
      <div className="container py-5 flex-grow-1">
        <div
          className="card shadow-lg border-0"
          style={{
            backgroundColor: "#ffffff",
            color: "#212529",
            borderRadius: "12px",
          }}
        >
          <div className="card-body p-5">
            <h2 className="card-title mb-4 text-center">
              📰 About <span style={{ color: "#f11946" }}>Prime News Hub</span>
            </h2>
            <p className="card-text fs-5">
              Prime News Hub is a modern, real-time news platform built with
              <strong> React.js</strong>. Our mission is to keep you updated
              with the latest happenings around the world 🌍 in categories like
              <strong> Business, Entertainment, Health, Science, Sports</strong>{" "}
              and <strong>Technology</strong>.
            </p>
            <p className="card-text fs-5">
              Designed with a <strong>clean UI</strong>, fast navigation ⚡, and
              responsive layout 📱, it ensures a smooth reading experience on
              all devices. The app fetches reliable news data using{" "}
              <code>NewsAPI</code> and presents it in an organized way for easy
              access.
            </p>
            <p className="card-text fs-5">
              Whether you’re a <span>👨‍🎓 student</span>, <span>✍️ writer</span>,
              or <span>💼 professional</span>, Prime News Hub helps you stay
              ahead of the curve with quick access to trending stories and
              in-depth analysis.
            </p>
            <div className="text-center mt-4">
              <button
                className="btn btn-danger btn-mg"
                onClick={() => (window.location.href = "/")}
              >
                🔙 Back to News
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer
        style={{
          backgroundColor: "#212529",
          color: "#ffffff",
          textAlign: "center",
          padding: "15px 0",
          marginTop: "auto",
        }}
      >
        © 2025 Prime News Hub. All Rights Reserved.
      </footer>
    </div>
  );
};

export default About;
