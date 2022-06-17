import { Link } from 'react-router-dom'

import { useProjects } from '../context/ProjectContext'

export const ProjectList = () => {
  const { projects } = useProjects()

  return (
    <>
      <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
        <h2 className="font-semibold text-slate-900">Proyectos</h2>
      </header>
      <ul className="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm leading-6">
        {projects.map((project) => (
          <li
            key={project.id}
            className="hover:bg-yellow-400 hover:ring-yellow-400 group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm"
          >
            <Link to={`/dashboard/projects/${project.id}`}>
              <div className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                <div>
                  <p className="group-hover:text-white font-semibold text-slate-900">
                    {project.name}
                  </p>
                </div>
                <div>
                  <p className="group-hover:text-yellow-50">
                    {project.description}
                  </p>
                </div>
                <div>
                  <p className="group-hover:text-yellow-50">
                    Creado el: {project.created_at}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}

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
