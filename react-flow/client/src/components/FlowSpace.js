import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, { addEdge, useNodesState, useEdgesState, Controls, MiniMap, useReactFlow } from 'react-flow-renderer';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import CustomInputNode from './nodeType/CustomInputNode.js';
import CustomOutputNode from './nodeType/CustomOutputNode.js';
import CustomDefaultNode from './nodeType/CustomDefaultNode.js';


// const initialNodes = [
//     {
//         id: '1',
//         type: 'customInputNode',
//         position: { x: 250, y: 205 },
//         data: { label: 'custom input node', username: '홍길동', phone: '01034876485', addr: '서울' },
//     },
//     {
//         id: '2',
//         type: 'customOutputNode',
//         position: { x: 250, y: 5 },
//         data: { label: 'custom output node', username: '인투와이즈', phone: '01065526961', addr: '대전' },
//     },
//     {
//         id: '3',
//         type: 'customDefaultNode',
//         position: { x: 250, y: 105 },
//         data: { label: 'custom default node', username: '정준용', phone: '01012345678', addr: '공주' },
//     },
//     {
//         id: '4',
//         type: 'input',
//         position: { x: 500, y: 105 },
//         data: { label: 'input node', username: "", phone: "", addr: "" },
//     },
// ];


let id = 0;
let idx = 0;
const getId = () => `dndnode_${id++}`;
const getIndex = () => idx++;

