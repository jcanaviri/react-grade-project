import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { useEstimations } from '../context/EstimationsContext'
import { useEstimationType } from '../context/EstimationTypeContext'
import { useProjects } from '../context/ProjectContext'

// Components
import { Loader } from '../components'

// Estimation Pages
import { FunctionPoints, HistoryPoints, ObjectPoints } from './'

export const MakeEstimation = () => {
  const { id } = useParams()

  const { getOneEstimation } = useEstimations()
  const { getOneEstimationType } = useEstimationType()
  const { getOneProject } = useProjects()

  const [estimation, setEstimation] = useState({})
  const [type, setType] = useState({})
  const [project, setProject] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const loadEstimation = async () => {
    try {
      setIsLoading(true)
      const estimationResponse = await getOneEstimation(id)
      const typeResponse = await getOneEstimationType(
        estimationResponse[0].type_id
      )
      const projectResponse = await getOneProject(
        estimationResponse[0].project_id
      )

      setEstimation(estimationResponse[0])
      setType(typeResponse[0])
      setProject(projectResponse[0])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadEstimation()
  }, [id])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      <div className="col-span-1 md:col-span-2">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {type.name === 'PO' && <ObjectPoints />}
            {type.name === 'PF' && (
              <FunctionPoints project={project} estimation={estimation} />
            )}
            {type.name === 'PH' && <HistoryPoints />}
          </>
        )}
      </div>
      <div className="col-span- p-4">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Link
              to="/dashboard/estimations/list"
              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              <i className="bx bx-arrow-back"></i>
            </Link>
            <p className="my-4 flex justify-center items-center">
              <i
                className={`group-hover:text-white text-xl mr-1 ${type.icon}`}
              ></i>
              {type.description}
            </p>
            <p className="my-4 text-sm">
              <i className="bx bx-question-mark"></i> En esta seccion podrás
              realizar la estimación de tu Proyecto
            </p>
            <p className="my-4">
              <span className="font-semibold">Proyecto:</span> {project.name}
            </p>
            <p className="my-4">
              <span className="font-semibold">Fecha de Creación:</span>{' '}
              {project.start_date}
            </p>
            <p className="my-4">
              <span className="font-semibold">Miembros del Equipo:</span>{' '}
              {project.team_number}
            </p>
            <p className="my-4">
              <span className="font-semibold">Horas de Trabajo:</span>{' '}
              {project.working_hours} HR.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
