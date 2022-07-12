import { createContext, useContext } from 'react'

import {
  createProjectRequest,
  getAllProjectsRequest,
  getOneProjectRequest,
  updateProjectRequest,
  deleteProjectRequest,
} from '../api/projects'

const ProjectContext = createContext()

export const useProjects = () => useContext(ProjectContext)

export const ProjectProvider = ({ children }) => {
  // CRUD of projects
  const createProject = (project) => createProjectRequest(project)

  const getAllProjects = (user_id) => getAllProjectsRequest(user_id)

  const getOneProject = (id) => getOneProjectRequest(id)

  const updateProject = (id, project) => updateProjectRequest(id, project)

  const deleteProject = (id) => deleteProjectRequest(id)

  return (
    <ProjectContext.Provider
      value={{
        createProject,
        getAllProjects,
        getOneProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
