import React, { useState } from 'react';
import Album from './Album'; // Component for individual albums
import SoundCloudPlayer from './SoundCloudPlayer';
import './MusicWall.scss'

function MusicWall({ selectedType }) {
    const [currentTrack, setCurrentTrack] = useState(null);

    const handleAlbumClick = (trackUrl) => {
        setCurrentTrack(trackUrl);
    };
 
    
    const albums = [
        {
            id: '1',
            title: 'Three String Serenades',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/three-string-serenades',
            yearReleased: '2005',
            coverImage: '/images/threestringscover.jpg',
            type: 'classical'
        },
        {
            id: '2',
            title: 'Orchestral Odds and Ends',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/orchestral-odds-and-ends',
            yearReleased: '2007',
            coverImage: '/images/oddscover.jpg',
            type: 'classical'
        },
        {
            id: '3',
            title: 'Pieces of Stars',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/pieces-of-constellations',
            yearReleased: '2012',
            coverImage: '/images/piecescover.jpg',
            type: 'classical'
        },
        {
            id: '4',
            title: 'Piano Sonata Number 2',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/piano-sonata-no-2',
            yearReleased: '2014',
            coverImage: '/images/piano2cover.jpg',
            type: 'classical'
        },
        {
            id: '5',
            title: 'Graceland Covers (2015)',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/graceland-covers-2015',
            yearReleased: '2015',
            coverImage: '/images/graceland2015.jpg',
            type: 'covers'
        },
        {
            id: '6',
            title: 'Piano Sonata Number 3',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/piano-sonata-no-3',
            yearReleased: '2015',
            coverImage: '/images/piano3cover.jpg',
            type: 'classical'
        },
        {
            id: '7',
            title: 'Piano Sonata Number 4',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/piano-sonata-no-4',
            yearReleased: '2019',
            coverImage: '/images/piano4cover.jpg',
            type: 'classical'
        },
        {
            id: '8',
            title: 'Originals (2022)',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/originals-2022',
            yearReleased: '2022',
            coverImage: '/images/originals2022.jpg',
            type: 'originals'
        },
        {
            id: '9',
            title: 'Covers (2022)',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/covers-2022',
            yearReleased: '2022',
            coverImage: '/images/covers2022.jpg',
            type: 'covers'
        },
        {
            id: '10',
            title: 'Constellations',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/constellations',
            yearReleased: '2022',
            coverImage: '/images/constellationscover.jpg',
            type: 'progressive'
        },
        {
            id: '11',
            title: 'Originals (2023)',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/originals-2023',
            yearReleased: '2023',
            coverImage: '/images/originals2023.jpg',
            type: 'originals'
        },
        {
            id: '12',
            title: 'Covers (2023)',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/covers-2023',
            yearReleased: '2023',
            coverImage: '/images/covers2023.jpg',
            type: 'covers'
        },
        {
            id: '13',
            title: 'Graceland Covers (2023)',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/graceland-covers-2023',
            yearReleased: '2023',
            coverImage: '/images/graceland2023.jpg',
            type: 'covers'
        },
        {
            id: '14',
            title: 'Ludwig\'s Dream',
            soundCloudLink: 'https://soundcloud.com/jared-menard/sets/ludwigs-dream',
            yearReleased: '2023',
            coverImage: '/images/ludwigsdreamcover.jpg',
            type: 'progressive'
        },
    ];

    const filteredAlbums = selectedType 
    ? albums.filter(album => album.type === selectedType)
    : albums;

    const albumContainerStyle = currentTrack ? { maxHeight: '50vh', overflowY: 'auto' } : {};

    return (
        <div className="music-wall">
            <div className="album-container" style={albumContainerStyle}>
                {filteredAlbums.map(album => (
                    <Album key={album.id} album={album} onAlbumClick={handleAlbumClick} />
                ))}
            </div>
            {currentTrack && <SoundCloudPlayer trackUrl={currentTrack} />}
        </div>
    );
}

export default MusicWall; 