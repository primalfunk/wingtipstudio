import React from 'react';
import NavigationPane from './NavigationPane';
import MusicWall from './MusicWall';
import "./MusicPage.scss";

function MusicPage() {
    return (
        <div className="musicPageContainer">
            <div className="pageHeader">
                <h1>Musical Works - a collection of albums / playlists</h1>
                <p>This small corner of the internet is a simple collection of my own original work, saving space using the SoundCloud API.</p>
                <ul className="color-legend">
                    <li className="blue">classical form compositions</li>
                    <li className="green">progressive rock and metal</li>
                    <li className="red">original songs with singing</li>
                    <li className="yellow">covers of other artist's songs</li>
                </ul>
            </div>
            <div className="contentContainer">

                <MusicWall />
                <NavigationPane />
            </div>
        </div>
    );
}

export default MusicPage;


