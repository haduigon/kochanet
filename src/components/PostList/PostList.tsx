import { useEffect } from 'react';
import PostElement from '../PostElement';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { queries } from '@testing-library/react';

export const fetchPost = async ({ queryKey }: any) => {
  const [_key, theEnd] = queryKey;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${theEnd}`
  );
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const fetchUsers = async ({ queryKey }: any) => {
  const [_key, theEnd] = queryKey;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users`
  );
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const PostList = () => {

  const results = useQueries({
    queries: [{
      queryKey: ['post', '?_limit=10&_start=10'],
      queryFn: fetchPost,
      refetchInterval: 60000
    },
      {
        queryKey: ['users'],
        queryFn: fetchUsers,
    }]
  });
  
  const [posts, users] = results;
  console.log(posts, users, 'posts & users');
  
  if (posts.isLoading) return <p>Loading...</p>;
  if (posts.error) return <p>Error: {posts.error.message}</p>;
  return (
    <div>
      {posts.data.map((post: { body: string; id: number; title: string; userId: number; }) => {
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
