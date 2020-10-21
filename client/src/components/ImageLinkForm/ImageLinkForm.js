import React from 'react'
import './Form.css';

export const ImageLinkForm = ({ inputChange, onSubmitt }) => {
  return (
    <div>
      <p >
        {
          "This Magic brain will detect your faces in your pictures . give it a try!"
        }
      </p>
      <div className='width'>
        <div className="pattern pa4 br-3 shadow-5">
          <input type="text" className="input f4 pa2 " onChange={inputChange} />
          <button
            className="grow f4 link ph3 pv2 dib white bg-black"
            onClick={onSubmitt}
          >
            {"DETECT "}
          </button>
        </div>
      </div>
    </div>
  );
};
