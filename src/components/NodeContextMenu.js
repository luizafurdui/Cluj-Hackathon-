import React, { useCallback, useEffect, useState } from 'react';
import { useReactFlow } from 'reactflow';
import "../assets/css/NodeContextMenu.css";
import { updateNode, deleteNodeAPI } from '../api';

export default function NodeContextMenu({
  id,
  top,
  left,
  right,
  bottom,
  setMenu, // used to close the menu when pressing a button
  ...props
}) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const [label, setLabel] = useState("");
  const [node, setNode] = useState();
  const [newPropKey, setNewPropKey] = useState("");
  const [newPropValue, setNewPropValue] = useState("");
  const [isStyle, setIsStyle] = useState(false);

  useEffect(() => {
    const oldNode = getNode(id);
    if (!oldNode.data.label) oldNode.data.label = "";
    setNode(oldNode);
  }, [id]);

  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    const position = {
      x: node.position.x + 50,
      y: node.position.y + 50,
    };

    addNodes({ ...node, id: `${node.id}-copy`, position });
    // Change Id and create new node in service
    setMenu(null);
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    deleteNodeAPI(id);
    console.log(id);
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
    setMenu(null);
  }, [id, setNodes, setEdges]);

  const handleInputChange = (path, value) => {
    // Function to update the state based on the input path and value
    const levels = path.split('.');
    const newState = { ...node };
    let currentLevel = newState;
    for (let i = 0; i < levels.length - 1; i++) {
      currentLevel = currentLevel[levels[i]];
    }
    currentLevel[levels[levels.length - 1]] = value;
    setNode(newState);
  };

  const handleNewPropChange = (key, value) => {
    let newState = { ...node };
    if (isStyle) {
      newState.style = { ...newState.style, [key]: value };
    } else {
      newState.data = { ...newState.data, [key]: value };
    }
    setNode(newState);
  };

  const renderInputsForSpecifiedProps = useCallback((obj, allowedProps, prefix = '') => {
    // Function to render inputs only for specified properties and their nested properties
    return allowedProps.map((prop) => {
      const path = prefix ? `${prefix}.${prop}` : prop;
      let value;
      try {
        value = obj[prop];
      } catch {
        return <></>;
      }
      if (typeof value === 'object' && !Array.isArray(value)) {
        // Handle nested properties
        return (
          <React.Fragment key={path}>
            {renderInputsForSpecifiedProps(value, Object.keys(value), path)}
          </React.Fragment>
        );
      } else {
        // Render input for simple properties
        return (
          <div key={path}>
            <label htmlFor={path}>{path}: </label>
            <textarea
              id={path}
              rows={1}
              value={value || ''} // Handle undefined values
              onChange={(e) => handleInputChange(path, e.target.value)}
            />
          </div>
        );
      }
    });
  }, [node]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    updateNode(node);
    setNodes((prevNodes) => {
      return prevNodes.map((nodeL) => {
        if (nodeL.id === node.id) {
          return { ...node, data: { ...node.data, label: node.data.label } }; // Create a new object with updated properties
        }
        return nodeL;
      });
    });

    setMenu(null);
  }, [node, setNodes]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="context-menu"
      {...props}
    >
      <p style={{ margin: '0.5em' }}>
        <small>node: {id}</small>
      </p>
      <button onClick={duplicateNode}>duplicate</button>
      <button onClick={deleteNode}>delete</button>
      <form onSubmit={handleSubmit}>
        {renderInputsForSpecifiedProps(node, ['position', 'style', 'type', 'className', 'data'])}

        <div key={"new-prop"}>
          <label htmlFor="new-prop-key">new property key: </label>
          <input
            id="new-prop-key"
            type="text"
            value={newPropKey} // Handle undefined values
            onChange={(e) => setNewPropKey(e.target.value)}
          />
          <label htmlFor="new-prop-value">new property value: </label>
          <input
            id="new-prop-value"
            type="text"
            value={newPropValue} // Handle undefined values
            onChange={(e) => setNewPropValue(e.target.value)}
          />
          <label htmlFor="is-style">Style</label>
          <input
            id="is-style"
            type="checkbox"
            checked={isStyle}
            onChange={(e) => setIsStyle(e.target.checked)}
          />
          <button type="button" onClick={() => handleNewPropChange(newPropKey, newPropValue)}>Add Property</button>
        </div>

        <button type="submit">Upload Changes</button>
      </form>
    </div>
  );
}
