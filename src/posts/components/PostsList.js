import { Markup } from "interweave";
import Post from "./Post";

const PostsList = (props) => {
  return (
    <>
      {props.posts.map((post) => (
        <Post
          key={post._id || post.id}
          id={post._id || post.id}
          title={post.title}
          postBody={<Markup content={post.postBody} />}
          comments={post.comments}
          date={post.createdAt}
          author={`${post.creatorID.firstName} ${post.creatorID.lastName}`}
          creator={post.creatorID}
          callback={props.callback}
        />
      ))}
    </>
  );
};

export default PostsList;
