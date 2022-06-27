import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useEstimations } from '../context/EstimationsContext'

export const MakeEstimation = () => {
  const { id } = useParams()

  const { getOneEstimation } = useEstimations()

  const loadEstimation = async () => {
    const res = await getOneEstimation(id)

    console.log(res[0])
  }

  useEffect(() => {
    loadEstimation()
  }, [])

  return <div>MakeEstimation for {id}</div>
}
