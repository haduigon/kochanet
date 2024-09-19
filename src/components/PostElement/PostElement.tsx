import { useQuery } from '@tanstack/react-query';
import { fetchPost } from '../PostList/PostList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchPost2 } from '../PostList/PostList';

type Props = {
  data2: {
    body: string;
    id: number;
    title: string;
    userId: number;
  };
};

const deletePost = async (postId: number) => {
  console.log(postId, 'post element delete post func');

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete post');
  }

  const result = await response.json();
  // console.log('Department deleted:', result);

  return postId;
};

const PostElement: React.FC<Props> = ({ data2 }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSettled: (data: any, error: any, variables: any, context: any) => {
      // console.log(data, error, variables, context, 'datasettled post elem');
      queryClient.setQueryData(
        ['post'],
        [
          {
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
            id: 1,
            title:
              'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            userId: 1,
          },
        ]
      );
    },
  });


  const handleDelete = () => {
    mutation.mutate(data2.id);
  };

  return (
    <div>
      <div className=""></div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex-column items-center justify-between w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
          <div className="block text-center font-medium leading-6 text-gray-900">
            {data2.title}
          </div>
          <div className="block text-center font-medium leading-6 text-gray-900">
            {data2.id}
          </div>
          <div className="block text-center mt-10 font-medium leading-6 text-gray-900">
            {data2.body}
          </div>

          <button
            onClick={handleDelete}
            className="bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600"
          >
            Delete post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostElement;
