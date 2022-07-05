import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import {
  FunctionPointsExplanation,
  ObjectPointsExplanation,
  Loader,
} from '../components'

import { useResults } from '../context/ResultsContext'
import { useEstimationType } from '../context/EstimationTypeContext'

export const Result = () => {
  const { id } = useParams()

  const { getOneResultData } = useResults()
  const { getAllEstimationTypes } = useEstimationType()

  const [result, setResult] = useState({})
  const [currentType, setCurrentType] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const loadData = async () => {
    try {
      setIsLoading(true)
      const res = await getOneResultData(id)
      const allTypes = await getAllEstimationTypes()

      setResult(res[0])
      console.log(res[0].project)

      allTypes.map((type) => {
        if (type.id === res[0].estimation.type_id) {
          setCurrentType(type)
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [id])

  return (
    <div className="mb-8 p-4">
      <div className="border rounded-md">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="p-4 border-b-2">
              <h3 className="font-semibold mb-2">Proyecto</h3>
              <p className="mb-2 text-sm">
                <span className="font-semibold">Nombre del Proyecto: </span>
                {result.project && result.project.name}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-semibold">
                  Descripción del Proyecto:{' '}
                </span>
                {result.project && result.project.description}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-semibold">Creado en: </span>
                {result.project && result.project.created_at}
              </p>
            </div>

            {currentType.name === 'PF' && (
              <FunctionPointsExplanation result={result} />
            )}

            {currentType.name == 'PO' && (
              <ObjectPointsExplanation result={result} />
            )}
            <div className="px-4 py-3 bg-gray-100 text-right sm:px-6">
              <Link to="/dashboard/results/list">
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5">
                  Volver
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
