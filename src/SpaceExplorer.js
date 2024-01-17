import React from 'react';
import { Link } from 'react-router-dom';
import PhaserGameComponent from './PhaserGameComponent';

function SpaceExplorerPage() {
  return (
    <div>
      <PhaserGameComponent />
      <Link to="/code">Back to Code</Link>
    </div>
  );
}

export default SpaceExplorerPage;