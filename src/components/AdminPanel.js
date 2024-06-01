import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backend = process.env.REACT_APP_API_URL; 

const AdminPanel = () => {
  const [texts, setTexts] = useState([]);
  const [selectedText, setSelectedText] = useState(null);
  const [newContent, setNewContent] = useState('');
  const [newTextType, setNewTextType] = useState('');
  const [newTextContent, setNewTextContent] = useState('');

  const token = localStorage.getItem('token');

    // Make an authenticated request to the server
    const config = {
        headers: {
        'Authorization': `${token}`
        }
    };

  useEffect(() => {
    // Fetch all texts when the component mounts
    axios.get(backend + '/api/texts', config)
      .then(response => {
        setTexts(response.data);
      })
      .catch(error => {
        console.error('Error fetching texts:', error);
      });
  }, []);

  const handleTextSelect = (text) => {
    setSelectedText(text);
    setNewContent(text.content);
  };

  const handleContentChange = (e) => {
    setNewContent(e.target.value);
  };

  const handleUpdate = () => {
    axios.put(backend + '/api/text', {
      textType: selectedText.textType,
      content: newContent
    }, config)
    .then(response => {
      // Update the local state to reflect the change
      const updatedTexts = texts.map(text =>
        text.textType === selectedText.textType ? { ...text, content: newContent } : text
      );
      setTexts(updatedTexts);
      alert('Text updated successfully');
    })
    .catch(error => {
      console.error('Error updating text:', error);
    });
  };

  const handleAddNewText = () => {
    axios.post(backend + '/api/upload-text', {
      textType: newTextType,
      content: newTextContent
    }, config)
    .then(response => {
      // Update the local state to include the new text
      setTexts([...texts, { textType: newTextType, content: newTextContent }]);
      setNewTextType('');
      setNewTextContent('');
      alert('New text added successfully');
    })
    .catch(error => {
      console.error('Error adding new text:', error);
    });
  };

  return (
    <div className='container'>
      <h1>Admin Panel</h1>
      <div>
        <h2>Add New Text</h2>
        <input
          type="text"
          placeholder="Text Type"
          value={newTextType}
          onChange={(e) => setNewTextType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          value={newTextContent}
          onChange={(e) => setNewTextContent(e.target.value)}
        />
        <button onClick={handleAddNewText}>Add</button>
      </div>
      <div>
        <h2>Texts</h2>
        <ul>
          {texts.map(text => (
            <li key={text.textType} onClick={() => handleTextSelect(text)}>
              {text.textType}
            </li>
          ))}
        </ul>
      </div>
      {selectedText && (
        <div>
          <h2>Edit Text: {selectedText.textType}</h2>
          <textarea value={newContent} onChange={handleContentChange} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};
export default AdminPanel;
