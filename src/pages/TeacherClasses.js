import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/TeacherClasses.css';
import claseImage from '../assets/images/book1.jpg'; // Correct import for the image

const TeacherClasses = () => {
  const classes = Array.from({ length: 10 }, (_, i) => `Class 10 ${String.fromCharCode(65 + i)}`);

  return (
    <div className="w-full h-full bg-gray-200 overflow-auto pl-6" style={{background: 'linear-gradient(to bottom, #fff, #cfe4e4)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <div className="sticky top-0 left-0 w-full z-50 pb-0 border-b-2 border-gray-400" style={{background: '#fff', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <h1 className="text-xl font-bold mt-4 mb-4"style={{color: '#112d32'}}>Your classes</h1>
      </div>
      <div className="w-full mt-8 p-4 flex flex-wrap justify-center">
        {classes.map((className, index) => (
          <Link 
            to={`/TeacherClass/${className}`} 
            className="relative w-64 h-64  m-4 flex items-end justify-center bg-white shadow-2xl rounded-lg transform transition duration-500 ease-in-out hover:scale-105"
            style={{ 
              backgroundImage: `url(${claseImage})`, // Use the imported image
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: 'rgba(225, 225, 225, 1)', 
              backgroundBlendMode: 'overlay'// White overlay with 50% opacity
            }}
            key={index}
          >
            <div className="absolute top-1 left-0 w-full text-center"> {/* Adjusted from bottom-12 to bottom-24 */}
              <p className="text-4xl p-4 font-semibold" style={{color: '#112d32'}}>{className}</p>
            </div>
            <div className="text-center bg-white bg-opacity-75 p-2 rounded-b-lg w-full">
              <p className="text-l text-gray-600">Instructor: John Doe</p>
              <p className="text-l text-gray-600">Meeting Time: 10:00 AM</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeacherClasses;
