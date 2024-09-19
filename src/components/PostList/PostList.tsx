import { useEffect } from 'react';
import PostElement from '../PostElement';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const fetchPost = async ({ queryKey }: any) => {
  const [_key, theEnd] = queryKey;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${theEnd}`
  );
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const PostList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['post', '?_limit=10&_start=10'],
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
      {data.map((post: { body: string; id: number; title: string; userId: number; }) => {
        return (
          <React.Fragment key={post.id}>
            <PostElement data2={post} />
          </React.Fragment>
        )
      })}
    </div>
  );
};

export default PostList;
