import { createContext, useContext } from 'react'

import {
  createEstimationTypeRequest,
  deleteOneEstimationTypeRequest,
  getAllEstimationTypeRequest,
  getOneEstimationTypeRequest,
  updateOneEstimationTypeRequest,
} from '../api/estimationType'

const EstimationTypeContext = createContext()

export const useEstimationType = () => useContext(EstimationTypeContext)

export const EstimationTypeProvider = ({ children }) => {
  const createEstimationType = (estimationType) =>
    createEstimationTypeRequest(estimationType)

  const getAllEstimationTypes = () => getAllEstimationTypeRequest()

  const getOneEstimationType = (id) => getOneEstimationTypeRequest(id)

  const updateEstimationType = (id, estimationType) =>
    updateOneEstimationTypeRequest(id, estimationType)

  const deleteEstimationType = (id) => deleteOneEstimationTypeRequest(id)

  return (
    <EstimationTypeContext.Provider
      value={{
        createEstimationType,
        getAllEstimationTypes,
        getOneEstimationType,
        updateEstimationType,
        deleteEstimationType,
      }}
    >
      {children}
    </EstimationTypeContext.Provider>
  )
}
