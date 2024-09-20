import { useAppData } from "../../helpers/utils";

const Navbar = () => {

  const users = useAppData();
  
  if (users[1].isLoading) return <p>Loading...</p>;
  if (users[1].error) return <p>Error: {users[1].error.message}</p>;
  return (
        <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Kochanet Blog</div>
        <div>
          <select className="bg-blue-500 text-white border border-blue-400 rounded p-2">
            <option value="">Select user</option>
            {users[1].data.map((elem: {name: string}) => {
              return (
                <option value="">{elem.name}</option>
              )
            })}
          </select>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;