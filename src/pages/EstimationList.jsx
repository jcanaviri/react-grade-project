import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useEstimations } from '../context/EstimationsContext'

import { Loader, Modal } from '../components'

export const EstimationList = () => {
  const { getAllEstimations, deleteEstimation } = useEstimations()

  const [estimations, setEstimations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState({
    id: '',
    title: '',
    message: '',
    icon: '',
  })

  const loadEstimations = async () => {
    try {
      setIsLoading(true)
      const res = await getAllEstimations()
      setEstimations(res)
    } catch (error) {
      console.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = (id) => {
    setModalMessage({
      id,
      title: '¿Estas seguro que deseas eliminar?',
      message:
        'Este proceso es irreversible, es decir no podras recurar la estimación una vez sea haya eliminado',
      icon: 'bx bxs-trash',
    })
    setShowModal(true)
  }

  const onDelete = async (id) => {
    await deleteEstimation(id)
    setShowModal(false)
    loadEstimations()
  }

  useEffect(() => {
    loadEstimations()
    document.addEventListener('keyup', (e) => {
      if (e.key == 'Escape') setShowModal(false)
    })
  }, [])

  return (
    <>
      <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
        <h3 className="font-semibold text-slate-900">Tus estimaciones</h3>
      </header>

      {showModal && (
        <Modal
          title={modalMessage.title}
          message={modalMessage.message}
          icon={modalMessage.icon}
          onCancelClick={() => setShowModal(false)}
          onDelete={() => onDelete(modalMessage.id)}
        />
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ul className="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm leading-6">
            {estimations.map((estimation) => (
              <li
                key={estimation.id}
                className="hover:bg-yellow-400 hover:ring-yellow-400 hover:cursor-pointer group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm"
              >
                <div className="flex flex-col">
                  <div className="font-bold group-hover:text-yellow-50 flex justify-between items-center my-2">
                    <i
                      className={`group-hover:text-white text-xl ${estimation.estimationType.icon}`}
                    ></i>
                    <div>
                      ({estimation.estimationType.name}){' '}
                      {estimation.estimationType.description}
                    </div>

                    <i
                      className="bx bx-x text-xl"
                      onClick={() => handleDelete(estimation.id)}
                    ></i>
                  </div>
                  <Link to={`/dashboard/estimations/${estimation.id}`}>
                    <p className="group-hover:text-white font-bold text-slate-900">
                      {estimation.project.name}
                    </p>
                    <p className="font-semibold group-hover:text-yellow-50">
                      {estimation.project.description}
                    </p>
                    <p className="group-hover:text-yellow-50">
                      <span className="font-semibold">Proyecto creado el:</span>{' '}
                      {estimation.project.created_at}
                    </p>
                    <p className="group-hover:text-yellow-50">
                      <span className="font-semibold">
                        Estimación creada el:
                      </span>{' '}
                      {estimation.created_at}
                    </p>
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {estimations.length > 0 && (
            <p className="p-4 text-sm text-slate-900">
              Selecciona una de tus estimaciones creadas para comenzar
            </p>
          )}
        </>
      )}
    </>
  )
}
