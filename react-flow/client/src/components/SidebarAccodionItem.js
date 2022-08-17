import React, { useRef, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

const SidebarAccodionItem = (props) => {

    const [category, setCategory] = useState("");
    // const [componentNode, setComponentNode] = useState({});


    const onDragStart = async (event) => {
        axios.post('http://192.168.0.189:5001/nodeData/componentPath', {
            path: { category: category, file: event.target.innerText }
        })
        .then((response) => {
            // console.log(response.data)
        })
    };
    // const onDragStart = async (event) => {
    //     var component = {};

    //     // 저장되어있는 컴포넌트(부모노드) 정보 읽어오기
    //     // (읽어와서 노드 생성은 드래그 드랍에서?)
    //     axios.get('http://192.168.0.189:5001/nodeData/componentNodeData', {
    //         params: {
    //             componentNodePath: `./Group/${category}/${event.target.innerText}.json`
    //         }
    //     })
    //     .then((response) => {
    //         props.getComponentNode(JSON.parse(response.data));
            
    //         component = {...JSON.parse(response.data)};
    //         console.log(component.componentData.nodes[0].type)

    //         // event.dataTransfer.setData('application/reactflow', component.componentData.nodes[0].type);
    //         // event.dataTransfer.setData('text', event.target.innerText);
    //         // event.dataTransfer.effectAllowed = 'move';
            
    //     })
        
    //     // await event.dataTransfer.setData('application/json', component);
    //     // await event.dataTransfer.setData('application/reactflow', component);
    //     event.dataTransfer.setData('application/reactflow', "customDefaultNode");
    //     // event.dataTransfer.setData('text', componentNode.componentName);
    //     event.dataTransfer.setData('text', event.target.innerText);
    //     event.dataTransfer.effectAllowed = 'move';
    // };


    // Catagory(input, output, ...) 디렉토리 안에 있는 디렉토리
    const [catagoryInDir, setCatagoryInDir] = useState([]);


    const getComponentList = (event) => {

        setCategory(event.target.innerText);
        // const category = event.target.innerText;

        // Catagory 안에 디렉토리 읽어오는 기능
        axios.get('http://192.168.0.189:5001/getFolderList', {
            params: {
                path: `./Group/${event.target.innerText}`
            }
        })
        .then((response) => {
            const noExtension = response.data.folderList.map((filename) => (filename.trim().replace(".json", "")));
            setCatagoryInDir(noExtension);
        });
    };


    return (
        <div>
            {props.groupInDir.map((category) => (
                <Accordion.Item key={category} eventKey={category}>
                    <Accordion.Header onClick={getComponentList}>{category}</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup>
                            {catagoryInDir.map((component) => (
                                <ListGroup.Item key={component} className='dndnode' onDragStart={(event) => onDragStart(event)} draggable>{component}</ListGroup.Item>
                                // <ListGroup.Item key={component} className='dndnode' onDragStart={(event) => onDragStart(event, 'customDefaultNode')} draggable>{component}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </div>
    );
};

export default SidebarAccodionItem;