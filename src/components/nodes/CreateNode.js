import React, { memo, useRef, useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { createFlow, upload, createNodeInFlow } from "../../api.js";
import "../../assets/css/ImageUploadNode.css";
import ColorNode from './ColorNode.js';
import DefaultNode from './DefaultNode.js';
import TextNode from './TextNode.js';
import StatisticNode from './StatisticNode.js';
import CodeNode from './CodeNode.js';
import Modal from '../Modal.js';
import DynamicTableForStatistics from '../StatisticsCreator.js';

const NodeTypes = {
  IMAGE: 'defaultNode',
  TEXT: 'textNode',
  CODE: 'codeNode',
  STATISTICS: 'statisticNode',
  REFERENCE: 'referenceNode',
};

const CodeLanguages = {
  CPP: "cpp",
  CSS: "css",
  CUDA: "cuda",
  HKL: "haskle",
  HLSL: "hlsl",
  HTML: "html",
  JS: "javascript",
  JAVA: "java",
  JSON: "json",
  PY: "python",
  RS: "rust",
}
// const nodeTypes = {
//   customNode: ColorNode,
//   textNode: TextNode,
//   defaultNode: DefaultNode,
//   statisticNode: StatisticNode,
//   codeNode: CodeNode,
// };

const CreateNode = memo(({ data, isConnectable }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [label, setLabel] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [table, setTable] = useState(null);
  const [nodeType, setNodeType] = useState(NodeTypes.IMAGE); // State for node type
  const [className, setClassName] = useState(null); // State for node type
  const labelInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isNewFlow, setIsNewFlow] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState("cpp");


  useEffect(() => {
    setTimeout(() => {
      if (labelInputRef.current) {
        labelInputRef.current.focus({ preventScroll: true });
      }
    }, 1);
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    const imgURL = await upload(formData);
    setImgURL(imgURL);
    
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setLabel(e.target.value);
  };

  const handleNewFlow = (e) => {
    setIsNewFlow(!isNewFlow);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleNodeCreation();
    }
  };

  const handleNodeCreation = async () => {
    console.log("Creating node:", nodeType);
    const { save, ...dataWithoutSave } = data;

    // if (nodeType == NodeTypes.REFERENCE) {
    //   let nodeOld = await getNodeAPI(label);
    //   console.log (nodeOld);
    //   dataWithoutSave = nodeOld.data;

    // }
    if (label) dataWithoutSave.label = label;
    if (imgURL) dataWithoutSave.imageUrl = imgURL;
    else if (nodeType === NodeTypes.IMAGE) dataWithoutSave.imageUrl = '1708197140189-logov3.png';
    if (table) dataWithoutSave.statistics = table;
    let nodeClassName = className ? className : 'circle';
    if (codeLanguage && nodeType === NodeTypes.CODE) dataWithoutSave.language = codeLanguage;
    if (nodeType === NodeTypes.TEXT || nodeType === NodeTypes.CODE || nodeType === NodeTypes.STATISTICS ) {
      //Handle different node types
      if (!className) //for example div style, if not specified by the user set default
        {
          nodeClassName = 'rectangle';
        }
    }
    if (isNewFlow) {
      const newFlowId = await createFlow();
      dataWithoutSave.link = "/flow/"+newFlowId;

      const position = {
        x: 0,
        y: 0,
      };
      const newNode = {
        type: nodeType,
        className: nodeClassName,
        position,
        style: {
          color: '#333',
        },
        data:dataWithoutSave,
        /* data: {
          
        } */
        sourcePosition: 'right',
        targetPosition: 'left',
        reactFlow: newFlowId,
      };
  
      createNodeInFlow(newNode, newFlowId);
    }

    save(dataWithoutSave, {'type' : nodeType, 'className': nodeClassName});
  };

  const handleNodeTypeChange = (e) => {
    setNodeType(e.target.value);
  };

  const handleTableSubmit = (tableData) => {
    setTable(tableData);
  }

  const handleLanguageChange = (e) => {
    setCodeLanguage(e.target.value);
  }

  const handleModalOpen = () => {
    setModalContent(<DynamicTableForStatistics onSubmit={handleTableSubmit}/>);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='node-creator'>
      <select style={{width: '80%'}} value={nodeType} onChange={handleNodeTypeChange}>
        {Object.values(NodeTypes).map((type) => (
          <option value={type} key={type}>{type}</option>
        ))}
      </select>
      {nodeType === NodeTypes.IMAGE && (
        <input type="file" onChange={handleFileChange} style={{marginLeft: "70px"}}/>
      )}
      {nodeType === NodeTypes.STATISTICS && (
        <button onClick={handleModalOpen}>Edit Statistics</button>
      )}
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
        </Modal>}

      {nodeType === NodeTypes.IMAGE || nodeType === NodeTypes.REFERENCE ? 
        <><input
        type="text"
        ref={labelInputRef}
        value={label}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Type your text here..."
        rows="10" // Adjust based on your needs
        style={{ width: '100%' }} // Adjust width as necessary
      /> 
      <input
        type="checkbox"
        value={isNewFlow}
        onChange={handleNewFlow}/></>
      :
      <textarea
      ref={labelInputRef}
      value={label}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      placeholder="Type your text here..."
      rows="10" // Adjust based on your needs
      style={{ width: '100%' }} // Adjust width as necessary
      /> 
      }
      {nodeType === NodeTypes.CODE && (
        <select style={{width: '80%'}} value={codeLanguage} onChange={handleLanguageChange}>
        {Object.values(CodeLanguages).map((type) => (
          <option value={type} key={type}>{type}</option>
        ))}
        </select>
      )}
      <button onClick={handleNodeCreation}>{isNewFlow ? "Create Flow" : "Create Node"}</button>
      <Handle type="target" position={Position.Bottom} isConnectable={isConnectable} />      
    </div>
  );
});

export default CreateNode;
