import { useState } from 'react'
import { Link } from 'react-router-dom'

import { OPQuestions } from '../utils/ObjectPoints'
import buildingImage from '../assets/building.svg'

import { Alert, Loader } from '../components'
import { useResults } from '../context/ResultsContext'

export const ObjectPoints = ({ project, estimation }) => {
  const { createResult } = useResults()

  const [showMain, setShowMain] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showSecondForm, setShowSecondForm] = useState(false)
  const [showFinalForm, setShowFinalForm] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    type: '',
  })
  const [formValues, setFormValues] = useState({
    screens: '',
    reports: '',
    generation: '',
  })

  const [objectPointsValue, setObjectPointsValue] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [experience, setExperience] = useState('')
  const [finalResults, setFinalResults] = useState({
    efforce: '',
    time: '',
    aproxCost: '',
    typePrice: '',
  })

  const [resultValues, setResultValues] = useState({
    newObjectPoints: '',
    manMonth: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isResultCreated, setIsResultCreated] = useState(false)

  const begin = () => {
    setShowMain(false)
    setShowForm(true)
  }

  const goToMain = () => {
    setShowMain(true)
    setShowForm(false)
  }

  const gotToSecondForm = () => {
    setShowForm(false)
    setShowSecondForm(true)
  }

  const goToFirstForm = () => {
    setShowMain(false)
    setShowForm(true)
    setShowSecondForm(false)
  }

  const goToFinalForm = () => {
    if (experience && percentage) {
      let newObjects =
        Math.round(((objectPointsValue * (100 - percentage)) / 100) * 100) / 100
      let manMonth = Math.round((newObjects / experience) * 100) / 100

      setResultValues({
        newObjectPoints: newObjects,
        manMonth: manMonth,
      })

      setFinalResults({
        efforce: `${manMonth} PM`,
        time: Math.round(manMonth * project.team_number * 100) / 100,
        aproxCost:
          Math.round(
            project.team_number * project.aprox_salary * manMonth * 100
          ) / 100,
        typePrice: project.money_type,
      })

      setShowMain(false)
      setShowForm(false)
      setShowSecondForm(false)
      setShowFinalForm(true)
    } else {
      setAlertMessage({
        message: 'No has completado correctamente el formulario',
        type: 'danger',
      })
      setShowAlert(true)
    }
  }

  const handleForm = (e) => {
    e.preventDefault()
    if (formValues.screens && formValues.reports && formValues.generation) {
      let total =
        parseInt(formValues.screens) +
        parseInt(formValues.reports) +
        parseInt(formValues.generation)
      setObjectPointsValue(total)
    } else {
      setAlertMessage({
        message: 'No has completado correctamente el formulario',
        type: 'danger',
      })
      setShowAlert(true)
    }
  }

  const saveResult = async () => {
    try {
      setIsLoading(true)
      const newResult = {
        efforce: finalResults.efforce,
        time: finalResults.time,
        aprox_cost: finalResults.aproxCost,
        type_price: finalResults.typePrice,
        created_at: new Date().toISOString().split('T')[0],
        project_id: project.id,
        estimation_id: estimation.id,
      }
      const res = await createResult(newResult)
      if (res[0].id) {
        setAlertMessage({
          message: 'Tus resultados han sido almacenados',
          type: 'success',
        })
        setShowAlert(true)
        setIsResultCreated(true)
      }
    } catch (error) {
      setAlertMessage({
        message: 'Lo sentimos pero no fue posible almacenar tu resultado 😭',
        type: 'danger',
      })
      setShowAlert(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4 mb-8">
      <div className="my-4">
        <h4 className="font-semibold">Estimación por PO</h4>
      </div>

      {showAlert && (
        <Alert
          message={alertMessage.message}
          type={alertMessage.type}
          closeAlert={() => setShowAlert(false)}
        />
      )}
      <div className="border rounded-md  mb-4">
        {showMain && (
          <>
            <div className="p-4">
              {OPQuestions.map((q, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold mb-1">{q.title}</h4>
                  <p>{q.body}</p>
                  {q.items && (
                    <ul className="list-disc ml-4">
                      {q.items.map((listItem, index) => (
                        <li key={index}>{listItem}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div className="px-4 py-3 bg-gray-100 text-right sm:px-6">
              <button
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={begin}
              >
                Comenzar
              </button>
            </div>
          </>
        )}

        {showForm && (
          <>
            <div className="p-4">
              <h4 className="font-semibold underline mb-4">
                Conteo de Objetos
              </h4>
              <form onSubmit={handleForm}>
                <div className="grid grid-cols-2 gap-4 items-center mb-2">
                  <label htmlFor="" className="col-span-1">
                    Cantidad de Pantallas
                  </label>
                  <input
                    type="number"
                    className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    value={formValues.screens}
                    onChange={(e) =>
                      setFormValues({ ...formValues, screens: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 items-center mb-2">
                  <label htmlFor="" className="col-span-1">
                    Cantidad de Reportes
                  </label>
                  <input
                    type="number"
                    className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    value={formValues.reports}
                    onChange={(e) =>
                      setFormValues({ ...formValues, reports: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 items-center mb-2">
                  <label htmlFor="" className="col-span-1">
                    Generación del Lenguaje
                  </label>

                  <div className="col-span-1">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                      value={formValues.generation}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          generation: e.target.value,
                        })
                      }
                    >
                      <option value="">Elige...</option>
                      <option value="5">1RA Generación</option>
                      <option value="9">2DA Generación</option>
                      <option value="10">3RA Generación</option>
                    </select>
                  </div>
                </div>

                {objectPointsValue === 0 ? (
                  <>
                    <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4">
                      Calcular
                    </button>
                    <button
                      className="focus:outline-none text-white bg-lime-400 hover:bg-lime-500 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={(e) => {
                        e.preventDefault()
                        goToMain()
                      }}
                    >
                      regresar
                    </button>
                  </>
                ) : (
                  <>
                    <p className="my-4">
                      <span className="font-semibold">Resultado:</span>{' '}
                      {objectPointsValue} OP
                    </p>
                    <button
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={(e) => {
                        e.preventDefault()
                        gotToSecondForm()
                      }}
                    >
                      Continuar
                    </button>
                  </>
                )}
              </form>
            </div>
          </>
        )}

        {showSecondForm && (
          <>
            <div className="p-4">
              <h4 className="font-semibold underline mb-4">
                Cálculo de Reutilización y Experiencia
              </h4>

              <div className="grid grid-cols-2 gap-4 items-center my-4">
                <label htmlFor="" className="col-span-1">
                  Porcentaje de reutilización de código:
                </label>

                <div className="flex col-span-1">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300">
                    %
                  </span>
                  <input
                    type="number"
                    id="website-admin"
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 focus:ring-1 invalid:focus:ring-red-500 invalid:focus:border-red-500 invalid:bg-red-100"
                    min={0}
                    max={100}
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center my-4">
                <label htmlFor="" className="col-span-1">
                  Experiencia del equipo(con las herramientas, con los
                  lenguajes, etc)
                </label>

                <div className="col-span-1">
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <option value="">Elige...</option>
                    <option value="4">Sin Experiencia</option>
                    <option value="13">Poca Experiencia</option>
                    <option value="50">Con Experiencia</option>
                  </select>
                </div>
              </div>

              <button
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={goToFinalForm}
              >
                Ir a los resultados finales
              </button>
              <button
                className="focus:outline-none text-white bg-lime-400 hover:bg-lime-500 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-4"
                onClick={goToFirstForm}
              >
                Atras
              </button>
            </div>
          </>
        )}

        {showFinalForm && (
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {isResultCreated ? (
                  <div className="p-4">
                    <h3 className="text-center my-2">
                      Tu resultado ha sido correctamente almacenado 😁
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
                        to="/dashboard/results/list"
                        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      >
                        Ir a Resultados
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-4">
                      <h4 className="font-semibold">
                        ¿Cómo y porque de los resultados?
                      </h4>
                      <p className="mt-2 text-sm">
                        A continuación se detallan un detalles relacionados a
                        como se realizo el proceso de estimación
                      </p>
                      <p className="mt-2 text-sm">
                        Asi que mostraremos unas fórmulas explicativas:
                      </p>
                      <div className="my-4">
                        <span className="bg-gray-200 p-2 block text-center italic rounded-md">
                          NOP = OP (100 - %Reuso) / 100 <br />
                          PM = NOP / PROD
                        </span>
                      </div>
                      <p className="mt-2 text-sm">
                        Aqui una breve explicación de lo expuesto en las
                        fórmulas:
                      </p>
                      <p className="mt-2 text-sm">
                        OP = puntos objeto <br />
                        NOP = nuevos puntos objeto <br />
                        PROD = productividad
                      </p>

                      <div className="my-4">
                        <p className="text-sm">
                          La productividad viene dada de la experiencia
                          previamente seleccionada en el formulario previo
                        </p>
                      </div>

                      <h4 className="font-semibold">
                        ¿Qué es una Persona Mes?
                      </h4>
                      <p className="mt-2 text-sm">
                        Representa los meses de trabajo de una persona
                        realizaria en el desarrollo del proyecto.
                      </p>

                      <h4 className="font-semibold mt-4 pt-4 border-t-2 underline">
                        Resultados Finales de tu Estimación
                      </h4>

                      <p className="mt-2 text-sm">
                        <span className="font-semibold">
                          PO(Puntos Objeto) ={' '}
                        </span>{' '}
                        {objectPointsValue}
                      </p>
                      <p className="mt-2 text-sm">
                        <span className="font-semibold">
                          NPO(Nuevos Puntos Objeto) ={' '}
                        </span>{' '}
                        {resultValues.newObjectPoints}
                      </p>
                      <p className="mt-2 mb-4 text-sm">
                        <span className="font-semibold">
                          PM(Personas Mes) ={' '}
                        </span>{' '}
                        {resultValues.manMonth}
                      </p>

                      <h4 className="font-semibold border-t-2 pt-4 my-4 underline">
                        Estimaciones Finales
                      </h4>
                      <p className="mt-2 mb-4 text-sm">
                        <span className="font-semibold">
                          Efuerzo(en Personas Mes) = {finalResults.efforce}
                        </span>
                      </p>
                      <p className="mt-2 mb-4 text-sm">
                        <span className="font-semibold">
                          Tiempo(en meses apróx.) = {finalResults.time}
                        </span>
                      </p>
                      <p className="mt-2 mb-4 text-sm">
                        <span className="font-semibold">
                          Costo(en {project.money_type} apróx.) ={' '}
                          {finalResults.aproxCost}
                        </span>
                      </p>
                    </div>
                    <div className="px-4 py-3 bg-gray-100 text-right sm:px-6">
                      <button
                        className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={saveResult}
                      >
                        Guardar resultados
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
