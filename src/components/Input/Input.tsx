

type Props = {
  name?: string,
  addition?: string
}

const Input: React.FC<Props> = ({ name, addition }) => {

  return (
         <div>
      <div className="flex items-center justify-between">
        <label htmlFor="email" className="block text-left font-medium leading-6 text-gray-900">{name}</label>
        <div className="block text-right font-medium leading-6 text-gray-900">{addition}</div>
          </div>
        <div className="mt-2">
          <input id="email" name="email" type="email"  required className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6" />
        </div>
      </div>
  )
}

export default Input;