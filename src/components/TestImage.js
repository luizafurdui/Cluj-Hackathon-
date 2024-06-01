import React from 'react';

const TestImage = ({ testInfo }) => {
  let testImageUrl;

  try {
    testImageUrl = require(`../assets/images/${testInfo.testTitle}.jpg`);
  } catch (error) {
    console.error(`Error loading image: ${error}`);
    testImageUrl = null; // Fallback in case the image is not found
  }

  if (!testImageUrl) return;

  return (
    <div className="flex items-center justify-center bg-white shadow-2xl rounded-lg p-4 overflow-auto">
        <img src={testImageUrl} alt={`Test ${testInfo.testTitle}`} className="w-full object-contain rounded-lg" />
    </div>
  );
};

export default TestImage;
