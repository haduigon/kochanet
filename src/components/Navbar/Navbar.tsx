import { useEffect, useState } from "react";
import { useAppData, useGetCustomParameter, useSetCustomParam, createPost } from "../../helpers/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const users = useAppData();

  const setUserId = useSetCustomParam();
    const page = useGetCustomParameter();
  const currentPage = page('page') || 1;
  const queryClient = useQueryClient();
  const currentUser = page('userId') || 0;

    const newP = {
    title: 'foo',
    body: 'bar',
    userId: 1,
  }

    const { mutateAsync: addPost } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      console.log('added succsefully');

      const secondKey = +currentUser > 0
        ? `?userId=${currentUser}`
        : `?_limit=10&_start=${(+currentPage - 1) * 10}`
      queryClient.setQueryData(
        ['posts', secondKey],
        (prevState: any[]) => {  
          return [newP, ...prevState];
        }
      );
    },
  });


  const handleAdd = () => {
    addPost();
  }

  function handleSelect(value: string) {
    setUserId('page', '1');

    setUserId('userId', value);
  }

  if (users[1].isLoading) return <p>Loading...</p>;
  if (users[1].error) return <p>Error: {users[1].error.message}</p>;
  
  return (
        <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Kochanet Blog</div>
                  <button
            onClick={handleAdd}
            className="ml-2 bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600"
          >
            Add post
          </button>
        <div>
          <select
            className="bg-blue-500 text-white border border-blue-400 rounded p-2"
            onChange={(event) => handleSelect(event.currentTarget.value)}
          >
            <option value={0}>Select user</option>
            {users[1].data.map((elem: {name: string, id: number}) => {
              return (
                <option value={elem.id}>{elem.name}</option>
              )
            })}
          </select>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;