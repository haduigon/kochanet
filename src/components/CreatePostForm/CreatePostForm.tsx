import { useContext, useState } from 'react';
import Input from '../Input';
import {
  useGetCustomParameter,
  ACTIONS,
  createPost,
} from '../../helpers/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StateContext } from '../../context/AppContext';

const CreatePostForm = () => {
  const { state, dispatch } = useContext(StateContext);

  const originalTitle = state.selectedPost.title;
  const originalBody = state.selectedPost.body;

  const [title, setTitle] = useState(originalTitle);
  const [body, setBody] = useState(originalBody);
  const page = useGetCustomParameter();
  const currentPage = page('page') || 1;
  const queryClient = useQueryClient();
  const currentUser = page('userId') || 0;

  const [localTrigger, setLocalTragger] = useState(false);

  const newP = {
    title: title,
    body: body,
    id: '101',
  };
  const { mutateAsync: addPost } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      const secondKey =
        +currentUser > 0
          ? `?userId=${currentUser}`
          : `?_limit=10&_start=${(+currentPage - 1) * 10}`;
      queryClient.setQueryData(['posts', secondKey], (prevState: any[]) => {
        return [newP, ...prevState];
      });
    },
    onError: (error) => {
      dispatch({ type: ACTIONS.SET_ERROR_TEXT, payload: `${error}` });
    },
  });

  const handlePatch = async () => {
    if (title.length === 0 || body.length === 0) {
      dispatch({ type: ACTIONS.SET_ERROR_TEXT, payload: `Any filed cant be empty` });
      throw Error('Any filed cant be empty');
    }
    addPost(newP);

    dispatch({ type: ACTIONS.SET_NEW_POST, payload: false });
  };

  console.log(state.newPost);
  

  return (
    <div className="absolute top-4 left-2 bg-white w-full">
      <Input
        name="title"
        type="text"
        onChange={setTitle}
        value={state.selectedPost.title}
      />
      <Input
        name="body"
        type="text"
        onChange={setBody}
        value={state.selectedPost.body}
      />
      <Input name="post id" type="number" value={`${state.selectedPost.id}`} />

      <button
        onClick={handlePatch}
        className="ml-2 bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600"
      >
        Add post
      </button>
      <button
        onClick={() => dispatch({ type: ACTIONS.SET_NEW_POST, payload: false })}
        className="ml-2 bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600"
      >
        Cancel
      </button>
    </div>
  );
};
export default CreatePostForm;
