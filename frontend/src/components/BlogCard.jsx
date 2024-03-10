import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { url } from '../util/util';

function BlogCard({ post }) {
  const token=useSelector((state)=>state.login.token)
  const [liked,setLiked]=useState(post.liked);

  const toggleLike = () => {
    try{
      axios.put(`${url}/api/user/like`,{
        "token":token,
        "blogId":post.id
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setLiked(!liked);
    }
    catch(e){
      console.log(e);
    }
  }

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
        <Button className='w-25 m-3' onClick={toggleLike} variant={liked ? 'danger' : 'outline-danger'}>
           {liked ? '❤ Liked' : '🤍 Like'}
         </Button>
        </Row>
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




export default BlogCard;
