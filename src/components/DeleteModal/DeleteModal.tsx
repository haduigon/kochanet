import { useContext } from 'react';
import { StateContext } from '../../context/AppContext';
import { ACTIONS, deletePost, useGetCustomParameter } from '../../helpers/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Post } from '../PostElement/PostElement';

type Props = {
  id: number;
    onClick: (data: boolean) => void
}

const DeleteModal: React.FC<Props> = ({id, onClick}) => {
  const page = useGetCustomParameter();
    const currentPage = page('page') || 1;


    const queryClient = useQueryClient();
  const currentUser = page('userId') || 0;

  const { state, dispatch } = useContext(StateContext);
  function onClose() {
    dispatch({ type: ACTIONS.SET_ERROR_TEXT, payload: '' });
  }

  const { mutateAsync: removePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      const secondKey =
        +currentUser > 0
          ? `?userId=${currentUser}`
          : `?_limit=10&_start=${(+currentPage - 1) * 10}`;
      queryClient.setQueryData(['posts', secondKey], (prevState: any[]) => {
        return prevState.filter((elem) => elem.id !== id);
      });
    },
    onError: (error) => {
      dispatch({ type: ACTIONS.SET_ERROR_TEXT, payload: `${error}` });
    },
  });

  const handleDelete = async () => {
    removePost(id);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold text-red-600">Are you sure?</h2>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => onClick(false)}
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
