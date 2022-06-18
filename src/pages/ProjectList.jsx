import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useProjects } from '../context/ProjectContext'

export const ProjectList = () => {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { getAllProjects } = useProjects()

  const loadProjects = async () => {
    try {
      const data = await getAllProjects()
      setProjects(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  return (
    <>
      <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
        <h3 className="font-semibold text-slate-900">Proyectos</h3>
      </header>
      <ul className="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm leading-6">
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <>
            {projects.map((project) => (
              <li
                key={project.id}
                className="hover:bg-yellow-400 hover:ring-yellow-400 hover:cursor-pointer group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm"
              >
                <Link to={`/dashboard/projects/${project.id}`}>
                  <div className="flex flex-col">
                    <p className="group-hover:text-white font-semibold text-slate-900">
                      {project.name}
                    </p>
                    <p className="group-hover:text-yellow-50">
                      {project.description}
                    </p>
                    <p className="group-hover:text-yellow-50">
                      Creado el: {project.created_at}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </>
        )}

        <li className="flex">
          <Link
            to="/dashboard/projects"
            className="hover:border-yellow-400 hover:bg-white hover:text-yellow-400 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3"
          >
            <svg
              className="group-hover:text-yellow-400 mb-1 text-slate-400"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            Nuevo proyecto
          </Link>
        </li>
      </ul>
    </>
  )
}
