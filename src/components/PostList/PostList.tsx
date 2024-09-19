import { useEffect } from 'react';
import PostElement from '../PostElement';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';

export const fetchPost = async ({ queryKey }: any) => {
  const [_key, theEnd] = queryKey;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/`
  );
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
export const fetchPost2 = async () => {
  // const [_key, theEnd] = queryKey;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/`
  );
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const PostList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['post'],
    queryFn: fetchPost,
    // refetchInterval: 60000,
  });

  const data2 = useQuery({ queryKey: ['post']})

  useEffect(() => {
    // fetchPost2().then(res => console.log(res, 'just fetch'))  
  }, [])

    const queryClient = useQueryClient();

      const cachedPosts = queryClient.getQueryData(['post']);

  useEffect(() => {
    if (data) {
      console.log('Data:', data2);
    }
  }, [data, cachedPosts]);

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
