import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';

import SidebarAccodionItem from './SidebarAccodionItem';

const Sidebar = (props) => {


    return (
        <div className='sideBarWrapper mt-2'>
            <Row>
                <Col>
                    <div className='title pt-4'>Test Flow Layer</div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Accordion>
                        <SidebarAccodionItem groupInDir={props.groupInDir} getComponentNode={props.getComponentNode} />
                    </Accordion>
                </Col>
            </Row>
        </div>
    );
};

export default Sidebar;