import { useSearchParams } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';

export const useAppData = (urlEnd: string = `?_limit=10&_start=0`) => {
  return useQueries({
    queries: [
      {
        queryKey: ['posts', urlEnd],
        queryFn: fetchPost,
        refetchInterval: 60000,
        staleTime: 60000,
      },
      {
        queryKey: ['users'],
        queryFn: fetchUsers,
      },
      {
        queryKey: ['userPosts', urlEnd],
        queryFn: fetchUsersPosts,
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

export const fetchUsersPosts = async ({ queryKey }: any) => {
  const [_key, userId] = queryKey;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const createPost = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete post');
  }

  const resp = await response.json();
  // console.log(resp);
  
  return resp;
};

export const patchPost = async ({ name, value, id }: {
  name: 'title' | 'body'; value: string, id: string
}) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      [name]: value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });


  if (!response.ok) {
    throw new Error('Failed to delete post');
  }

  const resp = await response.json();
  console.log(resp, 'patchpost');
  
  return resp;
};

export const updatePost = async ({ title, body, id }: {
  title: string; body: string, id: string
}) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: title,
      body: body,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });


  if (!response.ok) {
    throw new Error('Failed to delete post');
  }

  const resp = await response.json();
  console.log(resp, 'patchpost');
  
  return resp;
};

export enum ACTIONS {
  SET_SHOW_MODAL,
  SET_SELECTED_POST,
}