const FlowSpace = (props) => {

    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [nodeData, setNodeData] = useState([]);
    // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const { setViewport } = useReactFlow();
    
    const onConnect = useCallback((parms) => setEdges((eds) => addEdge(parms, eds)), []);
    

    // 노드 타입 정의
    const nodeType = useMemo(() => ({ customInputNode: CustomInputNode, customOutputNode: CustomOutputNode, customDefaultNode: CustomDefaultNode }), []);


    // 왼쪽 사이드 바에서 요소 드래그 하고 드래그 끝날 때
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);


    // 왼쪽 사이드 바에서 요소 드래그 하고 드랍 했을 때 새로운 노드 생기는 기능
    // const onDrop = (event) => {
    //     event.preventDefault();

    //     const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    //     // const type = event.dataTransfer.getData('application/reactflow');
    //     // const name = event.dataTransfer.getData('text');

    //     console.log(props.componentNode)
    //     const type = props.componentNode.componentData.nodes.type;
    //     const name = props.componentNode.componentName;

    //     if(typeof type === 'undefined' || !type) {
    //         return;
    //     }

    //     const position = reactFlowInstance.project({
    //         x: event.clientX - reactFlowBounds.left,
    //         y: event.clientY - reactFlowBounds.top,
    //     });
    //     const newNode = {
    //         id: getId(),
    //         type,
    //         position,
    //         data: { label: `${name}`, username: "", phone: "", addr: "" },
    //     };

    //     setNodes((nds) => nds.concat(newNode));
    // };

    const onDrop = useCallback((event) => {
        event.preventDefault();

        let category = "";
        let file = "";

        axios.get('http://192.168.0.189:5001/nodeData/componentPath')
        .then((response) => {
            category = response.data.path.category;
            file = response.data.path.file;

            axios.get('http://192.168.0.189:5001/nodeData/componentNodeData', {
                params: {
                    componentNodePath: `./Group/${category}/${file}.json`
                }
            })
            .then((response) => {
                
                const componentNode = JSON.parse(response.data);
                // console.log(componentNode)

                const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
                // const componentData = componentNode.componentData;
                const type = componentNode.componentType;
                // const data = componentNode.componentData.nodes[0].data;
                // const componentName = componentNode.componentName;
                // const myData = componentNode.myData;
                // const childData = componentNode.childData
        
                if(typeof type === 'undefined' || !type) {
                    return "customDefaultNode";
                }
        
                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });
                const newNode = 
                {
                    ...componentNode,

                };
                newNode.componentData = 
                {
                    id: getId(),
                    key: `${newNode.componentName}`,
                    // id: `${newNode.componentName}`,
                    index: getIndex(),
                    type,
                    position,
                    data: {label: `${newNode.componentName}`, attr: newNode.myData},
                }
                // const newNode = 
                // {
                //     path:
                //     {
                //         group: "Group",
                //         category,
                //     },
                //     componentName,
                //     myData,
                //     componentData: 
                //     {
                //         nodes:
                //         [
                //             {
                //                 id: getId(),
                //                 position,
                //             }
                //         ]
                //     },
                //     childData,
                // };
                // const newNode = 
                // {
                //     id: getId(),
                //     type,
                //     position,
                //     // data: {label: `${name}`, username: "", phone: "", addr: ""},
                //     data: {label: `${name}`},
                // };
        
                setNodes((nds) => nds.concat(newNode.componentData));
                setNodeData((nds) => nds.concat(newNode));
            })
        })
    }, [reactFlowInstance]);


    // flow layer 파일로 저장하기 기능
    const onSave = useCallback(() => {
        alert("저장되었습니다!");
        console.log();
        if(reactFlowInstance) {
            const flow = reactFlowInstance.toObject();

            axios.post('http://192.168.0.189:5001/nodeData', flow);
        }
    }, [reactFlowInstance]);


    // flow layer 파일 불러오기 기능
    const onRestore = useCallback(() => {
        const restoreFlow = async () => {

            axios.get('http://192.168.0.189:5001/nodeData')
                 .then((response) => {
                    const flow = JSON.parse(response.data);
                    if(flow) {
                        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                        setNodes(flow.nodes || []);
                        setEdges(flow.edges || []);
                        setViewport({ x, y, zoom });
                    }
                 });
        };

        restoreFlow();
    }, [setNodes, setViewport]);


    // 클릭된 노드
    const [selectedNode, setSelectedNode] = useState();
    // const [selectedNode, setSelectedNode] = useState(0);


    // 노드 클릭 시
    // react-flow 안에 노드 클릭 시 오른쪽에 사이드바 열리고 닫히는 기능
    const [show1, setShow1] = useState(false);

    const handleShow = (event, node) => {
        console.log(node)
        // console.log(reactFlowInstance.toObject())
        setSelectedNode(node);
        setShow1(true);
    };

    const handleClose = () => {
        setShow1(false);
    }


    // // 입력값으로 노드 데이터 변경하기 위해 입력값 저장
    // let username = selectedNode ? selectedNode.data.username : "";
    // let phone = selectedNode ? selectedNode.data.phone : "";
    // let addr = selectedNode ? selectedNode.data.addr : "";
    // const onChangeUsername = (event) => {
    //     username = event.target.value;
    // };
    // const onChangePhone = (event) => {
    //     phone = event.target.value;
    // };
    // const onChangeAddr = (event) => {
    //     addr = event.target.value;
    // };


    // // 노드 데이터 변경하는 기능
    // const updateSelectedNodeData = () => {
    //     selectedNode.data.username = username;
    //     selectedNode.data.phone = phone;
    //     selectedNode.data.addr = addr;
    //     alert("저장되었습니다.");

    //     console.log()
    // };


    // // 노드 데이터 수정
    // const usernameInput = useRef(null);
    // const phoneInput = useRef(null);
    // const addrInput = useRef(null);

    // const modifySelectedNodeData = () => {
    //     usernameInput.current.disabled = false;
    //     usernameInput.current.focus();
    //     phoneInput.current.disabled = false;
    //     addrInput.current.disabled = false;
    // };


    const [showCompAdd, setShowCompAdd] = useState(false);

    const addComponent = () => {
        setShowCompAdd(true);

    
        // if(reactFlowInstance) {
        //     const flow = reactFlowInstance.toObject();

        //     axios.post('http://192.168.0.189:5001/nodeData/saveTest', {
        //         flow: flow,
        //         // path: `./Group/`
        //     });
        // }
    };

    const hideCompAdd = () => {
        setShowCompAdd(false);
    };


    // const changeAttrName = (e) => {
    //   // Attr 이름 바꾸는 기능 나중에 구현 
    //   console.log(e.target.innerText);
    // };
    const [numAttr, setNumAttr] = useState(0);
    const attr = [];
    let num = 1;
    for (let i = 0; i < numAttr; i++) {
        attr.push(<InputGroup key={num} className='mb-2'><InputGroup.Text>Attr-{num}</InputGroup.Text><Form.Control id={`attr${num}`} /><InputGroup.Text >type</InputGroup.Text><Form.Control id={`attr${num}-type`} /><InputGroup.Text >default</InputGroup.Text><Form.Control id={`attr${num}-default`} /></InputGroup>);
        // attr.push(<InputGroup key={num} className='mb-2'><InputGroup.Text>Attr-{num}</InputGroup.Text><Form.Control id={"attr"+`${num}`} /><InputGroup.Text >type</InputGroup.Text><Form.Control id={"attr"+`${num}-type`} /><InputGroup.Text >default</InputGroup.Text><Form.Control id={"attr"+`${num}-default`} /></InputGroup>);
        num++;
    };


    const addCategory = (e) => {
        if(e.target.value === "add") {
            document.getElementById('div1').style.display  = "block";
        }
        else {
            document.getElementById('div1').style.display  = "none";
        }
    };


    // let selectedNodetype = ""; 
    const [selectedType, setSelectedType] = useState();
    const selectNodeType = (event) => {
        // console.log(event.target.value)
        if(event.target.value === "input") {
            setSelectedType("customInputNode");
            // selectedNodetype = "customInputNode";
        }
        if(event.target.value === "output") {
            setSelectedType("customOutputNode");
            // selectedNodetype = "customOutputNode";
        }
        if(event.target.value === "default") {
            setSelectedType("customDefaultNode");
            // selectedNodetype = "customDefaultNode";
        }
        // console.log(selectedNodetype)
    };


    // const [componentList, setComponetList] = useState([]);
    const onSaveComponent = () => {
        alert("저장되었습니다.");
        let selectCategory = document.getElementById('selCate').value;
        if(selectCategory === "add") {
            selectCategory = document.getElementById('addedCategoryName').value;
        }

        let compName = document.getElementById('compName').value;

        let attrVal = [];
        if(attr.length > 0) {
            for (let i = 1; i <= attr.length; i++) {
                attrVal.push({ id: `attr${i}`, name: document.getElementById(`attr${i}`).value, type: document.getElementById(`attr${i}-type`).value, value: document.getElementById(`attr${i}-default`).value });
            }
        }
        
        let flow = reactFlowInstance ? reactFlowInstance.toObject() : {};

        const childCompName = [];
        let id = 1;
        flow.nodes.map((nodes) => {
            childCompName.push({ id: `${id}`, name: `${nodes.data.label}`});
            id++;
        });
        
        const component = {
            "path": { group: "Group", category: selectCategory },
            "componentName": compName,
            "componentType": selectedType,
            // "componentType": selectedNodetype,
            "myData": attrVal,
            "componentData": flow,
            "childData": childCompName,
        }
        axios.post('http://192.168.0.189:5001/nodeData', component)
        .then((response) => {
            // console.log(response.data);
        })
        
        
        // console.log(selectCategory)
        // console.log(compName)
        // console.log(attrVal)
        // console.log(flow)
        // console.log(childCompName)
        // console.log(component)
    };


    const run = () => {
        const flow = reactFlowInstance.toObject();

        axios.post('http://192.168.0.189:5001/flowProcess', {flow})
        .then(
            // axios.get('http://192.168.0.189:5001/flowProcess')
            // .then((response) => {
            //     const inputN = response.data.inputN;
            //     const defaultN = response.data.defaultN;
            //     const outputN = response.data.outputN;

            //     inputN.attr.map((attr) => {
            //         // const attr1 = attr.value
            //         console.log(attr.value)
            //     })
            //     console.log(inputN)
            // })
        );

        console.log(flow);
    };


    // 렌더링 되는 부분
    return (
        <div className='dndflow mt-2'>
            <div className='reactflow-wrapper' ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                    attributionPosition='bottom-right'
                    nodeTypes={nodeType}
                    className='touchdevice-flow'
                    onNodeClick={handleShow}
                >
                    <Nav className='toolBar'>
                        <Nav.Item>
                            <Button title='파일 불러오기' variant="outline-primary" onClick={onRestore}><FontAwesomeIcon icon={faFolderOpen} /></Button>
                        </Nav.Item>
                        <Nav.Item>
                            <Button title='파일로 저장' variant="outline-primary" onClick={onSave}><FontAwesomeIcon icon={faDownload} /></Button>
                        </Nav.Item>
                        <Nav.Item>
                            <Button title='컴포넌트로 추가' variant="outline-primary" onClick={addComponent}><FontAwesomeIcon icon={faPlus} /></Button>
                            <Offcanvas show={showCompAdd} onHide={hideCompAdd} scroll={true} backdrop={true} placement="end">
                                <Offcanvas.Header>
                                    <Offcanvas.Title className='fs-2'>
                                        컴포넌트 노드 추가
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Form.Select id='selCate' className='mb-2' onChange={addCategory}>
                                        <option>Category를 선택하세요.</option>
                                        {props.groupInDir.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                            ))}
                                        <option className='text-center bg-secondary bg-opacity-25' value="add">category 추가</option>
                                    </Form.Select>
                                    <div id="div1" style={{display: "none"}}>
                                        <InputGroup className='mb-2'>
                                            <InputGroup.Text>
                                                카테고리명
                                            </InputGroup.Text>
                                            <Form.Control
                                                id='addedCategoryName'
                                                // onChange={onChangeUsername}
                                            />
                                        </InputGroup>
                                    </div>
                                    <InputGroup className='mb-2'>
                                        <InputGroup.Text>
                                            컴포넌트명
                                        </InputGroup.Text>
                                        <Form.Control
                                            id='compName'
                                            // onChange={onChangeUsername}
                                        />
                                    </InputGroup>
                                    <div className='text-center my-2'>
                                        {['input', 'output', 'default'].map((type) => (
                                            <Form.Check className='me-5' key={type} value={type} inline label={type} name="group1" type="radio" id={type} onChange={selectNodeType} /> 
                                        ))}
                                    </div>
                                    {attr}
                                    <div className='text-center'>
                                        <FontAwesomeIcon onClick={() => {setNumAttr(numAttr+1)}} className='addAttr mt-3' size='xl' color='#ccc' icon={faCirclePlus} />
                                    </div>
                                    <Button className='mt-3 float-end' type='button' onClick={onSaveComponent}>
                                        저장
                                    </Button>
                                </Offcanvas.Body>
                            </Offcanvas>
                        </Nav.Item>
                        <Nav.Item>
                            <Button id='animTrans' className='slideBtn' variant="outline-primary" onClick={run}>Run</Button>
                            <Offcanvas show={show1} onHide={handleClose} scroll={true} backdrop={true} placement="end">
                                <Offcanvas.Header>
                                    <Offcanvas.Title className='fs-2'>
                                        {selectedNode ? nodeData[selectedNode.index].componentName : ""}
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    {selectedNode ? 
                                        nodeData[selectedNode.index].myData.length != 0 ?
                                            <Form.Label htmlFor='myData'>My Attr</Form.Label> :
                                            <Form.Label htmlFor='myData'></Form.Label> :
                                        ""
                                    }
                                    {selectedNode ? nodeData[selectedNode.index].myData.map((data) => (
                                        <InputGroup key={data.id} className='mb-2'>
                                            <InputGroup.Text>
                                                {selectedNode ? data.name : ""}
                                            </InputGroup.Text>
                                            <Form.Control
                                                id='myData'
                                                defaultValue={selectedNode ? data.value : ""}
                                                // ref={usernameInput}
                                                // disabled={selectedNode ? selectedNode.data.username === "" || selectedNode.data.username === undefined ? false : true : false}
                                                // onChange={onChangeUsername}
                                            />
                                        </InputGroup>
                                    )) : ""}
                                    {selectedNode ? 
                                        nodeData[selectedNode.index].childData.length != 0 ?
                                            <Form.Label className='mt-2' htmlFor='childData'>Child</Form.Label> :
                                            <Form.Label className='mt-2' htmlFor='childData'></Form.Label> :
                                        ""
                                    }
                                    {selectedNode ? nodeData[selectedNode.index].childData.map((data) => (
                                        <InputGroup key={data.id} className='mb-2'>
                                            <InputGroup.Text>
                                                {selectedNode ? `${data.id}. ${data.name}` : ""}
                                            </InputGroup.Text>
                                            {/* <Form.Control
                                                id='childData'
                                                defaultValue={selectedNode ? data.default : ""}
                                                // ref={usernameInput}
                                                // disabled={selectedNode ? selectedNode.data.username === "" || selectedNode.data.username === undefined ? false : true : false}
                                                // onChange={onChangeUsername}
                                            /> */}
                                        </InputGroup>
                                    )) : ""}

                                    {/* <Button className='mt-3 float-end' type='button' onClick={updateSelectedNodeData}> */}
                                    <Button className='mt-3 float-end' type='button'>
                                        저장
                                    </Button>
                                    {/* <Button className='me-2 mt-3 float-end' type='button' onClick={modifySelectedNodeData}> */}
                                    <Button className='me-2 mt-3 float-end' type='button'>
                                        수정
                                    </Button>
                                </Offcanvas.Body>
                            </Offcanvas>
                        </Nav.Item>
                    </Nav>

                    <MiniMap
                        nodeStrokeColor={(n) => {
                            if (n.style?.background) return n.style.background;
                            if (n.type === 'input') return '#0041d0';
                            if (n.type === 'output') return '#ff0072';
                            if (n.type === 'default') return '#1a192b';
                    
                            return '#eee';
                            }}
                            nodeColor={(n) => {
                            if (n.style?.background) return n.style.background;
                    
                            return '#fff';
                            }}
                            nodeBorderRadius={2}
                    />

                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
};

export default FlowSpace;