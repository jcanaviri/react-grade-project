import { useParams, useNavigate } from 'react-router-dom'
import { useProjects } from '../context/ProjectContext'

export const Project = () => {
  const { id } = useParams()
  const nav = useNavigate()

  const { deleteProject } = useProjects()

  const onDeleteProject = async (id) => {
    await deleteProject(id)
    nav('/dashboard/projects/list')
  }

  return (
    <div>
      <button onClick={() => onDeleteProject(id)}>Delete</button>
    </div>
  )
}
