import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import { getAllVideos } from '../services/allAPI'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'




function View({uploadVideoServerResponse}) {
  const[allVideos,setallVideo]=useState([])

  const [deleteVideoStatus,setdeleteVideoStatus]=useState(false)

  const getVideo=async()=>{
const {data}=await getAllVideos();
console.log(data);
setallVideo(data)

  }
  console.log(allVideos);

  useEffect(()=>{
    getVideo ()
    setdeleteVideoStatus(false)
  },[uploadVideoServerResponse,deleteVideoStatus])


  return (
    <div>

      <Row>
      {
    allVideos.length>0? allVideos?.map((item)=>(
      <Col sm={12} lg={6} xl={6}>
        <VideoCard displayData={item} setdeleteVideoStatus={setdeleteVideoStatus}/>
        
      </Col>

    )):"Nothing to display"
     
      }

      </Row>
    
   

    </div>
  )
}

export default View