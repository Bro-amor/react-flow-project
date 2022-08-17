import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import './App.css';

import Sidebar from './components/Sidebar';
import StateMangement from './components/StateMangement';


function App() {

  // Group 디렉토리 안에 있는 디렉토리
  const [groupInDir, setGroupInDir] = useState([]);
  const [componentNode, setComponentNode] = useState();

  const getComponentNode = (componentNode) => {
    console.log(componentNode);
    setComponentNode(componentNode);
  };


  // Group 안에 디렉토리 읽어오는 기능
  useEffect(() => {
      axios.get('http://192.168.0.189:5001/getFolderList', {
          params: {
              path: "./Group"
          }
      })
      .then((response) => {
          setGroupInDir(response.data.folderList);
      });
  }, []);


  return (
    <Container fluid>
      <Row xs="auto">
        <Col className='sidebarCol' sm={2}>
          <Sidebar groupInDir={groupInDir} getComponentNode={getComponentNode} />
        </Col>
        <Col className='flowspaceCol' sm={10}>
          <StateMangement groupInDir={groupInDir} componentNode={componentNode} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
