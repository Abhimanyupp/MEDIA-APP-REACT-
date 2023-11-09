import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { uploadVideo } from '../services/allAPI';

function Add({setuploadVideoServerResponse}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //to hold the video details
  const[video,setVideo]=useState({

    id:"",
    caption:"",
    url:"",
    embedLink:""


  });
  console.log(video);


  const getEmbedLink =(e)=>{
    const {value}=e.target
    if(value){
      console.log(value.slice(-31));
      const link=`https://www.youtube.com/embed/${value.slice(-31)}`
      setVideo({...video,embedLink:link})
    }
    else{
      setVideo({...video,embedLink:""})
    }
  }

const handleAdd=async()=>{
  const {id,caption,url,embedLink}=video
  if(!id||!caption||!url||!embedLink){
    alert("Please enter valid details")
  }
  else{
    //make an api call to add video details to db.json file
        const response = await uploadVideo(video)
        console.log(response);
        if(response.status>=200 && response.status<300){
          setuploadVideoServerResponse(response.data)
          alert(`${response.data.caption} Added Successfully`)
          handleClose()
        }
        else{
          alert("Please Enter a Valid Id")
        }
  }
}



  return (
    <div>
      <Row>
      <Row className='container'>
            <Col xl={6} className='text-center d-flex justify-content-center m-5' >
                <h4>Upload Video</h4>
                <MDBBtn onClick={handleShow} className='btn  mx-4'><i class="fa-solid fa-plus"></i></MDBBtn>
            </Col>
            <Col className='text-center' xl={4}>
            <h4></h4>
            </Col>
        </Row>
  

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <div className='p-3' >
          <MDBInput onChange={(e)=>setVideo({...video,id:e.target.value})} label='Video Id' id='form1' size='lg' type='text' />
          </div>

          <div className='p-3' >
          <MDBInput  onChange={(e)=>setVideo({...video,caption:e.target.value})} label='Video Caption' id='form1' size='lg' type='text' />
          </div>


          <div className='p-3' >
          <MDBInput onChange={(e)=>setVideo({...video,url:e.target.value})} label='Video Image URL' id='form1' size='lg' type='text' />
          </div>

          <div className='p-3' >
          <MDBInput label='Video Link' onChange={getEmbedLink} id='form1' size='lg' type='text' />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAdd} variant="primary" >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      </Row>


    </div>
  )
}

export default Add