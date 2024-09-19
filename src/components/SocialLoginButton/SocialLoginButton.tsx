
type Props = {
  name?: string
}

const SocialLoginButton: React.FC<Props> = ({name}) => {
  return (
    <div>
      <button type="submit" className="flex w-full justify-center rounded-lg bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ring-1 ring-inset ring-gray-300">
        {name}
      </button>
      </div>
  )
}

export default SocialLoginButton;