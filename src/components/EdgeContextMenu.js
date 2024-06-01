import React, { useState } from 'react';

const EdgeContextMenu = ({ top, left, right, bottom, edge, onStyleChange, onDelete, onClose }) => {
    const styleOptions = ['default', 'straight', 'step', 'smoothstep'];
    const [size, setSize] = useState(edge.style ? edge.style.strokeWidth ?? '1' : '1'); // Default size
    const [color, setColor] = useState(edge.style ? edge.style.stroke ?? "#000000" : "#000000"); // Default color
    const [animated, setAnimated] = useState(edge.animated ?? false); // Default animated state

    return (
      <div
        style={{
          position: 'absolute',
          left,
          top,
          right,
          bottom,
          backgroundColor: 'white',
          border: '1px solid #ddd',
          padding: '10px',
          borderRadius: '8px', // Rounded corners for the container
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Soft shadow for modern look
          zIndex: 1000, // Ensure it's above everything else
        }}
        onMouseLeave={onClose} // Optional: close the menu when the mouse leaves
      >
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
          <li style={{ borderBottom: '1px solid #ccc', borderRadius: '6px', padding: '5px 10px' }}>
            <label>
              Edge Size: <input type="number" value={size} onChange={e => setSize(e.target.value)} />
            </label>
          </li>
          <li style={{ borderBottom: '1px solid #ccc', borderRadius: '6px', padding: '5px 10px' }}>
            <label>
              Edge Color: <input type="color" value={color} onChange={e => setColor(e.target.value)} />
            </label>
          </li>
          <li style={{ borderBottom: '1px solid #ccc', borderRadius: '6px', padding: '5px 10px' }}>
            <label>
              Animated: <input type="checkbox" checked={animated} onChange={e => setAnimated(e.target.checked)} />
            </label>
          </li>
          {styleOptions.map((option, index) => (
            <li key={option} style={{
              borderBottom: '1px solid #ccc',//index !== styleOptions.length - 1 ? '1px solid #ccc' : 'none', // No border for the last item
              borderRadius: '6px',
              padding: '5px 10px',
              cursor: 'pointer' // Pointer on hover
            }} onClick={() => onStyleChange({ type: option })}>
              Set type to {option}
            </li>
          ))}
          <li key={"update"} style={{
            borderBottom: '1px solid #ccc',//index !== styleOptions.length - 1 ? '1px solid #ccc' : 'none', // No border for the last item
            borderRadius: '6px',
            padding: '5px 10px',
            cursor: 'pointer' // Pointer on hover
          }} onClick={() => onStyleChange({ style: { strokeWidth: size, stroke: color }, animated })}>
            Update edge style
          </li>
          <li style={{ marginTop: '10px', borderRadius: '6px', padding: '5px 10px', backgroundColor: '#ffdddd', color: '#ff0000', cursor: 'pointer' }} onClick={onDelete}>
            Delete edge
          </li>
        </ul>
      </div>
    );
};

export default EdgeContextMenu;
