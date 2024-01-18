import React from 'react';
import { Link } from 'react-router-dom';
import PhaserGameComponent from './PhaserGameComponent';
import './SpaceExplorer.css'

function SpaceExplorerPage() {
  return (
    <div className="game-page">
      <PhaserGameComponent />
      <p className="controls-exp">Press "Z" and "X" to zoom in and out, arrow Left and Right to rotate the ship, arrow Up to apply forward thrust, and arrow Down to apply reverse thrust.</p>
      <Link className="link" to="/code">Back to Code</Link>
    </div>
  )
}

export default SpaceExplorerPage;