import { useContext } from 'react';
import { useAppData, useSetCustomParam, ACTIONS } from '../../helpers/utils';
import { StateContext } from '../../context/AppContext';
import { logout } from '../../firebase/firebase';

const Navbar = () => {
  const users = useAppData();

  const setUserId = useSetCustomParam();

  const { dispatch } = useContext(StateContext);

  const handleAdd = () => {
    dispatch({ type: ACTIONS.SET_NEW_POST, payload: true });
    dispatch({
      type: ACTIONS.SET_SELECTED_POST,
      payload: {
        id: 101,
        body: '',
        title: '',
        userId: 101,
      },
    });
  };

  function handleSelect(value: string) {
    setUserId('page', '1');

    setUserId('userId', value);
  }

  if (users[1].isLoading) return <p>Loading...</p>;
  if (users[1].error) return <p>Error: {users[1].error.message}</p>;

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center mx-auto flex flex-col md:flex-row ">
        <div className="text-white text-lg font-bold">Kochanet Blog</div>
        <button
          onClick={handleAdd}
          className="w-full md:w-auto mb-2 md:mb-0 md:ml-2 ml-2 bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600"
        >
          Add post
        </button>
        <button
          onClick={logout}
          className="w-full md:w-auto mb-2 md:mb-0 md:ml-2 ml-2 bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600"
        >
          Logout
        </button>
        <div>
          <select
            className="w-full md:w-auto mb-2 md:mb-0 md:ml-2 bg-blue-500 text-white border border-blue-400 rounded p-2"
            onChange={(event) => handleSelect(event.currentTarget.value)}
          >
            <option value={0}>Select user</option>
            {users[1].data.map((elem: { name: string; id: number }) => {
              return <option value={elem.id}>{elem.name}</option>;
            })}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
