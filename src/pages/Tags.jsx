import { useEffect, useState } from 'react'
import { useTags } from '../context/TagContext'

import { Alert, Loader } from '../components'

export const Tags = () => {
  const [tags, setTags] = useState([])
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    type: '',
  })
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
        <h3 className="font-semibold text-slate-900">Etiquetas</h3>
        <p className="text-slate-900 text-sm my-2">
          Crea nuevas etiquetas para tus proyectos
        </p>
      </div>

      <div className="flex items-center justify-center">
        <div className="max-w-lg w-full space-y-8 border rounded-lg shadow-sm p-8">
          {showAlert && (
            <Alert
              message={alertMessage.message}
              type={alertMessage.type}
              closeAlert={() => setShowAlert(false)}
            />
          )}
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
            <Loader />
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
      <p className="text-sm text-justify font-extralight my-4">
        <i className="bx bx-question-mark"></i> El proposito de las etiquetas es
        que puedas categorizar tus proyectos es decir agruparlos mediante alguna
        característica
      </p>
    </div>
  )
}
