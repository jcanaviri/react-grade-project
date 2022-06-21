import { useEffect, useState } from 'react'
import { useTags } from '../context/TagContext'

import { Alert } from '../components/Alert'

let emptyAlert = {
  message: '',
  type: '',
}

export const Tags = () => {
  const [tags, setTags] = useState([])
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState(emptyAlert)
  const { getAllTags, createTag, deleteTag, getByName } = useTags()

  const loadTags = async () => {
    const data = await getAllTags()
    setTags(data)
  }

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true)
      e.preventDefault()
      if (text.length <= 2) return

      let newTag = {
        name: text,
        created_at: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0],
      }

      let exists = await getByName(newTag.name)
      if (exists.length) throw new Error('La tag que quieres crear ya existe')

      let data = await createTag(newTag)

      setTags([...tags, data[0]])
    } catch (error) {
      setAlertMessage({
        message: error.message,
        type: 'danger',
      })
      setShowAlert(true)
    } finally {
      setText('')
      setIsLoading(false)
    }
  }

  const onDeleteTag = async (id) => {
    try {
      setIsLoading(true)
      await deleteTag(id)

      setTags(tags.filter((tag) => tag.id !== id))
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadTags()
  }, [])

  return (
    <div className="p-4">
      <div className="my-4">
        <h3 className="font-semibold text-slate-900">Tags</h3>
      </div>

      {showAlert && (
        <Alert
          message={alertMessage.message}
          type={alertMessage.type}
          closeAlert={() => setShowAlert(false)}
        />
      )}

      <div className="shadow-sm border overflow-hidden sm:rounded-md p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-5">
          <div className="relative flex group col-span-6 md:col-span-3">
            <div className="absolute top-1/2 -translate-y-1/2 pl-3 pointer-events-none text-gray-400 group-focus:text-yellow-500 text-xl">
              <i className="bx bxs-purchase-tag-alt group-focus-within:text-yellow-500"></i>
            </div>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 w-full pl-10"
              placeholder="Agregar una nueva etiqueta"
            />
          </div>

          <div className="col-span-6 md:col-span-2">
            <button
              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full flex items-center justify-center"
              type="submit"
            >
              <i className="bx bxs-save text-xl align-middle mr-2"></i>
              Guardar
            </button>
          </div>
        </form>
        {isLoading ? (
          <div className="text-center my-4">
            <svg
              role="status"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-yellow-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                className="bg-gray-200 border rounded-md py-2 px-4 flex items-center text-sm"
                key={tag.id}
              >
                <p>{tag.name}</p>
                <button
                  className="flex items-center ml-4"
                  onClick={() => onDeleteTag(tag.id)}
                >
                  <i className="bx bx-x hover:scale-150"></i>
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
