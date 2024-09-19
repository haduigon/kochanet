
type Props = {
  name?: string
}

const Button: React.FC<Props> = ({name}) => {
  return (
    <div>
      <button type="submit" className="flex w-full justify-center rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {name}
      </button>
      </div>
  )
}

export default Button;