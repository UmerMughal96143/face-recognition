import React from 'react'

export const Rank = ({name , entries }) => {
  return (
    <div>
      <div className="white f3">{`Hey ${name} welcome to SmartBrain`}</div>

      <div className="white f1">{entries}</div>
    </div>
  );
};
