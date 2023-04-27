import Button from 'react-bootstrap/Button';
import Cards from 'react-bootstrap/Card';
import subredditDefaultImg from '../resources/images/reddit.svg';
import { useState, useEffect } from 'react';

function Card(props) {
  const propsData = props.posts.data;
  const [subredditIconUrl, setSubredditIconUrl] = useState('');
  const [commentDisplay, setCommentDisplay] = useState(false);
  const [commentsValue, setCommentsValue] = useState(null);

  async function setIcon() {
    const value = await props.subredditIcon(propsData.subreddit_name_prefixed);
    setSubredditIconUrl(value);
  };

  async function handleComments() {
    if(commentDisplay){
      setCommentDisplay(!commentDisplay);
    } else {
      const value = await props.subredditComments(propsData.permalink);
      setCommentsValue(value);
      setCommentDisplay(!commentDisplay);
    }
  };
  
  useEffect(() => {
    setIcon();
  });

  return (
    <>
      <Cards style={{margin:20}}>
        <Cards.Header as="h3" style={{display:'flex', justifyContent:'space-between'}}>
          <div style={{fontSize: '1rem', margin:'auto 0', width:'30%', textAlign:'left'}}>
            <Cards.Img variant="top" src={subredditIconUrl ? subredditIconUrl : subredditDefaultImg} style={{width:50, height:50, borderRadius:"50%"}} alt="" />
            <Button variant="link" target="_blank" href={`https://www.reddit.com/${propsData.subreddit_name_prefixed}`}>{`${propsData.subreddit_name_prefixed}`}</Button>
          </div>
          <div style={{fontSize: '1rem', margin:'auto 0', width:'30%', textAlign:'center'}}>
            <p style={{margin: 'auto 0'}}>{`Posted: ${props.formatDate(propsData.created)}`}</p>
          </div>
          <div style={{fontSize: '1rem', margin:'auto 0', width:'30%', textAlign:'right'}}>
            Author:
            <Button variant="link" target="_blank" href={`https://www.reddit.com/user/${propsData.author}`}>{`u/${propsData.author}`}</Button>
          </div>
        </Cards.Header>
        <Cards.Body>
          <Cards.Title>{propsData.title}</Cards.Title>
          <Cards.Text>
            {props.isImage(propsData.url) ? <img src={propsData.url} alt={"subrredit"} style={{width:'100%', height:'100%'}} /> : <></> }
          </Cards.Text>
        </Cards.Body>
        <Cards.Footer id='postFooter'>
          <Button variant="light" onClick={handleComments}>{commentDisplay ? 'Hide Comments' : 'Show Comments'}</Button>
          {commentDisplay ? commentsValue.map((comment) => {
            return (
              <>
                <Cards.Body style={{boxShadow: '0px 10px 5px 0px rgba(186,186,186,0.75)', margin:10}}>
                  <Cards.Title>{comment.data.author}</Cards.Title>
                  <Cards.Text>{comment.data.body}</Cards.Text>
                </Cards.Body>
              </>
            )
          }) : null
          }
        </Cards.Footer>
      </Cards>
    </>
  );
}

export default Card;