const Remark = ({ remark, onClick }) => {
    const highlightSolution = (solution, position) => {
      if (!position || position.length !== 2) {
        return solution;
      }
  
      const [start, end] = position;
      return (
        <>
          {solution.slice(0, start)}
          <span className="bg-yellow-200">{solution.slice(start, end)}</span>
          {solution.slice(end)}
        </>
      );
    };
  
    return (
      <div
        className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md cursor-pointer transform transition duration-100 ease-in-out hover:scale-103 hover:shadow-lg"
        onClick={()=> {onClick(remark)}}
      >
        <p className="mb-1 text-sm text-gray-600">
          <strong>Test Title:</strong> {remark.testTitle} | <strong>Class:</strong> {remark.class}
        </p>
        <div className="mt-2">
          <p className="mb-1 text-sm text-gray-500">{remark.questionText}</p>
          <p className="mb-1">{highlightSolution(remark.solution, remark.position)}</p>
          {remark.reason && (
            <p className="text-red-600"><strong>Remark:</strong> {remark.reason}</p>
          )}
        </div>
      </div>
    );
  };
  
  export default Remark;