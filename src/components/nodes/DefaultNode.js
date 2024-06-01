import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

const backend = process.env.REACT_APP_API_URL;
const DefaultNode = ({ data, isConnectable }) => {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  // Function to simulate loading completion
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
    <div className='inner-circle'
      style={{
        border: isLoading ? '5px solid transparent' : 'none', 
        backgroundImage: isLoading ? 'linear-gradient(white, white), linear-gradient(to right, red, orange)' : 'none',
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      {data.imageUrl && (
        <img
          src={backend + "/api/image/"+data.imageUrl}
          alt="Custom"
          onLoad={handleImageLoad}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: isLoading ? 'none' : 'block'
          }}
        />
      )}


      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
    <div style={{position: 'absolute'}}>
    <svg width="190" height="190" viewBox="0 0 190 190">
        <path id="circlePath" fill="none" d="M95 ,97 m -93, 0 a 20,20 0 1,0 185,0 a 20,20 0 1,0 -185,0" /> 
        {/* add stroke="red" if you want to debug the path */}
        <text>
          <textPath href="#circlePath" startOffset="25%" textAnchor="middle" style={{fontSize: "20px"}}>
            {data.label}
          </textPath>
        </text>
      </svg>
      </div>
    </>
  );
};

export default memo(DefaultNode);
