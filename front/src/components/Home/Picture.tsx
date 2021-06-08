import React from 'react';

interface props {
  picture: { id: number; type: string; src: string };
}

const Picture = ({ picture }: props) => {
  return (
    <>
      {picture.type === 'image' ? (
        <img
          key={picture.id}
          src={`http://localhost:3065/${picture.src}`}
          alt={picture.src}
        />
      ) : (
        <>
          <video
            key={picture.id}
            src={`http://localhost:3065/${picture.src}`}
            controls
          />
        </>
      )}
    </>
  );
};

export default Picture;
