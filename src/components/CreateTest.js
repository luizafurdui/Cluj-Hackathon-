import React, { useState } from 'react';
import axios from 'axios';
import { createPdf, createPdfAi } from '../api';

const CreateTest = () => {
  const [testData, setTestData] = useState({
    testTitle: '',
    questions: []
  });

  const handleTestTitleChange = (event) => {
    setTestData({ ...testData, testTitle: event.target.value });
  };

  const handleQuestionTextChange = (qIndex, event) => {
    const newQuestions = [...testData.questions];
    newQuestions[qIndex].text = event.target.value;
    setTestData({ ...testData, questions: newQuestions });
  };

  const handleNumAnswersChange = (qIndex, event) => {
    const num = parseInt(event.target.value);
    const newQuestions = [...testData.questions];
    newQuestions[qIndex].answers = Array.from({ length: num }, (_, i) => newQuestions[qIndex].answers[i] || { text: '', isCorrect: false });
    setTestData({ ...testData, questions: newQuestions });
  };

  const handleAnswerTextChange = (qIndex, aIndex, event) => {
    const newQuestions = [...testData.questions];
    newQuestions[qIndex].answers[aIndex].text = event.target.value;
    setTestData({ ...testData, questions: newQuestions });
  };

  const handleCorrectAnswerChange = (qIndex, aIndex) => {
    const newQuestions = [...testData.questions];
    newQuestions[qIndex].answers = newQuestions[qIndex].answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === aIndex
    }));
    setTestData({ ...testData, questions: newQuestions });
  };

  const addQuestion = () => {
    setTestData({
      ...testData,
      questions: [...testData.questions, { text: '', answers: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }] }]
    });
  };

  const removeQuestion = (qIndex) => {
    const newQuestions = testData.questions.filter((_, index) => index !== qIndex);
    setTestData({ ...testData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting data:", testData);
      createPdf(testData, e);
    } catch (error) {
      console.error("Submission failed:", error.message);
    }
  };

  const handleSubmitAi = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting data:", testData);
      createPdfAi(testData, e);
    } catch (error) {
      console.error("Submission failed:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto">
      <div className='form-question mb-4 border border-gray-300 rounded-md p-4'>
        <p className="font-bold">Test Title:</p>
        <input type="text" value={testData.testTitle} onChange={handleTestTitleChange} required className="border border-gray-300 rounded-md p-2 mt-2 w-full" />
      </div>
      {testData.questions.map((question, qIndex) => (
        <div key={qIndex} className='form-question mb-4 border border-gray-300 rounded-md p-4'>
          <p className="font-bold">Enter your question:</p>
          <textarea rows="3" value={question.text} onChange={(e) => handleQuestionTextChange(qIndex, e)} required className="border border-gray-300 rounded-md p-2 mt-2 w-full" />
          <p className="font-bold">Number of answers:</p>
          <input type="number" value={question.answers.length} onChange={(e) => handleNumAnswersChange(qIndex, e)} min="2" required className="border border-gray-300 rounded-md p-2 mt-2 w-16" />
          {question.answers.map((answer, aIndex) => (
            <div key={aIndex} className='form-answer mt-2'>
              <p className="font-bold">Answer {aIndex + 1}:</p>
              <input type="text" value={answer.text} onChange={(e) => handleAnswerTextChange(qIndex, aIndex, e)} required className="border border-gray-300 w-3/4 rounded-md p-2 mt-2" />
              <label className="ml-2">
                <input
                  type="radio"
                  name={`correctAnswer-${qIndex}`}
                  checked={answer.isCorrect}
                  onChange={() => handleCorrectAnswerChange(qIndex, aIndex)}
                  className="mr-2"
                /> Correct
              </label>
            </div>
          ))}
          <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-light py-2 px-4 rounded mt-2" onClick={() => removeQuestion(qIndex)}>Remove Question</button>
        </div>
      ))}
      <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded" onClick={addQuestion}>Add Question</button><br />
      <div className="flex justify-between">
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded mt-4">Submit Test</button>
        <button type="button" className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded mt-4" onClick={handleSubmitAi}>Generate AI Test</button>
      </div>
    </form>
  );
    
};
export default CreateTest;