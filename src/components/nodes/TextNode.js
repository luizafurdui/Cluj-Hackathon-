import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import CodeBlock from '../CodeBlock';

const backend = process.env.REACT_APP_API_URL;
const TextNode = ({ data, isConnectable }) => {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  // Function to simulate loading completion
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
    <div className='inner-text'>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      <div>
        {/* Displaying the text preserving the formatting */}
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          {data.label}
        </pre>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
    </>
  );
};

export default memo(TextNode);
