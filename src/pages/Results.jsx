import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import noData from '../assets/no-data.svg'

import { useResults } from '../context/ResultsContext'
import { useEstimationType } from '../context/EstimationTypeContext'

import { Modal, Loader } from '../components'

export const Results = () => {
  const { getResultsData, deleteResult } = useResults()
  const { getAllEstimationTypes } = useEstimationType()

  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const [types, setTypes] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState({
    id: '',
    title: '',
    message: '',
    icon: '',
  })

  const loadData = async () => {
    try {
      setIsLoading(true)
      const res = await getResultsData()
      const types = await getAllEstimationTypes()
      setTypes(types)
      setResults(res)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = (id) => {
    setModalMessage({
      id,
      title: '¿Estas seguro que deseas eliminar el resultado?',
      message:
        'Este proceso es irreversible, es decir no podras recurar la estimación una vez sea haya eliminado',
      icon: 'bx bxs-trash',
    })
    setShowModal(true)
  }

  const onDelete = async (id) => {
    await deleteResult(id)
    setShowModal(false)
    loadData()
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
        <h3 className="font-semibold text-slate-900">Tus resultados 🧑‍💻</h3>
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
          {results.length <= 0 && (
            <div className="flex w-full flex-col justify-center items-center my-4">
              <img src={noData} alt="no data" className="w-72" />
              <small className="my-4">
                Parece que aun no haz almacenado ningún resultado 🤔
              </small>
            </div>
          )}

          <ul className="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm leading-6">
            {results.map((result) => (
              <li
                key={result.id}
                className="hover:bg-yellow-400 hover:ring-yellow-400 hover:cursor-pointer group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm"
              >
                {types.map(
                  (type) =>
                    type.id === result.estimation.type_id && (
                      <div
                        key={type.id}
                        className="font-bold group-hover:text-yellow-50 flex justify-between items-center my-2"
                      >
                        <i
                          className={`group-hover:text-white text-xl ${type.icon}`}
                        ></i>
                        <div>
                          {type.name} {type.description}
                        </div>

                        <i
                          className="bx bx-x text-xl"
                          onClick={() => handleDelete(result.id)}
                        ></i>
                      </div>
                    )
                )}

                <Link to={`/dashboard/results/${result.id}`}>
                  <div className="flex flex-col">
                    <p className="group-hover:text-white font-bold text-slate-900">
                      {result.project.name}
                    </p>
                    <p className="font-semibold group-hover:text-yellow-50">
                      {result.project.description}
                    </p>
                    <p className="group-hover:text-yellow-50">
                      <span className="font-semibold">Proyecto creado el:</span>{' '}
                      {result.project.created_at}
                    </p>
                    <p className="group-hover:text-yellow-50">
                      <span className="font-semibold">
                        Estimación creada el:
                      </span>{' '}
                      {result.created_at}
                    </p>
                    <p className="group-hover:text-yellow-50">
                      <span className="font-semibold">Esfuerzo: </span>
                      {result.efforce}
                    </p>
                    <p className="group-hover:text-yellow-50">
                      <span className="font-semibold">Tiempo Apróx: </span>
                      {result.time} meses
                    </p>
                    <p className="group-hover:text-yellow-50">
                      <span className="font-semibold">Costo Apróx: </span>
                      {result.aprox_cost} {result.type_price}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
