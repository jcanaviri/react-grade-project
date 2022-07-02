import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useEstimations } from '../context/EstimationsContext'
import { useEstimationType } from '../context/EstimationTypeContext'
import { useProjects } from '../context/ProjectContext'

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

  const loadEstimation = async () => {
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
  }

  useEffect(() => {
    loadEstimation()
  }, [id])

  return (
    <div className="p-4">
      El proyecto es {project.name} <br />
      El tipo de estimación es {type.description} <br />
      La estimacion asociada es {estimation.id} <br />
      {type.name === 'PO' && <ObjectPoints />}
      {type.name === 'PF' && <FunctionPoints />}
      {type.name === 'PH' && <HistoryPoints />}
    </div>
  )
}
