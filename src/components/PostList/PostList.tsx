import { useEffect, useState } from 'react';
import PostElement from '../PostElement';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useSearchParams } from "react-router-dom";
import { fetchPost, fetchUsers, useSetCustomParam, useGetCustomParameter } from '../../helpers/utils';

const PostList = () => {

  const setCurrentPage = useSetCustomParam()
  const page22 = useGetCustomParameter();
  const currentPage = page22('page') || 1;

  

  // console.log(page22('page'),'page22');
  
  useEffect(() => {
    setCurrentPage('page', '1');
  }, [])
  const results = useQueries({
    queries: [
      {
        queryKey: ['post', `?_limit=10&_start=${+currentPage * 10}`],
        queryFn: fetchPost,
        refetchInterval: 60000,
      },
      {
        queryKey: ['users'],
        queryFn: fetchUsers,
      },
    ],
  });

  const [posts, users] = results;
  console.log(posts, users, 'posts & users');
  
  function handlePage() {
    setCurrentPage('page', String(+currentPage + 1))
  }

  if (posts.isLoading) return <p>Loading...</p>;
  if (posts.error) return <p>Error: {posts.error.message}</p>;
  return (
    <div>
      {posts.data.map(
        (post: { body: string; id: number; title: string; userId: number }) => {
          return (
            <React.Fragment key={post.id}>
              <PostElement data2={post} />
            </React.Fragment>
          );
        }
      )}

      <div>
        <button
          onClick={handlePage}
          className="bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600"
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default PostList;
