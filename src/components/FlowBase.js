import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useNavigate } from 'react-router-dom';
import { createEdgeInFlow, updateEdgeAPI, createNodeInFlow, getFlow, getUserFlows, refresh, updateNode, deleteEdgeAPI } from '../api';
import ColorNode from './nodes/ColorNode';
import TextNode from './nodes/TextNode';
import DefaultNode from './nodes/DefaultNode';
import CreateNode from './nodes/CreateNode';
import StatisticNode from './nodes/StatisticNode';
import { useParams } from 'react-router-dom';
import NodeContextMenu from './NodeContextMenu';
import "../assets/css/DefaultNode.css";
import UsersList from './UsersList';
import Modal from './Modal';
import "../assets/css/ModalImage.css"
import CodeNode from './nodes/CodeNode';
import EdgeContextMenu from './EdgeContextMenu';

const backend = process.env.REACT_APP_API_URL;

const initBgColor = '#1A192B';
const nodeTypes = {
  customNode: ColorNode,
  textNode: TextNode,
  defaultNode: DefaultNode,
  createNode: CreateNode,
  statisticNode: StatisticNode,
  codeNode: CodeNode,
};


const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];



const AddNodeOnEdgeDrop = (props) => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [bgColor, setBgColor] = useState(initBgColor);
  const [usersRead, setUsersRead] = useState([]);
  const [usersReadWrite, setUsersReadWrite] = useState([]);
  const [menu, setMenu] = useState(null);
  const [edgeContextMenu, setEdgeContextMenu] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [captureElementClick, setCaptureElementClick] = useState(true);
  const [isUsersListVisible, setIsUsersListVisible] = useState(false);
  const [openNodeImageModal,setOpenNodeImageModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const {id} = useParams();
  const flowId = useRef(id);
  const ref = useRef(null);
  let navigate = useNavigate();

  // Fetch nodes and edges from the API on url id change
  useEffect(() => {
    if (id){
      getFlow(id, setNodes, setEdges, setUsersRead , setUsersReadWrite);
      flowId.current = id;
    }
  }, [id]);

  useEffect(() => {
    if (props.nodes)
    {
      console.log(props);
      setNodes(props.nodes);
      setEdges(props.edges);
    }
  }, [props]);

  useEffect(() => {
    async function refreshToken() {
        console.log("REFRESH token");
        let response = await refresh();
        console.log("REFRESH successful? :", response);
    }
    // Set an interval to refresh the token every 14 minutes
    const intervalId = setInterval(refreshToken, 14 * 60 * 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty array ensures this effect runs only once after the initial render


  const closeModal = () => setOpenNodeImageModal(false);

  const onNodeClick = useCallback((event, node) => {
    if (node.data.link) {
      if (!node.data.link.startsWith('/flow/')) {
        window.open(node.data.link, '_blank');
      } else {
        navigate(node.data.link);
      }
    } else if (node.data.imageUrl) { 
      setModalContent(
        <div className='modalImage'> 
          <img src={`${backend}/api/image/${node.data.imageUrl}`} alt="Node Image" style={{ maxWidth:'100%', maxHeight:'100%', objectFit: 'contain', display: 'block' }} />
        </div>
      );
      setOpenNodeImageModal(true);
    }
  }, []);

  const onConnect = useCallback(
    (params) =>
      {
        console.log(params);
        setEdges((eds) => addEdge({ ...params}, eds));
        createEdgeInFlow({ source: params.source, target: params.target }, flowId.current);
      },
    []
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onNodeDragStop = useCallback((event, node) => {
    updateNode(node);
  }, []);

  const toggleUsersListVisibility = () => {
    setIsUsersListVisible(!isUsersListVisible);
  };

  const onPaneClick = useCallback((event) => {
    event.preventDefault();
    
    setMenu(null);
    setEdgeContextMenu(null);

    const targetIsPane = event.target.classList.contains('react-flow__pane');
    if (targetIsPane) {
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: "temp-img",
        position,
        className: 'circle',
        style: {
          backgroundColor: '#f9f9f9',
          color: '#333',
          border: '1px solid #ddd',
          padding: '10px'
        },
        data: {save: saveNode, position},
        sourcePosition: 'right',
        targetPosition: 'left',
        type: "createNode",
      };
      setNodes((nds) => nds.concat(newNode));
    }

  }, [screenToFlowPosition, setMenu])

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();
      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
        setMenu,
      });
    },
    [setMenu],
  );

  const onConnectEnd = useCallback(
    async (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains('react-flow__pane');
      if (targetIsPane) {
        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const newNode = {
          id: "temp-img",
          position,
          className: 'circle',
          style: {
            backgroundColor: '#f9f9f9',
            color: '#333',
            border: '1px solid #ddd',
            padding: '10px'
          },
          data: {save: saveNode, position},
          sourcePosition: 'right',
          targetPosition: 'left',
          type: "createNode",
        };
        console.log({ source: connectingNodeId.current, target: newNode.id })
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({id:"temp-edge", source: connectingNodeId.current, target: newNode.id }),
        );
        
      }
    },
    [screenToFlowPosition],
  );

  const saveNode = useCallback(async (data, attributes) => {
    const position = {
      x: data.position.x,
      y: data.position.y,
    };
    const newNode = {
      type: attributes.type,
      className: attributes.className,
      position,
      style: {
        backgroundColor: '#f9f9f9',
        color: '#333',
        border: '5px solid #000',
        padding: '10px',
        boxShadow: "0 0 10px 8px #e04848"
      },
      data:data,
      /* data: {
        
      } */
      sourcePosition: 'right',
      targetPosition: 'left',
      reactFlow: flowId.current,
    };

    const createdNode = await createNodeInFlow(newNode, flowId.current);

    console.log("Created node", createdNode);
    const createdEdge = await createEdgeInFlow({ source: connectingNodeId.current, target: createdNode.id, animated: true,  style: { stroke: '#fff' }}, flowId.current)
    if (createdNode) {
      setNodes((nds) => {
        // Filter out the node with id 'temp-node' and add the new node
        const filteredNodes = nds.filter(node => node.id !== "temp-img");
        return filteredNodes.concat(createdNode);
      });
      setEdges((eds) => {
        // Filter out the edge with id 'temp-edge' and add the new edge
        const filteredEdges = eds.filter(edge => edge.id !== "temp-edge");
        return filteredEdges.concat(createdEdge);
      });
    }
  }, []);

  const handleEdgeContextMenu = useCallback((event, edge) => {
    event.preventDefault();
    console.log("clicked edge", edgeContextMenu, edge);
    const pane = ref.current.getBoundingClientRect();
    setEdgeContextMenu({
      edgeId: edge._id,
      top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
    });
    setSelectedEdge(edge);
  }, [edgeContextMenu, setEdgeContextMenu]);

  const updateEdgeStyle = (data) => {
    console.log("upod edge ", edgeContextMenu.edgeId);
    let updatedEdge;
    setEdges((eds) => 
      eds.map((edge) => {
        if (edge._id === edgeContextMenu.edgeId) {
          updatedEdge = {
            ...edge,
            style: data.style ? { ...edge.style, ...data.style } : edge.style,
            type: data.type ? data.type : edge.type,
            animated: data.animated ? data.animated : edge.animated,
          };
          return updatedEdge;
        }
        return edge;
      })
    );
    updateEdgeAPI(updatedEdge, flowId.current);
    setEdgeContextMenu(null);
  };

  const deleteEdge = () => {
    console.log("delete edge ", edgeContextMenu.edgeId);
    setEdges((eds) => eds.filter((edge) => edge._id !== edgeContextMenu.edgeId));
    deleteEdgeAPI(edgeContextMenu.edgeId);
    setEdgeContextMenu(null);
  };

  const closeContextMenu = () => {
    setEdgeContextMenu(null);
  };

  return (
      <div className="wrapper" ref={reactFlowWrapper} style={{width: "100%", height:"100%"}}>
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        minZoom={0.2}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={[0.5, 0]}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={handleEdgeContextMenu}
        onNodeClick={captureElementClick ? onNodeClick : undefined}
        style={{ background: bgColor }}
      >
        <Background />
        <button onClick={toggleUsersListVisibility} className="toggle-users-btn">
          {isUsersListVisible ? 'Hide Users' : 'Show Users'}
        </button>
        {isUsersListVisible && <UsersList existingUsersFlow={{usersread: usersRead, usersreadwrite: usersReadWrite}} flowId={flowId.current} toggleUsersListVisibility={toggleUsersListVisibility}/>}
       {menu && <NodeContextMenu {...menu}/>}
       {openNodeImageModal && <Modal isOpen={openNodeImageModal} onClose={closeModal}>
        {modalContent}
        </Modal>}
        {edgeContextMenu && (
        <EdgeContextMenu
          top = {edgeContextMenu.top}
          left = {edgeContextMenu.left}
          right = {edgeContextMenu.right}
          bottom={edgeContextMenu.bottom}
          edge={selectedEdge}
          onStyleChange={updateEdgeStyle}
          onDelete={deleteEdge}
          onClose={closeContextMenu}/>)}
    </ReactFlow>
      </div>
  );
};

export default () => (
  <div style={{width: "100%", height:"100%"}}>
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
  </div>
);
