import { useEffect } from 'react';
import PostList from '../../components/PostList';

const PostPage = () => {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);
  return <div>
    <PostList />
  </div>;
};

export default PostPage;
