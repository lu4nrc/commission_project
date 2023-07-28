import React, { useState } from 'react';

const ButtonGroup = ({actionOne, actionTwo, actionThree}) => {
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div className='flex justify-center h-[33px] px-3'>
      <button
        className={`py-[4px] px-4 rounded-full ${activeButton === 1 ? 'bg-emerald-500 text-white' : ' text-black'}`}
        onClick={() => handleButtonClick(1)}
      >
        Todos
      </button>
      <button
        className={`py-[4px] px-4 rounded-full ${activeButton === 2 ? 'bg-emerald-500 text-white' : ' text-black'}`}
        onClick={() => handleButtonClick(2)}
      >
        Pagos
      </button>
      <button
        className={`py-[4px] px-4 rounded-full ${activeButton === 3 ? 'bg-emerald-500 text-white' : ' text-black'}`}
        onClick={() => handleButtonClick(3)}
      >
        Pendentes
      </button>
    </div>
  );
};

export default ButtonGroup;






