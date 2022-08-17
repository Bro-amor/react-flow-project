import { useCallback } from 'react';
import { Handle } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function CustomInputNode(props) {
    
    return (
        <div className='customNode'>
            <Handle type='source' position='top' />
            <div className='nodeLabel'>
                {props.data.label}
            </div>
            {['right'].map((placement) => (
                <OverlayTrigger
                key={placement}
                placement={placement}
                overlay={
                    <Tooltip id={`tooltip-${placement}`}>
                        {props.data.attr.map((attr) => (
                            <div key={attr.id}>{attr.name} : {attr.value}</div>
                        ))}
                    </Tooltip>
                }
                >
                    <FontAwesomeIcon icon={faCircleInfo} color="#000099" size='sm' className='detailBtn' />
                </OverlayTrigger>
            ))}
        </div>
    );
}

export default CustomInputNode;