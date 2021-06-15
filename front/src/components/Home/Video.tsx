import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaPlay } from 'react-icons/all';
import { StyledPlayButton } from './styles';

interface props {
  picture: { id: number; type: string; src: string };
  current: number;
}

const Video = ({ picture, current }: props) => {
  const [isPlayed, setIsPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const onClickPlayButton = useCallback(() => {
    if (isPlayed) {
      setIsPlayed(false);
      videoRef.current?.pause();
    } else {
      setIsPlayed(true);
      videoRef.current?.play();
    }
  }, [isPlayed]);

  useEffect(() => {
    setIsPlayed(false);
    videoRef.current?.pause();
  }, [current]);

  return (
    <div className="video">
      <video
        ref={videoRef}
        key={picture.id}
        src={`http://localhost:3065/${picture.src}`}
        loop
      />
      <StyledPlayButton onClick={onClickPlayButton} isPlayed={isPlayed}>
        <FaPlay />
      </StyledPlayButton>
    </div>
  );
};

export default Video;
