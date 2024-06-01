import React, { useEffect, useState } from 'react';
import { fetchImage, fetchText } from '../api';
import './LandingPage.css'
import TextWithNewlines from './TextWithNewlines';
import ReactMarkdown from 'react-markdown';

const LandingPage = () => {
    const [imageSrc, setImageSrc] = useState('');
    const [text, setText] = useState('');
    const [textDesc, setTextDesc] = useState('');
  
    useEffect(() => {
      // Fetch image
    //   fetchImage('somePic.jpg')
    //   .then((image) => {
    //     setImageSrc(image);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching image:', error);
    //   });

    // // Fetch text
    // fetchText('greeting')
    //   .then((fetchedText) => {
    //     setText(fetchedText);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching text:', error);
    //   });

    //   fetchText('description')
    //   .then((fetchedText) => {
    //     setTextDesc(fetchedText);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching text:', error);
    //   });
    }, []);
  
    const appStyle = {
        backgroundImage: `url(${imageSrc})`,
      };

      const anotherStyle = {
        white_space: "pre-line;",
      };
    
      return (
        <div className="App" style={appStyle}>
          <div className="Content">
            <h1 className='darker-background landingText landingHeader'>My Life</h1>
            <TextWithNewlines text={"Here will be my life line"} className={"white darker-background landingText"}/>
        </div>
        <ReactMarkdown className='Body'>{textDesc}</ReactMarkdown>
        </div>
      );
};

export default LandingPage;
