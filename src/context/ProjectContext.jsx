import { createContext, useContext, useEffect, useState } from 'react'

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
  const [projects, setProjects] = useState([])
  useEffect(() => {
    ;(async () => {
      const data = await getAllProjects()
      setProjects(data)
    })()
  }, [])

  // CRUD of projects
  // all the requests are defined in api folder
  const createProject = (project) => createProjectRequest(project)

  const getAllProjects = () => getAllProjectsRequest()

  const getOneProject = (id) => getOneProjectRequest(id)

  const updateProject = (id, project) => updateProjectRequest(id, project)

  const deleteProject = async (id) => {
    const data = await deleteProjectRequest(id)
    setProjects(projects.filter((p) => p.id !== data[0].id))
  }

  return (
    <ProjectContext.Provider
      value={{
        createProject,
        getAllProjects,
        getOneProject,
        updateProject,
        deleteProject,
        projects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
