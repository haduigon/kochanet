import {
  useEffect,
} from 'react';
import PostElement from '../PostElement';
import React from 'react';
import { useSetCustomParam, useGetCustomParameter, useAppData } from '../../helpers/utils';

const PostList = () => {

  const setCurrentPage = useSetCustomParam()
  const page22 = useGetCustomParameter();
  const currentPage = page22('page') || 1;

  useEffect(() => {
    setCurrentPage('page', '1');
  }, []);

  const results = useAppData(`${currentPage}`)

  const [posts] = results;
  
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
