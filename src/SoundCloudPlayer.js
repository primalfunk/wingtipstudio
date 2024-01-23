import React from 'react';
import './SoundCloudPlayer.scss'

const SoundCloudPlayer = ({ trackUrl }) => {
    const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`;

    return (
        <iframe
        className="soundcloud-player"
            width="100%"
            height="300px"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={embedUrl}>
        </iframe>
    );
};

export default SoundCloudPlayer;