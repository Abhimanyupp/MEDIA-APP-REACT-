import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBInput } from 'mdb-react-ui-kit';
import { addCategory, deleteCategory, getAVideo, getCategory, updateCategory } from '../services/allAPI';
import VideoCard from './VideoCard';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function Category() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 const [categoryData,setCategoryData] = useState([])

  const [categoryName,setCategoryName] = useState('')

  console.log(categoryName);

  const handleCategory=async()=>{
    if(categoryName){
      //make an api call
      const reqBody={
        categoryName
      }
      const response = await addCategory(reqBody)
      console.log(response);
      alert("Category added successfully")
      handleClose()
      setCategoryName("")//reset the state
      getCategoryVideos()
    }
    else{
      alert("Please provide a category name")
    }
  }
  const getCategoryVideos=async()=>{
    //make an api call
    const {data}=await getCategory()
    console.log(data);
    setCategoryData(data)
  }
  console.log(categoryData);

  useEffect(()=>{
    getCategoryVideos()
  },[])


  const dragOver=(e)=>{
    console.log("Drag over");
    e.preventDefault()
  }

  const videoDrop=async(e,categoryId)=>{
    console.log("video Dropped at category id of "+ categoryId);
    const videoId= e.dataTransfer.getData("videoId")
    console.log("VideoCardId: " + videoId);
    //api call for particular video
    const {data}=await getAVideo(videoId)
    console.log(data);
    //get category details
    const selectedCategory = categoryData?.find(item=>item.id==categoryId)
    console.log(selectedCategory);
    //video details push to allVidoes array
    selectedCategory.allVideos.push(data)
    //make an api call to update details
    await updateCategory(categoryId,selectedCategory)
    getCategoryVideos()
  }

  const handleDelete=async(id)=>{
    //make an api call
    await deleteCategory(id)
    getCategoryVideos()
  }
  return (
    <div className='text-center'>
      <button onClick={handleShow} className='btn m-5'>Add Category</button>
      <div>

        {
          categoryData.length>0?categoryData.map((item)=>(
                   <div droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item.id)} className='container border border-1 m-4'>

                    <div className='d-flex justify-content-between p-3'>
                      <h3>{item.categoryName}</h3>
                      <button onClick={()=>handleDelete(item.id)} className='btn'><i className='fa-solid fa-trash text-danger'></i>
                      </button>
                    </div>
                    <Row>
                      {
                        item.allVideos.map((data)=>(
                         <Col>
                          <VideoCard displayData={data}/>
                         </Col>
                        ))
                      }
                    </Row>
                   </div>
          )):''
        }
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        {/* <MDBInput label='Category Id' id='formContrlLg' type='text' size='lg' /> */}
        <br />
        <MDBInput onChange={(e)=>setCategoryName(e.target.value)} label='Category Name' id='formContrlLg' type='text' size='lg' />
        <br />
     
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={(e)=>handleCategory()}  variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Category