import Container from 'react-bootstrap/Container';
import SubRedditList from './SubRedditList';
import CardsContainer from '../containers/CardContainer';
import axios from 'axios';
import moment from 'moment';
function Body() {
  const isImage = url => url.match(/\.(jpeg|jpg|png)$/) !== null;

  const subredditIcon = async subName => {
      try {
          const baseUrl = `https://www.reddit.com/${subName}/about.json`;
          const data = await axios.get(baseUrl);
          const dataSimplified = data.data.data.icon_img;

          return dataSimplified;
      } catch (error) {
        console.log(error);
      }
  };

  const formatDate = date => moment.unix(date).fromNow();

  const subredditComments = async link => {
      try {
          const baseUrl = `https://www.reddit.com${link}.json`;
          const data = await axios.get(baseUrl);
          const dataSimplified = data.data[1].data.children;

          return dataSimplified;
      } catch(error) {
          console.log(error);
      }
  }

  return (
    <>
        <Container style={{display: "flex", justifyContent: "space-between"}}>
            <SubRedditList />
            <CardsContainer isImage={isImage} subredditIcon={subredditIcon} formatDate={formatDate} subredditComments={subredditComments} />
        </Container>
    </>
  );
}

export default Body;