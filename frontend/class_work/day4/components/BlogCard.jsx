import React,{useState} from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import lakeVid from '../assets/videos/4783980_Great Britain_London_UK_1920x1080.mp4';
import fishingpic from '../assets/images/fishing.jpg';

function BlogCard({ post}) {
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
      setLiked(!liked);
    };

  return (
    <Container  className="w-75 m-5">
      <Card>
        {post?.type === 'video' ? (
          <React.Fragment>
            <iframe
              className="w-100 rounded"
              height={350}
              src={lakeVid}
              allow="accelerometer; encrypted-media;"
            ></iframe>
            <CardBody />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Card.Img src={fishingpic} />
            <CardBody />
          </React.Fragment>
        )}
        <Button className='w-25 m-3' onClick={toggleLike} variant={liked ? 'danger' : 'outline-danger'}>
          {liked ? '❤ Liked' : '🤍 Like'}
        </Button>
      </Card>
    </Container>
  );
}

function CardBody() {
  return (
    <Card.Body>
      <Card.Text>
      <h4 style={{fontFamily:"Parisienne"}}>Ashizuki says: </h4>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </Card.Text>
    </Card.Body>
  );
}

// BlogCard.propTypes = {
//   post: PropTypes.shape({
//     type: PropTypes.oneOf(['video', 'image']),
//   }),
// };

export default BlogCard;
