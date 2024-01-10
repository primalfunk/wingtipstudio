import React from 'react';
import './Album.scss';

const Album = ({ album, onAlbumClick }) => {
    const handleClick = () => {
        onAlbumClick(album.soundCloudLink);
    };

    const albumTypeClass = `album-info ${album.type}`;

    return (
        <div className="album" onClick={handleClick}>
            <img src={album.coverImage} alt={album.title} className="album-cover" />
            <div className={albumTypeClass}>
                <h3>{album.title}</h3>
                <p>{album.yearReleased}</p>
            </div>
        </div>
    );
};

export default Album;