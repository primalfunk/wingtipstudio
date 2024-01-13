import React from 'react';
import NavigationPane from './NavigationPane';
import PhaserGameComponent from './PhaserGameComponent';
import './CodePage.scss'

function CodePage() {
    return (
        <div className='page-wrapper'>
            <div className='page-header'>
                <h1>Code Page</h1>
            </div>
            <div className="bkg-image">
                <div>
                    <p className="explorer-blurb">*1.12.24* Space Explorer - press Z and X to zoom, arrow keys to move in zero-G physics</p>
                </div>
                <div className="game-wrapper">
                    <PhaserGameComponent />
                </div>
                <div className="filler">
                    <p>Further additions to the portfolio projects will go in this space.</p>
                </div>
            </div>
            <NavigationPane />
        </div>
    );
}

export default CodePage;