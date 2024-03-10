import React, { useState } from 'react';
import { Button, Card, Container, Form, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { url } from '../util/util';
import axios from 'axios';

function AdminBlogCard({ post }) {
  const token=useSelector((state)=>state.login.token)

  const [showModal, setShowModal] = useState(false);
  const [editedPost, setEditedPost] = useState({ ...post });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    try{
      editedPost.token=token
			axios.put(`${url}/api/admin/blog/${post.id}`,editedPost,{
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			console.log(editedPost);
			setShowModal(false);
		}
		catch(e){
			console.log(e);
		}
  };

  return (
      <Card className='w-75 m-5 p-4 align-self-center'>
        {post?.type === 'video' ? (
          <React.Fragment>
            <iframe
              src={post?.src}
              className='rounded' 
              height={360}
              allow="accelerometer; encrypted-media;"
              ></iframe>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Card.Img src={post?.src}/>
          </React.Fragment>
        )}
        <CardBody post={post}/>
        <Row>
          <Button variant="outline-dark" className='w-25 m-4' onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="danger" className='w-25 m-4' onClick={handleCancel}>
            Cancel
          </Button>
        </Row>
      <EditModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        post={editedPost}
        handleChange={handleChange}
        handleSave={handleSave}
        />
      </Card>
  );
}

function CardBody({post}) {
  return (
    <Card.Body className="mt-3" style={{overflow:"auto"}}>
      <Card.Text>
        {post?.caption}
        <br/><br/>
        <h4 style={{ fontFamily: "Parisienne" }}>By {post?.createdBy}</h4>
      </Card.Text>
    </Card.Body>
  );
}

function EditModal({ show, handleClose, post, handleChange, handleSave }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicContent"className='mt-2'>
            <Form.Label>Caption</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="caption"
              value={post.caption}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicType"className='mt-2'>
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={post.type}
              onChange={handleChange}
            >
              <option value="video">Video</option>
              <option value="image">Image</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBasicSrc"className='mt-2'>
            <Form.Label>Source (URL)</Form.Label>
            <Form.Control
              type="text"
              name="src"
              value={post.src}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='mt-2'>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="outline-dark" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


export default AdminBlogCard;
