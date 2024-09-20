import { useState } from 'react';
import Input from '../Input';
import { Post } from '../PostElement/PostElement';
import { patchPost, useGetCustomParameter } from '../../helpers/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const ChangePostForm: React.FC<Post> = ({ data2 }) => {
  const [title, setTitle] = useState(data2?.title)
  const [body, setBody] = useState(data2?.body)
    const page = useGetCustomParameter();
  const currentPage = page('page') || 1;
  const queryClient = useQueryClient();
  const currentUser = page('userId') || 0;

   const {mutateAsync: patchPost2} = useMutation({
    mutationFn: patchPost,
    onSuccess: () => {
      const secondKey = +currentUser > 0
        ? `?userId=${currentUser}`
        : `?_limit=10&_start=${(+currentPage - 1) * 10}`
      queryClient.setQueryData(
        ['posts', secondKey],
        (prevState: any[]) => {          
          return prevState.map(post => 
          post.id === data2.id ? {...post, title} : post
        );
        }
      );
    },
  });

  const handlePatch = async () => {
    // removePost(data2.id);
    patchPost2(title)
  };
  console.log(title, body, 'change from');
  
  return (
    <div className='absolute top-4 left-2 bg-white w-full' >
      <Input name="title" type="text" onChange={setTitle} value={data2.title} />
      <Input name="body" type="text" onChange={setBody} value={data2.body}/>
      <Input name="userId" type="number" value={`${data2.id}`}/>

      <button
        onClick={handlePatch}
        className="ml-2 bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600"
      >
        Update post
      </button>
    </div >
  );
};
export default ChangePostForm;
