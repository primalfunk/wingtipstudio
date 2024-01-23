import React, { useState } from "react";
import NavigationPane from "./NavigationPane";
import MusicWall from "./MusicWall";
import "./MusicPage.scss";

function MusicPage() {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };
  return (
    <div>
      {" "}
      <div className="backgroundContainer"></div>
      <div className="musicPageContainer">
        <NavigationPane />
        <div className="pageHeader">
          <div className="instructions">
            <h1>Musical Works - a collection of albums / playlists, </h1> <br />
            <p>
              This small corner of the internet is a simple collection of my own
              original work, saving space using the SoundCloud API. Click the
              colored buttons below to select a group.
            </p>{" "}
            <br />
          </div>
          <ul className="color-legend">
            <li className="blue" onClick={() => handleTypeSelect("classical")}>
              classical form compositions
            </li>
            <li
              className="green"
              onClick={() => handleTypeSelect("progressive")}
            >
              progressive rock and metal
            </li>
            <li className="red" onClick={() => handleTypeSelect("originals")}>
              original songs with singing
            </li>
            <li className="yellow" onClick={() => handleTypeSelect("covers")}>
              covers of other artist's songs
            </li>
            <li className="white" onClick={() => handleTypeSelect("")}>
              everything to date
            </li>
          </ul>
        </div>
        <div className="contentContainer">
          <MusicWall selectedType={selectedType} />
        </div>
      </div>
    </div>
  );
}

export default MusicPage;
