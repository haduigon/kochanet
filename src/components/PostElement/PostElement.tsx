import { useQuery } from '@tanstack/react-query';
import { fetchPost } from '../PostList/PostList';

type Props = {
  data2: {
    body: string;
    id: number;
    title: string;
    userId: number;
  };
};

const PostElement: React.FC<Props> = ({ data2 }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['post', '1/comments'],
    queryFn: fetchPost,
    refetchInterval: 60000,
  });

  console.log(data, 'data post element');

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

          <button className="bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600">
            Small Blue Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostElement;
