import React from "react";

import styles from "./styles.module.css";

interface YoutubeEmbedProps {
  videoId: string;
}

const YoutubeEmbed = ({ videoId }: YoutubeEmbedProps) => (
  <div className={styles.youtubeEmbed}>
    <div>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </div>
);

export default YoutubeEmbed;
