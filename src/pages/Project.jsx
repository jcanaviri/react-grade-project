import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { useProjects } from '../context/ProjectContext'

import { Alert, Modal } from '../components'

let emptyForm = {
  name: '',
  description: '',
  start_date: '',
  end_date: '',
  aprox_salary: '',
  team_number: 0,
  working_hours: 0,
  money_type: 0,
}
let emptyAlert = {
  message: '',
  type: '',
}
let emptyModal = {
  title: '',
  message: '',
  icon: '',
}

export const Project = () => {
  const nav = useNavigate()
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isModalActive, setIsModalActive] = useState(false)

  const [form, setForm] = useState(emptyForm)
  const [alertMessage, setAlertMessage] = useState(emptyAlert)
  const [modalMessage, setModalMessage] = useState(emptyModal)

  const { getOneProject, updateProject, deleteProject } = useProjects()

  const loadProject = async () => {
    try {
      const res = await getOneProject(id)
      setForm({ ...form, ...res[0] })
    } catch (error) {
      setAlertMessage({
        message: 'Lo sentimos no se pudo cargar tu proyecto 😖',
        type: 'danger',
      })
      setShowAlert(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsUpdating(true)
      const res = await updateProject(id, form)
      setForm(res[0])
      setAlertMessage({
        message: 'Tu proyecto ha sido actualizado 😀',
        type: 'info',
      })
      setShowAlert(true)
    } catch (error) {
      setAlertMessage({
        message: 'Lo sentimos no se pudo actualizar tu proyecto 😖',
        type: 'danger',
      })
      setShowAlert(true)
    } finally {
      setIsUpdating(false)
    }
  }

  const onDeleteProject = async () => {
    await deleteProject(id)
    nav('/dashboard/projects/list')
  }

  useEffect(() => {
    loadProject()
  }, [])

  return (
    <div className="p-4">
      {isModalActive && (
        <Modal
          title={modalMessage.title}
          message={modalMessage.message}
          icon={modalMessage.icon}
          onCancelClick={() => setIsModalActive(false)}
          onDelete={() => onDeleteProject()}
        />
      )}
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          {/* Details section start */}

          <div className="flex justify-between items-center pt-2 pb-4">
            <h3 className="font-semibold text-slate-900">
              Detalles de Projecto
            </h3>
            <Link
              to="/dashboard/projects/list"
              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Ir a mis proyectos
            </Link>
          </div>
          
          {showAlert && (
            <Alert
              message={alertMessage.message}
              type={alertMessage.type}
              closeAlert={() => setShowAlert(false)}
            />
          )}
          {isUpdating ? (
            <p>Actualizando...</p>
          ) : (
            <form onSubmit={handleSubmit} method="POST">
              <div className="shadow border overflow-hidden sm:rounded-md">
                <div className="p-4 md:p-10 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <h3 className="font-semibold text-slate-700">
                        Datos del Proyecto
                      </h3>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="project-name"
                        className="block text-sm font-medium text-gray-700 mb-3"
                      >
                        Nombre Proyecto:
                      </label>
                      <input
                        type="text"
                        id="project-name"
                        name="project-name"
                        autoComplete="off"
                        placeholder="Nombre proyecto..."
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="project-description"
                        className="block text-sm font-medium text-gray-700 mb-3"
                      >
                        Descripción:
                      </label>
                      <textarea
                        placeholder="Breve descripción..."
                        role="textbox"
                        name="project-description"
                        id="project-description"
                        rows="5"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                        value={form.description}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="project-start-date"
                        className="block text-sm font-medium text-gray-700 mb-3"
                      >
                        Fecha Inicio:
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                        type="date"
                        name="project-start-date"
                        id="project-start-date"
                        value={form.start_date}
                        onChange={(e) =>
                          setForm({ ...form, start_date: e.target.value })
                        }
                        required
                      />
                      <label
                        htmlFor="project-start-date"
                        className="block text-sm font-medium text-gray-700 mb-3"
                      >
                        Fecha Final:
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                        type="date"
                        name="project-end-date"
                        id="project-end-date"
                        value={form.end_date}
                        onChange={(e) =>
                          setForm({ ...form, end_date: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-span-6">
                      <h3 className="font-semibold text-slate-700">
                        Datos de Costos
                      </h3>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="team-number"
                        className="block text-sm font-medium text-gray-700 mb-3"
                      >
                        Cantidad de Miembros:
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                        type="number"
                        name="team-number"
                        id="team-number"
                        value={form.team_number}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            team_number: e.target.value,
                          })
                        }
                        required
                      />
                      <label
                        htmlFor="working-hours"
                        className="block text-sm font-medium text-gray-700 mb-3"
                      >
                        Horas de Trabajo
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                        type="number"
                        name="working-hours"
                        id="working-hours"
                        value={form.working_hours}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            working_hours: e.target.value,
                          })
                        }
                        required
                      />
                      <label
                        htmlFor="aprox-salary"
                        className="block text-sm font-medium text-gray-700 mb-3"
                      >
                        Salario apróx.
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                        type="number"
                        name="aprox-salary"
                        id="aprox-salary"
                        value={form.aprox_salary}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            aprox_salary: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="change-type"
                        className="block text-sm font-medium text-gray-700 mb-3"
                      >
                        Tipo de Cambio:
                      </label>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                        type="number"
                        name="change-type"
                        id="change-type"
                        value={form.money_type}
                        onChange={(e) =>
                          setForm({ ...form, money_type: e.target.value })
                        }
                        required
                      >
                        <option value="bs">Bs.</option>
                        <option value="sus">$us.</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-100 text-right sm:px-6">
                  <button
                    className="focus:outline-none text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    onClick={() => {
                      setIsModalActive(true)
                      setModalMessage({
                        title: '¿Estas seguro que deseas eliminar?',
                        message:
                          'Este proceso es irreversible, es decir no podras recurar el proyecto una vez sea este eliminado',
                        icon: 'bx bxs-trash',
                      })
                    }}
                    type="button"
                  >
                    Eliminar
                  </button>

                  <button
                    type="submit"
                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </form>
          )}

          <hr className="my-4 md:min-w-full border-yellow-100" />
          {/* Details section ends */}

          <h3 className="font-semibold text-slate-900">
            Estimaciones del Projecto
          </h3>
          <hr className="my-4 md:min-w-full border-yellow-100" />

          <h3 className="font-semibold text-slate-900">Nuevas estimaciones</h3>
          <hr className="my-4 md:min-w-full border-yellow-100" />
        </>
      )}
    </div>
  )
}
