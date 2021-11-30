import { Markup } from 'interweave'
import Post from './Post'

const PostsList = (props) => {
    return(
        <div style={{marginTop: "3rem"}}>
        { props.posts.map(post => (
            <Post key={post.id} id={post.id} title={post.title} postBody={<Markup content={post.postBody} />} date={post.createdAt} author={post.creator} />
        ))}
        </div>
    )
}

export default PostsList;