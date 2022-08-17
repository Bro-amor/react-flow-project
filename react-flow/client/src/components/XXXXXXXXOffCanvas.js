// import React, { useCallback, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Offcanvas from 'react-bootstrap/Offcanvas';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

// function OffCanvas({ name, ...props }) {
//   const [show, setShow] = useState(false);

//   // const handleClose = () => setShow(false);

//   const toggleShow = () => {
//     const element1 = document.getElementById("animTrans");
//     const element2 = document.getElementById("animRotate");
//     if(show) {
//       element1.classList.remove("slideBtnAnim");
//       element2.classList.remove("rotateIcon");
//     }else {
//       element1.classList.add("slideBtnAnim");
//       element2.classList.add("rotateIcon");
//     }
//     setShow((s) => !s);
//   };

//   // const show = props.show;
//   // const handleClose = () => {
//   //   props.test1();
//   // }
//   // const toggleShow = () => {
//   //   props.test2();
//   //   console.log(props.show)
//   // }

  

//   return (
//     <div>
//         <Button id='animTrans' className='slideBtn' variant="outline-primary" onClick={toggleShow}><FontAwesomeIcon id='animRotate' icon={faAnglesLeft} /></Button>
//         {/* <Button id='animTrans' className='slideBtn' variant="outline-primary" onClick={() => props.toggleShow()}><FontAwesomeIcon id='animRotate' icon={faAnglesLeft} /></Button> */}
//         <Offcanvas show={show} {...props}>
//         {/* <Offcanvas show={props.show} onHide={() => props.handleClose()} {...props}> */}
//             <Offcanvas.Header>
//                 <Offcanvas.Title>Offcanvas</Offcanvas.Title>
//             </Offcanvas.Header>
//             <Offcanvas.Body>
//                 Some text as placeholder. In real life you can have the elements you
//                 have chosen. Like, text, images, lists, etc.
//             </Offcanvas.Body>
//       </Offcanvas>
//     </div>
//   );
// }

// export default OffCanvas;