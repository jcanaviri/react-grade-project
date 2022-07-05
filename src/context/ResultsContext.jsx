import { createContext, useContext } from 'react'

import {
  createResultRequest,
  deleteResultRequest,
  getAllResultsRequest,
  getOneResultRequest,
  updateResultRequest,
} from '../api/results'

const ResultsContext = createContext()

export const useResults = () => useContext(ResultsContext)

export const ResultsProvider = ({ children }) => {
  const createResult = (result) => createResultRequest(result)

  const getAllResults = () => getAllResultsRequest()

  const getOneResult = (id) => getOneResultRequest(id)

  const updateResult = (id, result) => updateResultRequest(id, result)

  const deleteResult = (id) => deleteResultRequest(id)

  return (
    <ResultsContext.Provider
      value={{
        createResult,
        getAllResults,
        getOneResult,
        updateResult,
        deleteResult,
      }}
    >
      {children}
    </ResultsContext.Provider>
  )
}
