import { useState } from 'react'
import { Link } from 'react-router-dom'

import buildingImage from '../assets/building.svg'

import { Alert } from '../components/Alert'

import { useAuth } from '../context/AuthContext'
import { useProjects } from '../context/ProjectContext'

export const Projects = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formWasUsed, setFormWasUsed] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    aprox_salary: '',
    team_number: '',
    working_hours: '',
    money_type: 'bs',
  })
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    type: '',
  })

  const { createProject } = useProjects()
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setIsSaving(true)
      // Form will have user_id and dates in format %Y-%m-%d
      const updatedForm = Object.assign(form, {
        user_id: user.id,
        created_at: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0],
      })
      setForm(updatedForm)

      const data = await createProject(form)
      setAlertMessage({
        message: `Se ha creado el proyecto ${data[0].name}`,
        type: 'success',
      })
      setShowAlert(true)
      setIsSaving(false)
      setForm({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        aprox_salary: '',
        team_number: '',
        working_hours: '',
        money_type: 'bs',
      })
      setFormWasUsed(true)
    } catch (error) {
      setAlertMessage({
        message: 'Lo sentimos pero no fue posible guardar su proyecto',
        type: 'danger',
      })
    }
  }

  return (
    <>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900">Nuevo Proyecto</h3>
      </div>

      {showAlert && (
        <div className="mx-8 mt-4">
          <Alert
            message={alertMessage.message}
            type={alertMessage.type}
            closeAlert={() => setShowAlert(false)}
          />
        </div>
      )}

      <div className="mt-10 sm:mt-0">
        <div className="px-4">
          <div className="mt-5 mb-5 md:mt-0 w-full">
            {/* Form begins */}
            {isSaving ? (
              'Guardando...'
            ) : (
              <>
                {formWasUsed ? (
                  <>
                    <h3 className="text-center my-2">
                      Se ha creado tu proyecto 😁
                    </h3>
                    <div className="flex justify-center px-2 md:px-44 py-2 md:py-5">
                      <img
                        className="w-full md:w-1/2 h-full"
                        src={buildingImage}
                        alt="building"
                      />
                    </div>
                    <div className="flex justify-center">
                      <Link
                        to="/dashboard/projects/list"
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      >
                        Ir a mis proyectos
                      </Link>
                    </div>
                  </>
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
                          type="submit"
                          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
