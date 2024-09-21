import { useContext, useState } from 'react';
import Input from '../Input';
import {
  patchPost,
  useGetCustomParameter,
  ACTIONS,
  updatePost,
} from '../../helpers/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { StateContext } from '../../context/AppContext';

const ChangePostForm = () => {
  const { state, dispatch } = useContext(StateContext);

  const originalTitle = state.selectedPost.title;
  const originalBody = state.selectedPost.body;

  const [title, setTitle] = useState(originalTitle);
  const [body, setBody] = useState(originalBody);
  const page = useGetCustomParameter();
  const currentPage = page('page') || 1;
  const queryClient = useQueryClient();
  const currentUser = page('userId') || 0;

  const detectChanges = () => {
    let changedFields = [];

    if (title !== originalTitle) {
      changedFields.push('title');
    }

    if (body !== originalBody) {
      changedFields.push('body');
    }

    return changedFields;
  };

  const { mutateAsync: patchPost2 } = useMutation({
    mutationFn: patchPost,
    onSuccess: () => {
      const secondKey =
        +currentUser > 0
          ? `?userId=${currentUser}`
          : `?_limit=10&_start=${(+currentPage - 1) * 10}`;
      queryClient.setQueryData(['posts', secondKey], (prevState: any[]) => {
        return prevState.map((post) =>
          post.id === state.selectedPost.id ? { ...post, title, body } : post
        );
      });
    },
    onError: (error) => {
      dispatch({ type: ACTIONS.SET_ERROR_TEXT, payload: `${error}` });
    },
  });

  const { mutateAsync: updatePost2 } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      const secondKey =
        +currentUser > 0
          ? `?userId=${currentUser}`
          : `?_limit=10&_start=${(+currentPage - 1) * 10}`;
      queryClient.setQueryData(['posts', secondKey], (prevState: any[]) => {
        return prevState.map((post) =>
          post.id === state.selectedPost.id ? { ...post, title, body } : post
        );
      });
    },
    onError: (error) => {
      dispatch({ type: ACTIONS.SET_ERROR_TEXT, payload: `${error}` });
    },
  });

  const handlePatch = async () => {
    const changes = detectChanges();
    if (title.length === 0 || body.length === 0) {
      dispatch({ type: ACTIONS.SET_ERROR_TEXT, payload: `Any filed cant be empty` });
      throw Error('Any filed cant be empty');
    }
    if (changes.length === 1) {
      patchPost2({
        id: `${state.selectedPost.id}`,
        name: changes[0] as 'title' | 'body',
        value: changes[0] === 'title' ? title : body,
      });
    } else {
      updatePost2({
        id: `${state.selectedPost.id}`,
        title: title,
        body: body,
      });
    }
    dispatch({ type: ACTIONS.SET_SHOW_MODAL, payload: false });
  };

  return (
    <div
      className="w-full absolute top-4 left-1/2 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl bg-white shadow-lg p-6 rounded-lg ring-1 ring-gray-300 z-50 transform -translate-x-1/2"
    >
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
        className="mt-2 ml-2 bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600"
      >
        Update post
      </button>
      <button
        onClick={() => dispatch({ type: ACTIONS.SET_SHOW_MODAL, payload: false })}
        className="mt-2 ml-2 bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600"
      >
        Cancel
      </button>
    </div>
  );
};
export default ChangePostForm;
