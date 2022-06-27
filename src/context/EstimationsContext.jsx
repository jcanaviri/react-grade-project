import { createContext, useContext } from 'react'

import {
  createEstimationRequest,
  getAllEstimationsRequest,
  deleteOneEstimationRequest,
  getOneEstimationRequest,
  updateOneEstimationRequest,
  getEstimationByProjectAndTypeRequest,
} from '../api/estimations'

const EstimationsContext = createContext()

export const useEstimations = () => useContext(EstimationsContext)

export const EstimationProvider = ({ children }) => {
  const createEstimation = (estimation) => createEstimationRequest(estimation)

  const getAllEstimations = () => getAllEstimationsRequest()

  const getOneEstimation = (id) => getOneEstimationRequest(id)

  const updateEstimation = (id, estimation) =>
    updateOneEstimationRequest(id, estimation)

  const deleteEstimation = (id) => deleteOneEstimationRequest(id)

  const getEstimationByProjectAndType = (projectId, typeId) =>
    getEstimationByProjectAndTypeRequest(projectId, typeId)

  return (
    <EstimationsContext.Provider
      value={{
        createEstimation,
        getAllEstimations,
        getOneEstimation,
        updateEstimation,
        deleteEstimation,
        getEstimationByProjectAndType
      }}
    >
      {children}
    </EstimationsContext.Provider>
  )
}
