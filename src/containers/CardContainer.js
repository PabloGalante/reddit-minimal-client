import Card from '../components/Card';
import { useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

function CardContainer(props) {    
    const posts = useSelector((state) => state.defaultPosts.posts);
    const status = useSelector((state) => state.defaultPosts.status);

    return (
        <>
            <div style={{display: 'block', width:'85%'}}>
                {
                    status === 'loading' ? <Spinner animation="border" role="status"/> : 
                        status === 'succeeded' ? posts.map((post, i) => <Card posts={post} key={i} isImage={props.isImage} subredditIcon={props.subredditIcon} formatDate={props.formatDate} subredditComments={props.subredditComments} />) : <h1>Error</h1>
                }
            </div>
        </>
    )
}

export default CardContainer;