import React from 'react'
import './Box.css'


export const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="cnte ma">
      <div className="absolute  mt2">
        <img
          id="inputimage"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />

        <div
          className="bouncing-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};
