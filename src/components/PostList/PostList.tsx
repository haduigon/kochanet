import {
  useContext,
  useEffect,
} from 'react';
import PostElement from '../PostElement';
import React from 'react';
import { useSetCustomParam, useGetCustomParameter, useAppData } from '../../helpers/utils';
import ChangePostForm from '../ChangePostForm';
import { StateContext } from '../../context/AppContext';

const PostList = () => {

  const setCurrentPage = useSetCustomParam()
  const page = useGetCustomParameter();
  const currentPage = page('page') || 1;
  const currentUser = page('userId') || 0;
    const { state } = useContext(StateContext);

  useEffect(() => {
    setCurrentPage('page', '1');
    setCurrentPage('userId', '0');
  }, []);

  const results = useAppData(
    +currentUser === 0
      ? `?_limit=10&_start=${10 * (+currentPage - 1)}`
      : `?userId=${currentUser}`
  );

  const [posts] = results;
 
  function handlePage() {
    setCurrentPage('page', String(+currentPage + 1))
  }

  if (posts.isLoading) return <p>Loading...</p>;
  if (posts.error) return <p>Error: {posts.error.message}</p>;
  return (
    <div>
      {state.showModal && <ChangePostForm  />}
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
