import React from 'react';
import { BeatLoader } from 'react-spinners';

const Spinner = () => (
  <div className="spinner">
    <BeatLoader
      size={20}
      color={"#8f4eff"}
      alt='Loading...'
    />
  </div>
);

export default Spinner;