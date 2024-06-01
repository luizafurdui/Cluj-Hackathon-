import React from 'react';

const Competencies = ({ competencies, handleSelectedCompetency }) => {

  const handleClick = (competency) => {
    handleSelectedCompetency(competencies[competency]);
  };

  return (
    <div className="p-4 h-64 w-full overflow-hidden">
      <h4 className="text-lg font-semibold mb-2">Competencies:</h4>
      <ul className="overflow-y-auto h-full scrollbar-hide p-5">
        {competencies ? Object.keys(competencies).map((competency, index) => (
          <li
            key={index}
            className={`mb-2 w-full p-2 rounded-lg cursor-pointer transform transition duration-500 ease-in-out hover:scale-105 ${
              competencies[competency].hasCompetency ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
            } drop-shadow-md`}
            onClick={() => handleClick(competency)}
          >
            {competency}
          </li>
        )) : ""}
      </ul>
    </div>
  );
};

export default Competencies;
