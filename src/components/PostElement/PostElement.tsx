
type Props = {
  data: {
    body: string,
    id: number,
    title: string,
    userId: number,
  }
}

const PostElement: React.FC<Props> = ({ data }) => {
  return (
             <div>
      <div className=''>
          </div>
        <div className="mt-2 flex items-center justify-between">
        <div className="flex-column items-center justify-between w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" >
          <div className="block text-left font-medium leading-6 text-gray-900">{data.title}</div>
        <div className="block text-right mt-10 font-medium leading-6 text-gray-900">{data.body}</div>
          </div>
        </div>
      </div>
  )
}

export default PostElement;