import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector, useDispatch } from 'react-redux';
import store from '../store/store';
import { fetchDefaultPosts } from '../features/defaultPostsSlice';
import { useState, useEffect } from 'react';
import { resetState } from '../features/defaultPostsSlice';

function SubRedditList() {
  const posts = useSelector((state) => state.popularSubreddits.posts);
  const [presentSubreddit, setPresentSubreddit] = useState('');
  const dispatch = useDispatch();
  
  const subredditHandler = (e) => {
    const clickedSubreddit = e.currentTarget.getAttribute("data-value");
    setPresentSubreddit(clickedSubreddit);
  }

  useEffect(() => {
    dispatch(resetState());
    store.dispatch(fetchDefaultPosts(presentSubreddit));
  }, [presentSubreddit]);


  return (
    <>
      <ListGroup style={{width: "20%", margin:20}}>
        <ListGroup.Item data-value={'r/popular'} action onClick={subredditHandler}>
          r/popular
        </ListGroup.Item>
        {posts.map((post, i) => {
          const subredditName = post.data.subreddit_name_prefixed;
          return (
              <ListGroup.Item data-value={subredditName} action key={i} onClick={subredditHandler}>
                {subredditName}
              </ListGroup.Item>
            )
          })
        }
      </ListGroup>
    </>
  );
}

export default SubRedditList;