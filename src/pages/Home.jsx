// This is the home page
import { Link, Navigate } from 'react-router-dom'

// Images
import main from '../assets/main.svg'
import teacher from '../assets/teacher.svg'

// Components
import { Navbar } from '../components'

// Auth hook
import { useAuth } from '../context/AuthContext'

// Utilities
import { features, linkItems } from '../utils/HomeUtilities'
import logo from '../favicon.png'

export const Home = () => {
  const { user } = useAuth()

  return (
    <>
      {user ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          {/* Navigation bar section */}
          <Navbar linkItems={linkItems} />
          {/* Navigation bar section */}

          {/* Hero section */}
          <div className="relative overflow-hidden">
            <div className="py-10 my-10 md:py-20 md:my-20">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="order-2 md:order-1">
                  <h1 className="text-xl text-slate-800 text-center md:text-left md:text-4xl my-4">
                    <img
                      className="w-8 h-8 inline-block relative -top-1"
                      src={logo}
                      alt="app logo"
                    />
                    <span className="ml-2">Estimate App</span>
                  </h1>
                  <blockquote className="p-4 my-4 italic border-l-4 bg-yellow-100 text-neutral-600 border-yellow-200 quote">
                    <p className="mb-2">
                      Lo único que realmente nos pertenece es el tiempo; incluso
                      aquel que no tiene otra cosa cuenta con eso.
                    </p>
                    <cite>Baltazar García</cite>
                  </blockquote>
                  <Link
                    to="/login"
                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Ingresar
                  </Link>
                </div>
                <div className="order-1 md:order-2">
                  <img
                    className="w-full h-full object-center object-cover"
                    src={main}
                    alt="team working"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Hero section */}

          {/* Estimación section */}
          <div id="#estimate" className="my-8 mb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase">
                  Estimación
                </h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  ¿Qué es la estimación?
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  La <span className="italic font-bold">estimación</span> es una
                  de las primeras y más importantes actividades de un proyecto.
                  Consiste en predecir, en fases iniciales del ciclo de vida,
                  características del software cuyo valor real sólo puede
                  conocerse en etapas posteriores o cuando el proyecto ha
                  finalizado.
                </p>
              </div>

              <div className="mt-10">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-yellow-500 text-white">
                          <i className={`text-2xl ${feature.icon}`}></i>
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                          {feature.name}
                        </p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-gray-500">
                        {feature.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
          {/* Estimación section */}

          {/* Modelos de Estimación */}
          <div id="modelos" className="my-8 mb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="text-base text-yellow-400 font-semibold tracking-wide uppercase">
                  Modelos
                </h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Modelos de estimación existentes
                </p>
              </div>

              <div className="my-28 sm:px-6 lg:px-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <img className="w-full h-full" src={teacher} alt="teacher" />
                </div>
                <div>
                  <h2 className="text-lg mx-8 leading-6 font-medium text-gray-900">
                    Modelos basados en la experiencia
                  </h2>
                  <p className="mt-2 mx-8 text-base text-gray-500 mb-8">
                    Estos modelos se guian en la experiencia, tambien pueden ser
                    conocidos como modelos de juicio experto, en el cual una
                    persona o varias con más experiencia en desarrollo tiene la
                    capacidad de mediante su criterio determinar los costes de
                    un proyecto de software.
                  </p>

                  <h2 className="text-lg mx-8 leading-6 font-medium text-gray-900">
                    Modelos basados en el calculo algoritmico
                  </h2>
                  <p className="mt-2 mx-8 text-base text-gray-500">
                    Este tipo de modelos se realizan mediante la aplicación de
                    fórmulas matemáticas y métodos ya establecidos, los cuales
                    se ajustan a un determinado proyecto y mediante la
                    aplicación de fórmulas se obtiene los resultados deseados.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Modelos de Estimación */}

          {/* Documentation Link */}
          <div className="my-8 mb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gray-800 text-white p-8 rounded-lg">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 text-center place-items-center">
                  <div>
                    <i className="bx bxs-book-bookmark text-5xl"></i>
                  </div>
                  <div>
                    <h2 className="text-3xl leading-8 font-extrabold tracking-tight">
                      Documentación
                    </h2>
                    <p className="mt-2 mx-8 text-base text-gray-500">
                      Familiarizate con nuestra documentación
                    </p>
                  </div>
                  <div>
                    <a
                      href="https://github.com/jcanaviri/react-grade-project.git"
                      target="_blank"
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    >
                      Ir a la documentación
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Documentation Link */}

          {/* Contacto */}
          <div className="max-w-5xl mx-auto px-4 flex items-center justify-center my-12">
            <div className="bg-white shadow border rounded-lg py-12 w-full mx-4 px-5 md:px-10">
              <p className="text-3xl leading-8 font-extrabold tracking-tight">
                Contacta me
              </p>
              <div className="md:flex items-center mt-12">
                <div className="md:w-full flex flex-col">
                  <label className="block mb-2 text-sm font-semibold text-gray-800">
                    Nombre:
                  </label>
                  <input
                    type="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Tu nombre..."
                  />
                </div>
                <div className="md:w-full flex flex-col md:ml-6 md:mt-0 mt-4">
                  <label className="block mb-2 text-sm font-semibold text-gray-800">
                    Email:
                  </label>
                  <input
                    placeholder="Tu email..."
                    type="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>

              <div>
                <div className="w-full flex flex-col mt-8">
                  <label className="block mb-2 text-sm font-semibold text-gray-800">
                    Mensaje:
                  </label>
                  <textarea
                    placeholder="Tu mensaje..."
                    role="textbox"
                    type="name"
                    rows="5"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
              <p className="text-xs leading-3 text-gray-600 mt-4">
                Al hacer clic en enviar, usted acepta nuestros términos de
                servicio, la política de privacidad y el uso que hacemos de los
                datos como se indica
              </p>
              <div className="flex items-center justify-center w-full mt-6">
                <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                  Enviar
                </button>
              </div>
            </div>
          </div>

          {/* Contacto */}

          {/* Footer */}
          <footer className="bg-gray-200 text-center lg:text-left">
            <div className="text-slate-800 text-center p-2 text-sm">
              © 2022 Todos los derechos estan reservados -
              <a className="text-slate-800 ml-2" href="">
                jcanaviri20@gmail.com
              </a>
            </div>
          </footer>
          {/* Footer */}
        </>
      )}
    </>
  )
}
