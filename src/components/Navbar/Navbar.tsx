import { useAppData, fetchUsers } from "../../helpers/utils";

const Navbar = () => {

  const users = useAppData();
  console.log(users[1]);
  
  function handleSelect(value: string) {
    console.log(value);
    
  }

  if (users[1].isLoading) return <p>Loading...</p>;
  if (users[1].error) return <p>Error: {users[1].error.message}</p>;
  return (
        <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Kochanet Blog</div>
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