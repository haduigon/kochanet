import { useSearchParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';

export const useAppData = (
  urlEnd: string = `?_limit=10&_start=0`
) => {
  console.log(urlEnd, 'urlEnd utils');
  
  return useQueries({
    queries: [
      {
        queryKey: ['post', urlEnd],
        queryFn: fetchPost,
        refetchInterval: 60000,
      },
      {
        queryKey: ['users'],
        queryFn: fetchUsers,
      },
    ],
  });
};

export function useSetCustomParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  return function setParameter(parameter: string, value: string) {
    params.set(parameter, value);
    setSearchParams(params);
  };
}

export function useGetCustomParameter() {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  return function getParameter(parameter: string) {
    const customParam = params.get(parameter) || null;
    return customParam;
  };
}

export const fetchPost = async ({ queryKey }: any) => {
  const [_key, theEnd] = queryKey;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${theEnd}`
  );
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const deletePost = async (postId: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete post');
  }

  return postId;
};

export const fetchUsersPosts = async (userId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}