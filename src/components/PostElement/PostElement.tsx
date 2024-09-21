import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppData, useGetCustomParameter } from '../../helpers/utils';
import { deletePost } from '../../helpers/utils';
import { useContext, useState } from 'react';
import { StateContext } from '../../context/AppContext';
import { ACTIONS } from '../../helpers/utils';
import DeleteModal from '../DeleteModal';

export type Post = {
  data2: {
    body: string;
    id: number;
    title: string;
    userId: number;
  };
};

const PostElement: React.FC<Post> = ({ data2 }) => {
  const page = useGetCustomParameter();
  const currentPage = page('page') || 1;
  const queryClient = useQueryClient();
  const currentUser = page('userId') || 0;
  const users = useAppData();
  const [showConfirm, setShowConfirm] = useState(false);

  const { dispatch } = useContext(StateContext);

  function handleModal() {
    dispatch({ type: ACTIONS.SET_SHOW_MODAL, payload: true });
    dispatch({ type: ACTIONS.SET_SELECTED_POST, payload: data2 });
  }
  const { mutateAsync: removePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      const secondKey =
        +currentUser > 0
          ? `?userId=${currentUser}`
          : `?_limit=10&_start=${(+currentPage - 1) * 10}`;
      queryClient.setQueryData(['posts', secondKey], (prevState: any[]) => {
        return prevState.filter((elem) => elem.id !== data2.id);
      });
    },
    onError: (error) => {
      dispatch({ type: ACTIONS.SET_ERROR_TEXT, payload: `${error}` });
    },
  });

  // const handleDelete = async () => {
  //   removePost(data2.id);
  // };

  if (users[1].isLoading) return <p>Loading...</p>;
  if (users[1].error) return <p>Error: {users[1].error.message}</p>;

  const author = queryClient.getQueryData<{ id: number; name: string }[]>([
    'users',
  ]);
  const copy: { id: number; name: string; username: string }[] = [
    ...(author as []),
  ];

  const author3: { name: string; username: string; id: number } | undefined =
    copy.find((elem: { id: number }) => elem.id === data2.userId);
  return (
    <div>
      {showConfirm && <DeleteModal id={data2.id} onClick={setShowConfirm}/>}
      <div className=""></div>
      <div className="ml-2 mr-2 mt-2 flex items-center justify-between">
        <div className="flex-column items-center justify-between w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
          <div className="ml-2 flex">
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600"
            >
              Delete post
            </button>

            <button
              onClick={handleModal}
              className="ml-2 bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600"
            >
              Update post
            </button>
          </div>
          <div className="ml-1 mr-1 block text-center font-medium leading-6 text-gray-900">
            {data2.title}
          </div>
          <div className="ml-1 mr-1 block text-center font-medium leading-6 text-gray-900">
            {data2.id}
          </div>
          <div className="ml-1 mr-1 block text-center mt-10 font-medium leading-6 text-gray-900">
            {author3 && author3.name} + {author3 && author3.username}
            {data2.userId} User Id
          </div>
          <div className="ml-1 mr-1 block text-center mt-10 font-medium leading-6 text-gray-900">
            {data2.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostElement;
