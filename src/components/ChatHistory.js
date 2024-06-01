import React, { useState } from 'react';
import Modal from './Modal';
import LoadingDots from './LoadingDots';

function ChatHistory({ messages, handleMetricUpdate, isLoading }) {

  const [isModalOpen, setModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [harmful, setHarmful] = useState(false);
  const [untrue, setUntrue] = useState(false);
  const [unhelpful, setUnhelpful] = useState(false);
  const [messageId, setMessageId] = useState(1);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    let tags = {};
    let commentVar = comment;

    if (harmful) tags['harmful'] = true;
    if (unhelpful) tags['unhelpful'] = true;
    if (untrue) tags['untrue'] = true;
    if (comment === "")  commentVar = "None";

    handleMetricUpdate({message: messageId, tags: tags, comment: commentVar});
    handleCloseModal();
  };
  // Function to handle the thumbs up/down actions
  const handleThumbsAction = (liked, messageId) => {
    if (liked)
      handleMetricUpdate({message: messageId, tags: {helpful: true}, comment: "none"});
    else {
      handleOpenModal();
      setMessageId(messageId);
    }
  };

  return (
    <div className="chat-history">
      <Modal onClose={handleCloseModal} isOpen={isModalOpen}>
      <form onSubmit={handleSubmit}>
        <div className='form-div'>
          <label className='form-label'>Comments:</label>
          <textarea className='textarea-width'
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
          />
          <label className='form-label'>
          <input type="checkbox" name="harmful" checked={harmful} onChange={() => setHarmful(!harmful)} />
            This is harmful/unsafe.
          </label>
          <label className='form-label'>
          <input type="checkbox" name="unhelpful" checked={unhelpful} onChange={() => setUnhelpful(!unhelpful)} />
            It wasn't helpful.
          </label>
          <label className='form-label'>
          <input type="checkbox" name="untrue" checked={untrue} onChange={() => setUntrue(!untrue)} />
            It wasn't true.
          </label>
          <button type="submit">Submit</button>
          </div>
        </form>
      </Modal>
      <ul>
        {messages.map((message, index) => (
          <li key={index} className={message.creator}>
            <pre>
              {message.message}
            </pre>
            {/* Add thumbs up/down buttons only for assistant messages */}
            {message.creator === 'assistant' && (
              <div>
                <button className="emoji-button" onClick={() => handleThumbsAction(true, message.id)}>👍</button>
                <button className="emoji-button" onClick={() => handleThumbsAction(false, message.id)}>👎</button>
              </div>
            )}
          </li>
        ))}
        {isLoading ? (
           <div className='assistant-load'>
           <LoadingDots/>
         </div>
        ): <></>}
      </ul>
    </div>
  );
}

export default ChatHistory;
