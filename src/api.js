import axios from "axios";

const backend = process.env.REACT_APP_API_URL;

const config = (token) => ({
    headers: {
        'Authorization': token
    }
});

export const fetchImage = async (imageName) => {
    const response = await axios.post(backend + '/api/image', { imageName }, { responseType: 'arraybuffer' });
    const base64 = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '',
      ),
    );
    return `data:;base64,${base64}`;
  };
  
export const fetchText = async (textType) => {
  const response = await axios.post(backend + '/api/text', { textType });
  return response.data.text;
};

export const signup = async (formData) => {
  await axios.post(backend + '/api/signup/', formData).then(()=>{
    window.location.replace('/login'); // Replace the URL with the login page URL.
  }).catch((error) =>{
    if (error.response && error.response.status === 400) {
      alert(error.response.data.password);
    }});
  return ;
};

export const logout = async () => {
  //TODO @andrei undo the api;
  return true;
  await axios.post(
    backend + "/api/logout/",
    {token: localStorage.getItem('token')}
  )
  .catch((error) => {
    console.error('Error login:', error);
  });;
};

export const login = async (formData, setLoginToken) => {
  await axios.post(
    backend + "/api/login/",
    formData
  ).then((response) => {
    setLoginToken(response.data);
  })
  .catch((error) => {
    if (error.response && error.response.status === 401)
      alert("Wrong credentials");
    console.error('Error login:', error);
  });
};

export const refresh = async () => {
    let isAuthValid = undefined;
    await axios.post(backend+'/api/refresh/', {
      refresh: localStorage.getItem('refresh')
    }).then((response) => {
      // Update the access token in your app, e.g., save it in local storage
      localStorage.setItem('token', response.data.access);
      isAuthValid = true
    }).catch((error) => {
      isAuthValid = false;
    });
    return isAuthValid;
};

export const tryAuth = async () => {
  try {
    console.log("verifing tokens");
    await axios.get(backend+'/api/verify/', config(localStorage.getItem('token')));
    return true;
  } catch (error) {
    console.log("smth happened", error);
    return await refresh();
  }
};

export const getUserDetails = async (setUserName, setUserRank, setUserId) => {
  try {
    console.log("ping for details about user", localStorage.getItem('token') );
    const response = await axios.get(backend + '/api/me/', config(localStorage.getItem('token')));
    console.log("user details:", response.data)
    setUserName(response.data.username);
    setUserRank(response.data.rank); 
    return true
  } catch (error) {
    console.error('Failed get user info', error);
    return false;
  }
};

// Higher-Order Function to wrap API calls
export const withAuth = (apiFunction) => async (...args) => {
  try {
    // Verify and possibly refresh the token
    const authSuccess = await tryAuth();
    if (!authSuccess) {
      throw new Error('Authentication failed');
    }
    
    // If authentication succeeds, execute the provided API function
    return await apiFunction(...args);
  } catch (error) {
    // Log the error or handle it as needed
    console.error('Authentication or API call failed, Probably you are in read mode, let s see:', error);
  }
};

// Import withAuth and other dependencies at the top of your file

export const getFlow = withAuth(async (Id, setNodes, setEdges, setUsersRead, setUsersReadWrite) => {
  const response = await axios.get(backend + `/api/reactflows/` + Id, config(localStorage.getItem('token')));
  setNodes(response.data.nodes);
  setEdges(response.data.edges);
  setUsersRead(response.data.usersread);
  setUsersReadWrite(response.data.usersreadwrite);
});

export const updateFlow = withAuth(async (Id, update, setFlow) => {
  const response = await axios.put(backend + `/api/reactflows/` + Id, update, config(localStorage.getItem('token')));
  setFlow(response.data);
});

export const updateFlowPermissions = withAuth(async (Id, userId, permission) => {
  const response = await axios.put(backend + `/api/reactflowspermissions/` + Id, {userId, permission}, config(localStorage.getItem('token')));
});

export const getUserFlows = withAuth(async (setFlows) => {
  const response = await axios.get(backend + `/api/user/reactflows`, config(localStorage.getItem('token')));
  setFlows(response.data);
});

export const getUserPrimaryFlow = withAuth(async (setFlows) => {
  const response = await axios.get(backend + `/api/user/primaryreactflow`, config(localStorage.getItem('token')));
  setFlows(response.data.primaryReactFlow);
});

export const getAllUsers = withAuth(async (setUsers) => {
  const response = await axios.get(backend + `/api/users`, config(localStorage.getItem('token')));
  setUsers(response.data);
});

export const createNode = withAuth(async (newNode) => {
  if (newNode.id === "temp-img") return;
  const response = await axios.post(backend + `/api/nodes`, newNode, config(localStorage.getItem('token')));
  return response.data;
});

export const createFlow = withAuth(async () => {
  const response = await axios.post(backend + `/api/reactflows`, {}, config(localStorage.getItem('token')));
  return response.data._id;
});

export const createNodeInFlow = withAuth(async (newNode, flowId) => {
  const response = await axios.post(backend + `/api/reactflowsnode`, {node: newNode, flowId: flowId}, config(localStorage.getItem('token')));
  return response.data;
});

export const createEdgeInFlow = withAuth(async (newEdge, flowId) => {
  const response = await axios.post(backend + `/api/reactflowsedge`, {edge: newEdge, flowId: flowId}, config(localStorage.getItem('token')));
  return response.data;
});

export const upload = withAuth(async (formData) => {
  const response = await axios.post(backend + `/api/upload`, formData, config(localStorage.getItem('token')));
  return response.data.imageUrl;
});

export const updateNode = withAuth(async (node) => {
  if (node.id === "temp-img") return;
  const response = await axios.put(backend + '/api/nodes/' + node._id, node, config(localStorage.getItem('token')));
  return response.data;
});

export const deleteNodeAPI = withAuth(async (id) => {
  const response = await axios.delete(backend + '/api/nodes/' + id, config(localStorage.getItem('token')));
  return response.data;
});

export const deleteEdgeAPI = withAuth(async (id) => {
  const response = await axios.delete(backend + '/api/edges/' + id, config(localStorage.getItem('token')));
  return response.data;
});

export const updateEdgeAPI = withAuth(async (edge) => {
  const response = await axios.put(backend + '/api/edges/' + edge.id, edge, config(localStorage.getItem('token')));
  return response.data;
});

export const getNodeAPI = withAuth(async (id) => {
  const response = await axios.get(backend + '/api/nodes/' + id, config(localStorage.getItem('token')));
  return response.data;
});



export const createPdf = async (data, event) => {
  
  event.preventDefault();
    try {
        console.log(data);
        const response = await axios.post("http://localhost:5000/api/generate-pdf/", data, {
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'test.pdf');
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        if (error.response && error.response.status === 401)
          alert("Wrong credentials");
        console.error('Error during PDF generation:', error);
      }
};

export const createPdfAi = async (data, event) => {
  
  event.preventDefault();
    try {
        console.log(data);
        const response = await axios.post("http://localhost:5000/api/generate-pdf-ai/", "{}", {
          responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'test.pdf');
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        if (error.response && error.response.status === 401)
          alert("Wrong credentials");
        console.error('Error during PDF generation:', error);
      }
};