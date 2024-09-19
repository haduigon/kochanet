import { useEffect } from "react";
import PostElement from "../PostElement";
import { useQuery } from '@tanstack/react-query';

const fetchPost = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const PostList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['post', 1],
    queryFn: fetchPost,
    refetchInterval: 60000,
});

  // console.log(data, 'data');
    useEffect(() => {
    if (data) {
      console.log('Data:', data);
    }
  }, [data]);
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <PostElement data={data} />
    </div>
  )
}

export default PostList;