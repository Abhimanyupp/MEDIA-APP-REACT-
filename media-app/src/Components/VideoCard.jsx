import React, { useEffect } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteAVideo, getAllVideo, watchVideoHistory } from "../services/allAPI";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

function VideoCard({ displayData,setdeleteVideoStatus}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async() =>{
    setShow(true)
    //make an api call to get the video watch history
    const {caption,embedLink}=displayData

    //date and time
    let today = new Date()
    // console.log(today);
    const timestamp =
    new Intl.DateTimeFormat('en-us',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(today);
    console.log(timestamp);//11/07/2023 , 09:43:46 AM
    
    let videoDetails = {
      caption,
      embedLink,
      timestamp
    }

    await watchVideoHistory(videoDetails)
  }



  //deleteing a video
  const deleteVideo=async(id)=>{
    //make an api call
    const response = await deleteAVideo(id)
    console.log(response);
    setdeleteVideoStatus(true)
  }

  const dragStarted=(e,id)=>{
    console.log("Drag started"+id,e);
    e.dataTransfer.setData("VideoId",id)//Data transfer
   }
  return (
    <div>
      <Row>
        <Col xl={6} className="p-3">
          <MDBCard draggable onDragStart={(e)=>dragStarted(e,displayData?.id)} style={{ width: "300px", height: "300px" }} className="p-3">
            <MDBCardImage
              onClick={handleShow}
              style={{ width: "100%", height: "200px" }}
              src={displayData.url}
              position="top"
              alt="..."
            />
            <MDBCardBody className="d-flex justify-content-center">
              <h6>
                <MDBCardTitle>{displayData.caption}</MDBCardTitle>
              </h6>

              <p className="btn ms-5" href="#">
                <i onClick={()=>deleteVideo(displayData.id)} className="fa-solid fa-trash fa-2xs fs-6"></i>
              </p>
            </MDBCardBody>
          </MDBCard>
        </Col>

        <Col></Col>

        <Col></Col>
      </Row>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{displayData.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            style={{ borderRadius: "20px" }}
            width="430"
            className="m-3 p-2"
            height="315"
            src={displayData.embedLink}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VideoCard;
