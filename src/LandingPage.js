import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import NavigationPane from "./NavigationPane";

function LandingPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="page-container">
      <div className="background-container"></div>
      <div className="content">
        <div className="top-content">
          <img
            src={"/images/WingTipStudioLight.png"}
            alt="Wingtip Studio Icon"
            className="nav-icon"
          />
        
          <div className="nav-options"></div> 
          <div className="nav-options">
            <div
              className="nav-option"
              onClick={() => handleNavigate("/music")}
            >
              Music
            </div>
            <div className="nav-option" onClick={() => handleNavigate("/code")}>
              Code
            </div>
            <div
              className="nav-option"
              onClick={() => handleNavigate("/contact")}
            >
              Contact
            </div>
            <div
              className="nav-option"
              onClick={() => handleNavigate("/hireme")}
            >
              Hire
            </div>
          </div>
        </div>

      <div className="page-writing">
        <h2>Thank you for visiting Wingtip Studio!</h2>
        <br />
        <p>
          <b>This React.js app</b> and the creative content within it are the
          work of a single creator, Jared Menard. You are invited to look
          around. You will find: <br />
          <br />
        </p>
        <ul>
          <li>
            <b>Coding projects</b> devoted to showcasing different sorts of
            development skills with games, simulations, and fake productivity
            apps
          </li>{" "}
          <br />
          <li>
            <b>A listenable representation</b> of 20 years worth of musical
            production learning, with noticeable improvements in
            mixing/mastering skill and general audio quality in more recent
            projects; I recently starting using the <i>"Ghost of the Sound"</i>{" "}
            label
          </li>{" "}
          <br />
          <li>
            <b>An exhaustive listing</b> of my different professional
            assignments so far, arranged in a nice visual presentation with a
            React Chrono
          </li>{" "}
          <br />
          <li>
            <b>A way</b> to reach out and leave me a message. Or skip all that
            stuff and email at: <i>jared.d.menard@gmail.com</i>
          </li>{" "}
          <br />
        </ul>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
