import { useState } from 'react'
import { Link } from 'react-router-dom'

import buildingImage from '../assets/building.svg'

import {
  functionPointsMainItems,
  questionsList,
} from '../utils/FunctionPointsUtilities'

import { Alert, Loader } from '../components'

import { useResults } from '../context/ResultsContext'

export const FunctionPoints = ({ project, estimation }) => {
  const [showMain, setShowMain] = useState(true)
  const [showFirstForm, setShowFirstForm] = useState(false)
  const [showSecondForm, setShowSecondForm] = useState(false)
  const [showFinalForm, setShowFinalForm] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    type: '',
  })
  const [totalAccount, setTotalAccount] = useState(0)
  const [adjustmentFactors, setAdjustmentFactors] = useState(0)
  const [questions, setQuestions] = useState(questionsList)

  // Results
  const { createResult } = useResults()

  const [result, setResult] = useState({
    functionPoints: '',
    carpersTime: '',
    isbsgFirstTime: '',
    isbsgSecondTime: '',
    isbsgThirdTime: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isResultCreated, setIsResultCreated] = useState(false)

  // First Input - User inputs
  const [userInputs, setUserInputs] = useState({
    value: '',
    category: '',
    isResultSet: false,
    result: '',
  })
  const setUserResult = () => {
    let categoryValue = 0
    if (userInputs.category == 'm') {
      categoryValue = 4
    } else if (userInputs.category == 'c') {
      categoryValue = 6
    } else if (
      userInputs.category == '' ||
      userInputs.category == 's' ||
      userInputs.category == undefined ||
      userInputs.category == null
    ) {
      categoryValue = 3
    }

    let currentValue = parseInt(userInputs.value)

    setUserInputs({
      ...userInputs,
      result: currentValue * categoryValue,
      isResultSet: true,
    })
  }
  const resetUserInputs = () => {
    setUserInputs({
      value: '',
      category: '',
      isResultSet: false,
      result: '',
    })
  }

  // Second Input - User output
  const [userOutputs, setUserOutputs] = useState({
    value: '',
    category: '',
    isResultSet: false,
    result: '',
  })
  const setUserOutputResult = () => {
    let categoryValue = 0
    if (userOutputs.category == 'm') {
      categoryValue = 5
    } else if (userOutputs.category == 'c') {
      categoryValue = 7
    } else if (
      userOutputs.category == '' ||
      userOutputs.category == 's' ||
      userOutputs.category == undefined ||
      userOutputs.category == null
    ) {
      categoryValue = 4
    }

    let currentValue = parseInt(userOutputs.value)

    setUserOutputs({
      ...userOutputs,
      result: currentValue * categoryValue,
      isResultSet: true,
    })
  }
  const resetUserOutput = () => {
    setUserOutputs({
      value: '',
      category: '',
      isResultSet: false,
      result: '',
    })
  }

  // Third Input - User queries
  const [userQueries, setUserQueries] = useState({
    value: '',
    category: '',
    isResultSet: false,
    result: '',
  })
  const setUserQueriesResult = () => {
    let categoryValue = 0
    if (userQueries.category == 'm') {
      categoryValue = 4
    } else if (userQueries.category == 'c') {
      categoryValue = 6
    } else if (
      userQueries.category == '' ||
      userQueries.category == 's' ||
      userQueries.category == undefined ||
      userQueries.category == null
    ) {
      categoryValue = 3
    }

    let currentValue = parseInt(userQueries.value)

    setUserQueries({
      ...userQueries,
      result: currentValue * categoryValue,
      isResultSet: true,
    })
  }
  const resetUserQueries = () => {
    setUserQueries({
      value: '',
      category: '',
      isResultSet: false,
      result: '',
    })
  }

  // Fourth Input - Ali
  const [userAli, setUserAli] = useState({
    value: '',
    category: '',
    isResultSet: false,
    result: '',
  })
  const setUserAliResult = () => {
    let categoryValue = 0
    if (userAli.category == 'm') {
      categoryValue = 10
    } else if (userAli.category == 'c') {
      categoryValue = 15
    } else if (
      userAli.category == '' ||
      userAli.category == 's' ||
      userAli.category == undefined ||
      userAli.category == null
    ) {
      categoryValue = 7
    }

    let currentValue = parseInt(userAli.value)

    setUserAli({
      ...userAli,
      result: currentValue * categoryValue,
      isResultSet: true,
    })
  }
  const resetUserAli = () => {
    setUserAli({
      value: '',
      category: '',
      isResultSet: false,
      result: '',
    })
  }

  // Fifth Input - Ale
  const [userAle, setUserAle] = useState({
    value: '',
    category: '',
    isResultSet: false,
    result: '',
  })
  const setUserAleResult = () => {
    let categoryValue = 0
    if (userAle.category == 'm') {
      categoryValue = 7
    } else if (userAle.category == 'c') {
      categoryValue = 10
    } else if (
      userAle.category == '' ||
      userAle.category == 's' ||
      userAle.category == undefined ||
      userAle.category == null
    ) {
      categoryValue = 5
    }

    let currentValue = parseInt(userAle.value)

    setUserAle({
      ...userAle,
      result: currentValue * categoryValue,
      isResultSet: true,
    })
  }
  const resetUserAle = () => {
    setUserAle({
      value: '',
      category: '',
      isResultSet: false,
      result: '',
    })
  }

  // Final result
  const getTotalAccount = () => {
    if (
      userInputs.result &&
      userOutputs.result &&
      userQueries.result &&
      userAli.result &&
      userAle.result
    ) {
      setTotalAccount(
        userInputs.result +
          userOutputs.result +
          userQueries.result +
          userAli.result +
          userAle.result
      )
    } else {
      setAlertMessage({
        type: 'info',
        message: 'Por favor completa el formulario',
      })
      setShowAlert(true)
    }
  }

  // Questions
  const setNewValue = (index, value) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i == index) question.value = value
      return question
    })
    setQuestions(updatedQuestions)
  }
  const addAdjustmentFactors = () => {
    let total = 0
    questions.map((question) => (total += parseInt(question.value)))
    setAdjustmentFactors(total)
  }

  const begin = () => {
    setShowMain(false)
    setShowFirstForm(true)
    setShowSecondForm(false)
    setShowFinalForm(false)
  }
  const gotToSecondForm = () => {
    setShowMain(false)
    setShowFirstForm(false)
    setShowSecondForm(true)
    setShowFinalForm(false)
  }

  const goToMain = () => {
    setShowMain(true)
    setShowFirstForm(false)
    setShowSecondForm(false)
    setShowFinalForm(false)
  }

  const gotToFinalForm = () => {
    let fp =
      Math.round(totalAccount * (0.65 + 0.01 * adjustmentFactors) * 100) / 100
    setResult({
      functionPoints: fp,
      carpersTime: Math.round(fp ** 0.4 * 100) / 100,
      isbsgFirstTime: Math.round(0.8 * fp ** 0.404 * 100) / 100,
      isbsgSecondTime: Math.round(0.3 * fp ** 0.559 * 100) / 100,
      isbsgThirdTime: Math.round(1.11 * fp ** 0.32 * 100) / 100,
    })

    setShowMain(false)
    setShowFirstForm(false)
    setShowSecondForm(false)
    setShowFinalForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const saveResult = async () => {
    try {
      setIsLoading(true)
      const newResult = {
        efforce: `${result.functionPoints} PF`,
        time: result.carpersTime,
        aprox_cost: (
          result.carpersTime *
          project.team_number *
          project.aprox_salary
        ).toFixed(2),
        type_price: project.money_type,
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
        <h4 className="font-semibold">Estimación por PF</h4>
      </div>

      {showMain && (
        <>
          <div className="border rounded-md p-4 mb-4 bg-slate-100">
            {functionPointsMainItems.map((item, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <div>
                  {item.body}

                  {item.list && (
                    <ul className="list-disc ml-5 text-slate-700">
                      {item.list.map((listItem, i) => (
                        <li key={i}>{listItem}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={begin}
          >
            Comenzar
          </button>
        </>
      )}

      {showFirstForm && (
        <>
          <div className="border rounded-md">
            <form className="p-4" onSubmit={handleSubmit}>
              <h4 className="font-semibold mb-4">Calculo de la cuenta total</h4>

              {showAlert && (
                <Alert
                  message={alertMessage.message}
                  type={alertMessage.type}
                  closeAlert={() => setShowAlert(false)}
                />
              )}

              {/* User Inputs */}
              <div className="grid grid-cols-4 gap-4 items-center mb-2">
                <label htmlFor="" className="col-span-1">
                  Entradas de Usuario
                </label>
                <input
                  type="number"
                  value={userInputs.value}
                  onChange={(e) => {
                    setUserInputs({ ...userInputs, value: e.target.value })
                  }}
                  className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                />
                <div className="col-span-1">
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    value={userInputs.category}
                    onChange={(e) => {
                      setUserInputs({ ...userInputs, category: e.target.value })
                    }}
                  >
                    <option value="">Complejidad...</option>
                    <option value="s">simple</option>
                    <option value="m">medio</option>
                    <option value="c">complejo</option>
                  </select>
                </div>
                <div className="col-span-1 mx-auto">
                  {!userInputs.isResultSet ? (
                    <button
                      className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={setUserResult}
                    >
                      Calcular
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <input
                        type="number"
                        value={userInputs.result}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                        disabled
                      />
                      <button
                        className="focus:outline-none text-white bg-lime-400 hover:bg-lime-500 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={resetUserInputs}
                      >
                        <i className="bx bx-redo transform -rotate-180"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* User Outputs */}
              <div className="grid grid-cols-4 gap-4 items-center mb-2">
                <label htmlFor="" className="col-span-1">
                  Salidas de Usuario
                </label>
                <input
                  type="number"
                  value={userOutputs.value}
                  onChange={(e) => {
                    setUserOutputs({ ...userOutputs, value: e.target.value })
                  }}
                  className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                />
                <div className="col-span-1">
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    value={userOutputs.category}
                    onChange={(e) => {
                      setUserOutputs({
                        ...userOutputs,
                        category: e.target.value,
                      })
                    }}
                  >
                    <option value="">Complejidad...</option>
                    <option value="s">simple</option>
                    <option value="m">medio</option>
                    <option value="c">complejo</option>
                  </select>
                </div>
                <div className="col-span-1 mx-auto">
                  {!userOutputs.isResultSet ? (
                    <button
                      className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={setUserOutputResult}
                    >
                      Calcular
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <input
                        type="number"
                        value={userOutputs.result}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                        disabled
                      />
                      <button
                        className="focus:outline-none text-white bg-lime-400 hover:bg-lime-500 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={resetUserOutput}
                      >
                        <i className="bx bx-redo transform -rotate-180"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* User Queries */}
              <div className="grid grid-cols-4 gap-4 items-center mb-2">
                <label htmlFor="" className="col-span-1">
                  Flujos de Consulta
                </label>
                <input
                  type="number"
                  value={userQueries.value}
                  onChange={(e) => {
                    setUserQueries({ ...userQueries, value: e.target.value })
                  }}
                  className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                />
                <div className="col-span-1">
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    value={userQueries.category}
                    onChange={(e) => {
                      setUserQueries({
                        ...userQueries,
                        category: e.target.value,
                      })
                    }}
                  >
                    <option value="">Complejidad...</option>
                    <option value="s">simple</option>
                    <option value="m">medio</option>
                    <option value="c">complejo</option>
                  </select>
                </div>
                <div className="col-span-1 mx-auto">
                  {!userQueries.isResultSet ? (
                    <button
                      className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={setUserQueriesResult}
                    >
                      Calcular
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <input
                        type="number"
                        value={userQueries.result}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                        disabled
                      />
                      <button
                        className="focus:outline-none text-white bg-lime-400 hover:bg-lime-500 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={resetUserQueries}
                      >
                        <i className="bx bx-redo transform -rotate-180"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Ali */}
              <div className="grid grid-cols-4 gap-4 items-center mb-2">
                <label htmlFor="" className="col-span-1">
                  Archivos Lógicos Internos
                </label>
                <input
                  type="number"
                  value={userAli.value}
                  onChange={(e) => {
                    setUserAli({ ...userAli, value: e.target.value })
                  }}
                  className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                />
                <div className="col-span-1">
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    value={userAli.category}
                    onChange={(e) => {
                      setUserAli({ ...userAli, category: e.target.value })
                    }}
                  >
                    <option value="">Complejidad...</option>
                    <option value="s">simple</option>
                    <option value="m">medio</option>
                    <option value="c">complejo</option>
                  </select>
                </div>
                <div className="col-span-1 mx-auto">
                  {!userAli.isResultSet ? (
                    <button
                      className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={setUserAliResult}
                    >
                      Calcular
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <input
                        type="number"
                        value={userAli.result}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                        disabled
                      />
                      <button
                        className="focus:outline-none text-white bg-lime-400 hover:bg-lime-500 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={resetUserAli}
                      >
                        <i className="bx bx-redo transform -rotate-180"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Ale */}
              <div className="grid grid-cols-4 gap-4 items-center mb-2">
                <label htmlFor="" className="col-span-1">
                  Archivos Lógicos Externos
                </label>
                <input
                  type="number"
                  value={userAle.value}
                  onChange={(e) => {
                    setUserAle({ ...userAle, value: e.target.value })
                  }}
                  className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                />
                <div className="col-span-1">
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    value={userAle.category}
                    onChange={(e) => {
                      setUserAle({ ...userAle, category: e.target.value })
                    }}
                  >
                    <option value="">Complejidad...</option>
                    <option value="s">simple</option>
                    <option value="m">medio</option>
                    <option value="c">complejo</option>
                  </select>
                </div>
                <div className="col-span-1 mx-auto">
                  {!userAle.isResultSet ? (
                    <button
                      className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={setUserAleResult}
                    >
                      Calcular
                    </button>
                  ) : (
                    <div className="flex gap-4">
                      <input
                        type="number"
                        value={userAle.result}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                        disabled
                      />
                      <button
                        className="focus:outline-none text-white bg-lime-400 hover:bg-lime-500 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        onClick={resetUserAle}
                      >
                        <i className="bx bx-redo transform -rotate-180"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {totalAccount === 0 ? (
                <div className="my-4">
                  <button
                    className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={getTotalAccount}
                  >
                    Calcular Cuenta Total
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <p className="font-semibold">Cuenta Total = {totalAccount}</p>
                  <button
                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={gotToSecondForm}
                  >
                    Continuar
                  </button>
                </div>
              )}
            </form>

            <div className="px-4 py-3 bg-gray-100 text-right sm:px-6">
              <button
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={goToMain}
              >
                Volver
              </button>
            </div>
          </div>
        </>
      )}

      {showSecondForm && (
        <>
          <div className="border rounded-md">
            <div className="p-4">
              <h4 className="font-semibold mb-4">
                Cálculo de los factores de ajuste
              </h4>
              <p>
                Lee atentamente cada oración y categoriza en un rango del 1 al
                5, el grado de influencia que dicha oración influye en tu
                proyecto:
              </p>
              <ul className="list-decimal m-4 pl-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-semibold underline">Oración</p>
                  <p className="font-semibold underline">1...5</p>
                </div>
                {questions.map((question, index) => (
                  <li
                    key={index}
                    className="mb-2 flex items-center justify-between"
                  >
                    <span>{question.title}</span>
                    <input
                      type="number"
                      min={0}
                      max={5}
                      value={question.value}
                      onChange={(e) => setNewValue(index, e.target.value)}
                      className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 invalid:focus:ring-red-500 invalid:focus:border-red-500 invalid:bg-red-100"
                    />
                  </li>
                ))}
              </ul>

              {adjustmentFactors == 0 ? (
                <div className="my-4">
                  <button
                    className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={addAdjustmentFactors}
                  >
                    Sumar Factores de ajuste
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4 my-4">
                  <p className="font-semibold">
                    Factores de Ajuste = {adjustmentFactors}
                  </p>
                  <button
                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={gotToFinalForm}
                  >
                    Continuar
                  </button>
                </div>
              )}
            </div>

            <div className="px-4 py-3 bg-gray-100 text-right sm:px-6">
              <button
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={begin}
              >
                Volver
              </button>
            </div>
          </div>
        </>
      )}

      {showFinalForm && (
        <>
          {showAlert && (
            <Alert
              message={alertMessage.message}
              type={alertMessage.type}
              closeAlert={() => setShowAlert(false)}
            />
          )}
          {isLoading ? (
            <Loader />
          ) : (
            <div className="border rounded-md">
              {isResultCreated ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="my-4 p-4">
                    <h4 className="font-semibold">
                      ¿Cómo y porque de los resultados?
                    </h4>
                    <p className="mt-2 text-sm">
                      Bueno llegado a este punto podemos encontrar el resultado
                      en Puntos Función, ya ajustados con los factores de
                      ajustes previos.
                    </p>
                    <p className="mt-2 text-sm">
                      Pero previamente presentamos las fórmulas más relevantes
                      las cuales son las siguentes:
                    </p>
                    <div className="my-4">
                      <span className="bg-gray-200 p-2 block text-center italic rounded-md">
                        PF = CuentaTotal * [0.65 + 0.01 * &Sigma; Factores de
                        Ajuste ]
                      </span>
                    </div>
                    <p className="mt-2 text-sm">
                      Como se puede ver los puntos funcion salen de esta
                      fórmula. Los puntos funcion son una métrica orientada a la
                      funcionalidad.
                    </p>
                    <p className="mt-2 text-sm">
                      Ahora bien en el caso del tiempo contamos con una gran
                      variedad de fórmulas y las pasamos a listar
                      <span className="font-extralight italic block">
                        Carpers Jones:
                      </span>
                      <span className="bg-gray-200 p-2 block text-center italic rounded-md">
                        T = (Tamaño en PF)^0.404
                      </span>
                      <span className="font-extralight italic block">
                        ISBSG(Internation Software Benchmarking Group)
                      </span>
                      <span className="bg-gray-200 p-2 block text-center italic rounded-md">
                        T = 0,80 (Tamaño en PF) ^0.404 <br />
                        T = 0.3 (Tamaño en PF) ^ 0,559 3GL <br />T = 1.11
                        (Tamaño) ^ 0.32 4GL
                      </span>
                    </p>
                    <h4 className="font-semibold mt-4 pt-4 border-t-2 underline">
                      Resultados Finales de tu Estimación
                    </h4>
                    <div className="my-4">
                      <p>
                        <span className="font-semibold">Resultado (PF) =</span>{' '}
                        {result.functionPoints}
                      </p>
                    </div>
                    <div className="my-4">
                      <p>
                        <span className="font-semibold">
                          Tiempo (meses apróx.) =
                        </span>{' '}
                        {result.carpersTime} Según Carpers Jones
                      </p>
                    </div>
                    <div className="my-4">
                      <p>
                        <span className="font-semibold">
                          Tiempo (meses apróx.) =
                        </span>{' '}
                        {result.isbsgFirstTime} Según ISBSG
                      </p>
                    </div>
                    <div className="my-4">
                      <p>
                        <span className="font-semibold">
                          Tiempo (meses apróx.) =
                        </span>{' '}
                        {result.isbsgSecondTime} Según ISBSG 3GL
                      </p>
                    </div>

                    <div className="my-4">
                      <p>
                        <span className="font-semibold">
                          Tiempo (meses apróx.) =
                        </span>{' '}
                        {result.isbsgThirdTime} Según ISBSG 4GL
                      </p>
                    </div>

                    <h4 className="font-semibold mt-4 pt-4 border-t-2 underline">
                      Calculo de Costos
                    </h4>

                    <div className="my-4">
                      <span className="block mb-2">
                        Cuando registraste tu proyecto se te pidieron los
                        siguientes datos:
                      </span>
                      <ul className="list-disc ml-4">
                        <li>
                          <span className="font-semibold">
                            {project.team_number}{' '}
                          </span>
                          personas en el Team
                        </li>
                        <li>
                          <span className="font-semibold">
                            {project.aprox_salary} {project.money_type}{' '}
                          </span>
                          salario aproximado por miembro del equipo
                        </li>
                        <li>
                          <span className="font-semibold">
                            {project.money_type}
                          </span>{' '}
                          tipo de cambio
                        </li>
                      </ul>
                      <span className="block my-2">
                        Asi que a partir de estos datos el costo aprox sera
                        calculado, ademas que se considera los posibles tiempos
                        previamente calculados:
                      </span>
                    </div>

                    <div className="my-4">
                      <p>
                        <span className="font-semibold">
                          Costo (en {project.money_type}) =
                        </span>{' '}
                        {(
                          result.carpersTime *
                          project.team_number *
                          project.aprox_salary
                        ).toFixed(2)}{' '}
                        Según Carpers Jones
                      </p>
                    </div>
                    <div className="my-4">
                      <p>
                        <span className="font-semibold">
                          Costo (en {project.money_type}) ={' '}
                        </span>{' '}
                        {(
                          result.isbsgFirstTime *
                          project.team_number *
                          project.aprox_salary
                        ).toFixed(2)}{' '}
                        Según ISBSG
                      </p>
                    </div>
                    <div className="my-4">
                      <p>
                        <span className="font-semibold">
                          Costo (en {project.money_type}) =
                        </span>{' '}
                        {(
                          result.isbsgSecondTime *
                          project.team_number *
                          project.aprox_salary
                        ).toFixed(2)}{' '}
                        Según ISBSG 3GL
                      </p>
                    </div>

                    <div className="my-4">
                      <p>
                        <span className="font-semibold">
                          Costo (en {project.money_type}) =
                        </span>{' '}
                        {(
                          result.isbsgThirdTime *
                          project.team_number *
                          project.aprox_salary
                        ).toFixed(2)}{' '}
                        Según ISBSG 4GL
                      </p>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-100 text-right sm:px-6">
                    <button
                      className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-4"
                      onClick={saveResult}
                    >
                      Guardar Resultados
                    </button>
                    <button
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={gotToSecondForm}
                    >
                      Volver
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
