import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import welcomeImage from '../assets/welcome.svg'
import logo from '../favicon.png'

import { useAuth } from '../context/AuthContext'
import { useEstimationType } from '../context/EstimationTypeContext'

import { Loader } from '../components'

export const Dashboard = () => {
  const { username } = useAuth()
  const { getAllEstimationTypes } = useEstimationType()

  const [isLoading, setIsLoading] = useState(false)
  const [types, setTypes] = useState([])

  const loadTypes = async () => {
    try {
      setIsLoading(true)
      const res = await getAllEstimationTypes()
      setTypes(res)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadTypes()
  }, [])

  return (
    <>
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1 p-2">
          <img className="w-full" src={welcomeImage} alt="welcome" />
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col justify-center items-start rounded-lg">
          <div className="flex items-center justify-center">
            <img className="h-12 w-12" src={logo} alt="logo" />
            <span className="text-slate-600 hover:text-slate-700 ml-2 font-medium">
              Estimate App
            </span>
          </div>
          <p className="my-2 text-slate-800 text-3xl">
            ¡Bienvenido, {username}! 👋
          </p>
          <p className="text-sm italic">¿Listo para crear tus proyectos?</p>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-slate-900 ml-4">
          Métodos de Estimación Disponibles
        </h3>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <ul className="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm leading-6">
          {types.map((type) => (
            <li
              key={type.id}
              className="hover:bg-yellow-400 hover:ring-yellow-400 hover:cursor-pointer group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm flex justify-between"
            >
              <Link
                to={`/dashboard/method-explanation/${type.name}`}
                className="flex w-full justify-around"
              >
                <p className="group-hover:text-white font-bold text-slate-900">
                  {type.name}
                </p>
                <p className="font-semibold group-hover:text-yellow-50">
                  {type.description}
                </p>
                <div className="flex items-center">
                  <i
                    className={`group-hover:text-white text-2xl ${type.icon}`}
                  ></i>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="p-4 mb-16">
        <h3 className="font-semibold text-slate-900 ml-4">
          ¡Crea un nuevo Proyecto Ahora 🧑‍💻!
        </h3>

        <div className="mt-8 mx-4">
          <Link
            to="/dashboard/projects"
            className="hover:border-yellow-400 hover:bg-white hover:text-yellow-400 group w-1/2 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-8"
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
        </div>
      </div>
    </>
  )
}
