import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetCustomParameter } from '../../helpers/utils';
import { deletePost } from '../../helpers/utils';

type Props = {
  data2: {
    body: string;
    id: number;
    title: string;
    userId: number;
  };
};

const PostElement: React.FC<Props> = ({ data2 }) => {
  const page = useGetCustomParameter();
  const currentPage = page('page') || 1;
  const queryClient = useQueryClient();
  const currentUser = page('userId') || 0;


  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      console.log('success');
      const secondKey = +currentUser > 0 
        ? `?userId=${currentUser}`
        : `?_limit=10&_start=${(+currentPage - 1) * 10}`
      queryClient.setQueryData(
        ['posts', secondKey],
        (prevState: any[]) => {
          console.log(prevState);
          
          return prevState.filter(elem => elem.id !== data2.id);
        }
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
