import React, { useState, useEffect } from 'react';

function ChatInput({ onSend, handleMetricUpdate, isLoading, inputRef }) {
  const [message, setMessage] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Record the time when the component mounts
    // Set up an interval to update the elapsed time every second
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    // Clean up the interval timer when the component unmounts
    return () => clearInterval(interval);
  }, [startTime]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleTimeBetweenUserMessages = () => {
    console.log("User took", Math.floor(elapsedTime / 1000), 's to reply');
    // TODO @Andrei add it to the api
    //handleMetricUpdate("userInputTime", Math.floor(elapsedTime / 1000)); // Convert elapsed time from milliseconds to seconds
    setStartTime(Date.now());
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (message.trim() !== '' && !isLoading) {
      onSend(message);
      handleTimeBetweenUserMessages();
      setMessage('');
    }
  };

  return (
    <div className="chat-input">
      <form id="messageSubmit" onSubmit={handleSendMessage}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
      />
      <button onClick={handleSendMessage}>Send</button>
      </form>
    </div>
  );
}

export default ChatInput;
