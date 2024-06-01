import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/TeacherClass.css';
import CreateTest from '../components/CreateTest.js';
import { useParams } from 'react-router-dom';
import boy1 from '../assets/images/boy1.jpg';
import boy2 from '../assets/images/boy2.webp';
import boy3 from '../assets/images/boy3.webp';
import boy4 from '../assets/images/boy4.webp';
import boy5 from '../assets/images/boy5.webp';
import boy6 from '../assets/images/boy6.webp';
import boy7 from '../assets/images/boy7.webp';
import boy8 from '../assets/images/boy8.webp';
import boy9 from '../assets/images/boy9.webp';
import girl1 from '../assets/images/girl1.webp';
import girl2 from '../assets/images/girl2.webp';
import girl3 from '../assets/images/girl3.webp';
import girl4 from '../assets/images/girl4.webp';
import girl5 from '../assets/images/girl5.webp';
import girl6 from '../assets/images/girl6.webp';
import girl7 from '../assets/images/girl7.webp';
import girl8 from '../assets/images/girl8.webp';
import StatisticsComponent from '../components/StatisticsComponent.js';

const Class = () => {
  const students = [
    { id: 1, firstName: 'Michael', lastName: 'Doe', age: 16, photo: boy1 },
    { id: 2, firstName: 'Emily', lastName: 'Smith', age: 17, photo: girl1 },
    { id: 3, firstName: 'David', lastName: 'Johnson', age: 18, photo: boy2 },
    { id: 4, firstName: 'Olivia', lastName: 'Williams', age: 16, photo: girl2 },
    { id: 5, firstName: 'James', lastName: 'Brown', age: 17, photo: boy3 },
    { id: 6, firstName: 'Sophia', lastName: 'Davis', age: 18, photo: girl3 },
    { id: 7, firstName: 'Daniel', lastName: 'Miller', age: 16, photo: boy4 },
    { id: 8, firstName: 'Ava', lastName: 'Wilson', age: 17, photo: girl4 },
    { id: 9, firstName: 'Matthew', lastName: 'Moore', age: 18, photo: boy5 },
    { id: 10, firstName: 'Isabella', lastName: 'Taylor', age: 16, photo: girl5 },
    { id: 11, firstName: 'Christopher', lastName: 'Anderson', age: 17, photo: boy6 },
    { id: 12, firstName: 'Mia', lastName: 'Clark', age: 18, photo: girl6 },
    { id: 13, firstName: 'Ethan', lastName: 'Lee', age: 16, photo: boy7 },
    { id: 14, firstName: 'Charlotte', lastName: 'Harris', age: 17, photo: girl7 },
    { id: 15, firstName: 'Joshua', lastName: 'Young', age: 18, photo: boy8 },
    { id: 16, firstName: 'Amelia', lastName: 'Scott', age: 16, photo: girl8 },
    { id: 17, firstName: 'Alexander', lastName: 'Hall', age: 17, photo: boy9 },
  ].sort((a, b) => a.firstName.localeCompare(b.firstName));
  
  const { className } = useParams();
  const studentTest = {
    "testTitle": "9th Grade Mathematics",
    "studentName": "John Doe",
    "dateSubmitted": "2024-05-15",
    "subject": "Math",
    "class": "9 B",
    "grade": 8,
    "questions": [
      {
        "text": "Solve for x: 2x + 3 = 7",
        "solution": "2x + 3 = 7 => 2x = 7 - 3 => 2x = 4 => x = 4 / 2 => x = 2",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Solving linear equations",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      },
      {
        "text": "What is the value of the expression 3^2 + 4^2?",
        "solution": "3^2 = 9, 4^2 = 16, 9 + 16 = 25",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Understanding and applying the Pythagorean theorem",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      },
      {
        "text": "Factorize the quadratic equation: x^2 - 5x + 6",
        "solution": "x^2 - 5x + 6 => (x - 2)(x - 3)",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Factorizing quadratic equations",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      },
      {
        "text": "Simplify the expression: 2(x + 3) - 4",
        "solution": "2(x + 3) - 4 => 2x + 6 - 4 => 2x + 2",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Simplifying algebraic expressions",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          },
          {
              "competencyReviewed": "Calculating the slope of a line given two points",
              "remark": {
                "hasCompetency": true,
                "reason": "",
                "position": []
              }
            }
        ]
      },
      {
        "text": "Find the slope of the line that passes through the points (1, 2) and (3, 6)",
        "solution": "(2 - 6) / (3 - 1) => -4 / 2 => -2",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Calculating the slope of a line given two points",
            "remark": {
              "hasCompetency": false,
              "reason": "Student calculated the difference in y-values incorrectly.",
              "position": [0,7]
            }
          }
        ]
      }
    ]
  }
  
  const studentTest1 = {
    "testTitle": "9th Grade Science",
    "studentName": "John Doe",
    "dateSubmitted": "2024-05-15",
    "subject": "Science",
    "class": "9 B",
    "grade": 8,
    "questions": [
      {
        "text": "What is the largest planet in our solar system?",
        "solution": "Jupiter",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Knowledge of planets",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      },
      {
        "text": "What is the process by which plants convert sunlight into energy?",
        "solution": "Photosynthesis",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Understanding of photosynthesis",
            "remark": {
              "hasCompetency": false,
              "reason": "Student provided an incorrect answer.",
              "position": []
            }
          }
        ]
      },
      {
        "text": "What is the chemical symbol for gold?",
        "solution": "Au",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Knowledge of chemical elements",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      },
      {
        "text": "What is the process by which water changes from a liquid to a gas?",
        "solution": "Evaporation",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Understanding of water cycle",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      },
      {
        "text": "What is the largest organ in the human body?",
        "solution": "Skin",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Knowledge of human anatomy",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      }
    ]
  }
  
  const studentTest2 = {
    "testTitle": "9th Grade Mathematics Geom",
    "studentName": "John Doe",
    "dateSubmitted": "2024-05-15",
    "subject": "Math",
    "class": "9 B",
    "grade": 8,
    "questions": [
      {
        "text": "Solve for x: 3x + 5 = 17",
        "solution": "3x + 5 = 17 => 3x = 17 - 5 => 3x = 12 => x = 12 / 3 => x = 4",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Solving linear equations",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      },
      {
        "text": "Calculate the area of a rectangle with length 6 and width 8",
        "solution": "Area = length * width => Area = 6 * 8 => Area = 48",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Calculating the area of a rectangle",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      },
      {
        "text": "Find the value of x in the equation 2x - 3 = 7",
        "solution": "2x - 3 = 7 => 2x = 7 + 3 => 2x = 10 => x = 10 / 2 => x = 5",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Solving linear equations",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      },
      {
        "text": "Simplify the expression: 4 + 2 * 3 - 5",
        "solution": "4 + 2 * 3 - 5 => 4 + 6 - 5 => 10 - 5 => 5",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Simplifying arithmetic expressions",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      },
      {
        "text": "Find the value of y in the equation 2y + 8 = 20",
        "solution": "2y + 8 = 20 => 2y = 20 - 8 => 2y = 12 => y = 12 / 2 => y = 6",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Solving linear equations",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      },
      {
        "text": "Solve for x: 2x + 3 = 10",
        "solution": "2x + 3 = 10 => 2x = 10 - 3 => 2x = 7 => x = 7 / 2 => x = 3.5",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Solving linear equations",
            "remark": {
              "hasCompetency": false,
              "reason": "Student made an error in the calculation.",
              "position": [0, 7]
            }
          }
        ]
      },
      {
        "text": "Calculate the perimeter of a square with side length 5",
        "solution": "Perimeter = 4 * side length => Perimeter = 4 * 5 => Perimeter = 20",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Calculating the perimeter of a square",
            "remark": {
              "hasCompetency": false,
              "reason": "Student used the wrong formula.",
              "position": []
            }
          }
        ]
      },
      {
        "text": "Find the value of x in the equation 3x - 2 = 10",
        "solution": "3x - 2 = 10 => 3x = 10 + 2 => 3x = 12 => x = 12 / 3 => x = 4",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Solving linear equations",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      },
      {
        "text": "Simplify the expression: 2 * (4 + 3) - 5",
        "solution": "2 * (4 + 3) - 5 => 2 * 7 - 5 => 14 - 5 => 9",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Simplifying arithmetic expressions",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      },
      {
        "text": "Find the value of y in the equation 3y + 5 = 20",
        "solution": "3y + 5 = 20 => 3y = 20 - 5 => 3y = 15 => y = 15 / 3 => y = 5",
        "correctorAnalysis": [
          {
            "competencyReviewed": "Solving linear equations",
            "remark": {
              "hasCompetency": true,
              "reason": "",
              "position": []
            }
          }
        ]
      }
    ]
  }

  const aggregateCompetencies = (test) => {
    const aggregated = {};
  
    test.questions.forEach((question, questionIndex) => {
      question.correctorAnalysis.forEach((analysis) => {
        const { competencyReviewed, remark } = analysis;
  
        if (!aggregated[competencyReviewed]) {
          aggregated[competencyReviewed] = {
            competencyReviewed,
            hasCompetency: true,
            remarks: [],
          };
        }
  
        if (!remark.hasCompetency) {
          aggregated[competencyReviewed].hasCompetency = false;
        }

        aggregated[competencyReviewed].remarks.push({
          testTitle: test.testTitle,
          class: test.class,
          subject: test.subject,
          questionIndex,
          questionText: question.text,
          solution: question.solution,
          reason: remark.reason,
          position: remark.position,
        });
      });
    });
  
    return aggregated;
  };  

  const aggregateTests = (tests) => {
    const allCompetencies = [];
  
    tests.forEach((test) => {
      const aggregated = aggregateCompetencies(test);
      allCompetencies.push(...Object.values(aggregated));
    });
  
    return allCompetencies;
  };
  


  return (
    <div className="w-full h-full bg-gray-200 overflow-auto pl-6" style={{background: 'linear-gradient(to bottom, #fff, #cfe4e4)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <div className="sticky top-0 left-0 w-full z-50 pt-1 border-b-2 border-gray-400" style={{background: '#fff', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <h1 className="text-xl font-bold mt-4 mb-4" style={{color: '#112d32'}}>{className}</h1>
      </div>
      <div className="flex">
        <div className="w-2/5 mt-4 rounded-lg p-8">
          <div className="flex flex-wrap">
            {students.map((student, index) => (
              <Link
                className="w-1/4 e m-4 bg-white shadow-2xl rounded-lg transform transition duration-500 ease-in-out hover:scale-110"
                to={`/student/${student.id}`}
                key={index}
              >
                <div>
                  <img
                    src={student.photo}
                    alt={`Student ${student.id}`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <h2 className="text-center text-lg font-semibold"style={{color: '#112d32'}} >
                    {student.firstName} {student.lastName}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute right-10 w-1/2 h-3/4 rounded-lg p-8 m-8 mt-16 shadow-2xl"  style={{ backgroundColor: '#fff',overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4" style={{color: '#112d32'}}>Statistics</h2>
            <div className="p-4 bg-gray-100 rounded-lg">
              {/* Replace with your statistics content */
              console.log([{"competencies": aggregateCompetencies(studentTest2)}])}
              <StatisticsComponent statistics={[{"competencies": aggregateTests([studentTest,studentTest1,studentTest2])}]}></StatisticsComponent>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4" style={{color: '#112d32'}}>Suggestions</h2>
            <div className="p-4 bg-gray-100 rounded-lg">
              {/* Replace with your suggestions content */}
              <p>Suggestions content goes here...</p>
            </div>
          </div>
          <br/>
          <div className='mt-10'>
            <CreateTest/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Class;