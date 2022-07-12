import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import buildingImage from '../assets/building.svg'
import noData from '../assets/no-data.svg'

import { Alert, Loader } from '../components'

import { useProjects } from '../context/ProjectContext'
import { useEstimations } from '../context/EstimationsContext'
import { useEstimationType } from '../context/EstimationTypeContext'
import { useAuth } from '../context/AuthContext'

export const Estimations = () => {
  const { getAllProjects } = useProjects()
  const { createEstimation, getEstimationByProjectAndType } = useEstimations()
  const { getAllEstimationTypes } = useEstimationType()
  const { user } = useAuth()

  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState()

  const [estimationTypes, setEstimationTypes] = useState([])
  const [selectedEstimation, setSelectedEstimation] = useState()

  const [alertMessage, setAlertMessage] = useState({
    message: '',
    type: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [isProjectCreated, setIsProjectCreated] = useState(false)

  const loadProjects = async () => {
    try {
      setIsLoading(true)
      const data = await getAllProjects(user.id)
      setProjects(data)

      const estimationTypes = await getAllEstimationTypes()
      setEstimationTypes(estimationTypes)
    } catch (error) {
      console.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const pickProject = (id) => {
    setProjects(
      projects.map((p) => {
        if (p.id === id) setSelectedProject(p)
      })
    )
  }

  const pickMethod = (id) => {
    setEstimationTypes(
      estimationTypes.map((method) => {
        if (method.id === id) setSelectedEstimation(method)
      })
    )
  }

  const reloadData = () => {
    setProjects([])
    setEstimationTypes([])
    setSelectedProject()
    setSelectedEstimation()
    loadProjects()
  }

  const saveProject = async () => {
    try {
      setIsSaving(true)
      if (selectedProject === undefined) {
        setAlertMessage({
          message: 'No has seleccionado ningun proyecto',
          type: 'danger',
        })
        setShowMessage(true)
        return
      }
      if (selectedEstimation === undefined) {
        setAlertMessage({
          message: 'No has seleccionado tu método de estimación',
          type: 'danger',
        })
        setShowMessage(true)
        return
      }

      let newEstimation = {
        project_id: selectedProject.id,
        type_id: selectedEstimation.id,
        created_at: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0],
      }

      // Validate if the estimation method exists
      const exists = await getEstimationByProjectAndType(
        newEstimation.project_id,
        newEstimation.type_id
      )
      if (exists.length > 0)
        throw new Error('El proyecto ya cuenta con ese metodo de estimación')

      // now we can create the new estimation
      const res = await createEstimation(newEstimation)
      if (res.id !== null) {
        setIsProjectCreated(true)
        setAlertMessage({
          message: 'Una nueva estimación ha sido creada',
          type: 'success',
        })
        setShowMessage(true)
      } else {
        throw new Error('No se creo el proyecto')
      }
    } catch (error) {
      setAlertMessage({
        message: error.message,
        type: 'danger',
      })
      setShowMessage(true)
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  return (
    <div className="p-4">
      <div className="my-4">
        <h3 className="font-semibold text-slate-900">Estimaciones</h3>
      </div>

      {showMessage && (
        <Alert
          message={alertMessage.message}
          type={alertMessage.type}
          closeAlert={() => setShowMessage(false)}
        />
      )}

      {isProjectCreated ? (
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-slate-900 text-semibold">
            Se ha creado una nueva estimación para tu proyecto
          </h3>
          <p className="text-slate-900 text-sm">
            Ahora lo que debes hacer es ir a la lista de estimaciones y podrás
            realizar tu estimación
          </p>
          <div className="px-2 md:px-44 py-2 md:py-5">
            <img className="w-1/2 mx-auto" src={buildingImage} alt="building" />
          </div>
          <div className="flex gap-2">
            <button
              className="focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
              onClick={() => {
                setIsProjectCreated(false)
                reloadData()
              }}
            >
              Crear un nuevo método
            </button>

            <Link
              to="/dashboard/estimations/list"
              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Ir a la lista de estimaciones
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-semibold text-slate-900 text-sm">
            1.- Selecciona tu proyecto
          </h3>
          <ul className="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm leading-6">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {selectedProject ? (
                  <div className="bg-yellow-400 ring-yellow-400 hover:cursor-pointer group rounded-md p-3 ring-1 shadow-sm">
                    <div className="flex flex-col">
                      <p className="text-white font-bold">
                        {selectedProject.name}
                      </p>
                      <p className="font-semibold text-yellow-50">
                        {selectedProject.description}
                      </p>
                      <p className="text-yellow-50">
                        <span className="font-semibold">Creado el:</span>{' '}
                        {selectedProject.created_at}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {projects.map ? (
                      <>
                        {projects.map((project) => (
                          <li
                            key={project.id}
                            className="hover:bg-yellow-400 hover:ring-yellow-400 hover:cursor-pointer group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm"
                            onClick={() => pickProject(project.id)}
                          >
                            <div className="flex flex-col">
                              <p className="group-hover:text-white font-bold text-slate-900">
                                {project.name}
                              </p>
                              <p className="font-semibold group-hover:text-yellow-50">
                                {project.description}
                              </p>
                              <p className="group-hover:text-yellow-50">
                                <span className="font-semibold">
                                  Creado el:
                                </span>{' '}
                                {project.created_at}
                              </p>
                            </div>
                          </li>
                        ))}
                      </>
                    ) : (
                      <div className="flex flex-col justify-center items-center my-4">
                        <img src={noData} alt="no data" className="w-32" />
                        <small className="my-4">
                          Parece que aun no haz creado un proyecto 🤔
                        </small>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </ul>

          <h3 className="font-semibold text-slate-900 text-sm">
            2.- Selecciona un método de estimación
          </h3>

          <ul className="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm leading-6">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {selectedEstimation ? (
                  <div className="bg-yellow-400 ring-yellow-400 hover:cursor-pointer group rounded-md p-3 ring-1 shadow-sm flex justify-between">
                    <div className="flex flex-col">
                      <p className="text-white font-bold">
                        {selectedEstimation.name}
                      </p>
                      <p className="font-semibold text-yellow-50">
                        {selectedEstimation.description}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <i
                        className={`text-white text-2xl ${selectedEstimation.icon}`}
                      ></i>
                    </div>
                  </div>
                ) : (
                  <>
                    {estimationTypes.map((method) => (
                      <li
                        key={method.id}
                        className="hover:bg-yellow-400 hover:ring-yellow-400 hover:cursor-pointer group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm flex justify-between"
                        onClick={() => pickMethod(method.id)}
                      >
                        <div className="flex flex-col">
                          <p className="group-hover:text-white font-bold text-slate-900">
                            {method.name}
                          </p>
                          <p className="font-semibold group-hover:text-yellow-50">
                            {method.description}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <i
                            className={`group-hover:text-white text-2xl ${method.icon}`}
                          ></i>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </>
            )}
          </ul>

          <h3 className="font-semibold text-slate-900 text-sm">
            3.- Guardar todo hasta este punto
          </h3>
          <div className="p-4">
            <Link
              to="/dashboard/projects/list"
              className="focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Volver a Proyectos
            </Link>

            <button
              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-4 inline-flex items-center"
              onClick={reloadData}
            >
              Recargar Datos
            </button>
            <button
              className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={saveProject}
            >
              {isSaving ? 'Guardando...' : 'Guardar y Continuar'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
