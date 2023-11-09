import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Add from '../Components/Add';
import { Link } from 'react-router-dom';
import View from '../Components/View'
import Category from '../Components/Category'
function Home() {

//create a state for state lifting (in parent component)
const [uploadVideoServerResponse,setuploadVideoServerResponse]=useState({})

  return (
    <div>
        <Row className='container'>
          <Col>
          <Add setuploadVideoServerResponse={setuploadVideoServerResponse}/>
          </Col>
            <Col className='text-center' xl={4}>
              <Link  to={'/watch-history'}>
              <h4 className='text-dark'>Watch History</h4>
              </Link>
            
            </Col>
        </Row>
        <Row>
          <Col className='m-5'>
          <h3 className='text-center'>View All Videos</h3>
          <View uploadVideoServerResponse={uploadVideoServerResponse}/>
          </Col>
          <Col className='m-5'>
          <h3 className='text-center'>Add Category</h3>
         <Category/>
          </Col>
        </Row>
    </div>
  )
}

export default Home